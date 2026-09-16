"use client";

import { useEffect } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Circle, CircleMarker, Tooltip, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { BUSINESS_COORDS, SERVICE_RADIUS_MILES } from "@/lib/geo";

const RADIUS_METERS = SERVICE_RADIUS_MILES * 1609.34;

function FitToRadius() {
  const map = useMap();

  useEffect(() => {
    const bounds = L.latLng(BUSINESS_COORDS.lat, BUSINESS_COORDS.lng).toBounds(
      RADIUS_METERS,
    );
    map.fitBounds(bounds, { padding: [16, 16] });
  }, [map]);

  return null;
}

export default function ServiceAreaMap() {
  return (
    <div className="overflow-hidden rounded-xl border border-brand-green/25 shadow-[0_0_40px_-15px_rgba(35,115,26,0.6)]">
      <MapContainer
        center={[BUSINESS_COORDS.lat, BUSINESS_COORDS.lng]}
        zoom={9}
        scrollWheelZoom={false}
        className="h-96 w-full"
      >
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Circle
          center={[BUSINESS_COORDS.lat, BUSINESS_COORDS.lng]}
          radius={RADIUS_METERS}
          pathOptions={{
            color: "#23731a",
            fillColor: "#23731a",
            fillOpacity: 0.15,
            weight: 2,
          }}
        />
        <CircleMarker
          center={[BUSINESS_COORDS.lat, BUSINESS_COORDS.lng]}
          radius={7}
          pathOptions={{ color: "#f59e0b", fillColor: "#f59e0b", fillOpacity: 1, weight: 2 }}
        >
          <Tooltip permanent direction="top" offset={[0, -6]} className="!bg-black/80 !text-white !border-brand-amber/40">
            ProServ Electrical
          </Tooltip>
        </CircleMarker>
        <FitToRadius />
      </MapContainer>
    </div>
  );
}
