"use client";

import dynamic from "next/dynamic";

const ServiceAreaMap = dynamic(() => import("./ServiceAreaMap"), {
  ssr: false,
  loading: () => (
    <div className="h-96 w-full animate-pulse rounded-xl border border-brand-green/25 bg-white/5" />
  ),
});

export default ServiceAreaMap;
