// Geocoded from business.addressLine via OpenStreetMap Nominatim, 2026-09-14.
// Re-geocode if the business address ever changes.
export const BUSINESS_COORDS = { lat: 53.1798331, lng: -2.8853099 } as const;

export const SERVICE_RADIUS_MILES = 25;

const EARTH_RADIUS_MILES = 3958.8;

export function haversineMiles(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number },
): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;

  return 2 * EARTH_RADIUS_MILES * Math.asin(Math.sqrt(h));
}

// Client-side geocoding via OSM Nominatim's free public API. Fine for a
// low-traffic sole-trader site; if enquiry volume grows, move this behind a
// server route with caching so we're not hitting Nominatim directly from
// every visitor's browser (their usage policy expects modest, non-bulk use).
export async function geocode(
  query: string,
): Promise<{ lat: number; lng: number } | null> {
  const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=gb&q=${encodeURIComponent(query)}`;

  try {
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return null;
    const results = (await res.json()) as Array<{ lat: string; lon: string }>;
    if (results.length === 0) return null;
    return { lat: parseFloat(results[0].lat), lng: parseFloat(results[0].lon) };
  } catch {
    return null;
  }
}
