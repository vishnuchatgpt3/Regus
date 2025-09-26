import { useEffect, useRef } from "react";

type Poi = { id: number; name: string; lat: number; lon: number; type: string; distKm: number };

interface LeafletMapProps {
  center: { lat: number; lon: number };
  zoom: number;
  name: string;
  pois: { marketplaces: Poi[]; hospitals: Poi[]; restaurants: Poi[]; shops: Poi[] };
  // locations coming from the server (normalized to { name, lat, lon })
  allLocations?: Array<{ name: string; lat: number; lon: number }>;
}

// Load Leaflet from CDN (JS + CSS) only once
const ensureLeafletLoaded = (): Promise<void> => {
  return new Promise((resolve) => {
    if ((window as any).L) {
      resolve();
      return;
    }
    const existing = document.querySelector("link[data-leaflet]");
    if (!existing) {
      const css = document.createElement("link");
      css.setAttribute("rel", "stylesheet");
      css.setAttribute("href", "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css");
      css.setAttribute("data-leaflet", "true");
      document.head.appendChild(css);
    }
    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.async = true;
    script.onload = () => resolve();
    document.body.appendChild(script);
  });
};

const LeafletMap = ({ center, zoom, name, pois, allLocations }: LeafletMapProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    let destroyed = false;
    ensureLeafletLoaded().then(() => {
      if (destroyed || !containerRef.current) return;
      const L = (window as any).L;
      if (!mapRef.current) {
        mapRef.current = L.map(containerRef.current).setView([center.lat, center.lon], zoom);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution: "© OpenStreetMap",
        }).addTo(mapRef.current);
      } else {
        mapRef.current.setView([center.lat, center.lon], zoom);
      }

      // Clear previous markers
      (mapRef.current as any)._layers &&
        Object.values((mapRef.current as any)._layers).forEach((layer: any) => {
          if (layer instanceof L.Marker && !layer._isCenterMarker) {
            mapRef.current.removeLayer(layer);
          }
        });

      // Icons
      const icon = (color: string) =>
        L.divIcon({
          className: "",
          html: `<div style="background:${color};width:12px;height:12px;border-radius:50%;border:2px solid white;box-shadow:0 0 0 1px ${color}"></div>`,
          iconSize: [16, 16],
          iconAnchor: [8, 8],
        });

      const bounds = L.latLngBounds([
        [center.lat, center.lon],
      ]);

      // Center marker
      const centerMarker = L.marker([center.lat, center.lon], { title: name, icon: icon("#10b981") });
      (centerMarker as any)._isCenterMarker = true;
      centerMarker.addTo(mapRef.current).bindPopup(`<strong>${name}</strong>`);

      const addGroup = (items: Poi[], color: string, label: string) => {
        items.forEach((p) => {
          const m = L.marker([p.lat, p.lon], { icon: icon(color), title: p.name });
          m.addTo(mapRef.current).bindPopup(`<strong>${p.name}</strong><br/><small>${label} · ${p.distKm.toFixed(1)} km</small>`);
          bounds.extend([p.lat, p.lon]);
        });
      };

      addGroup(pois.marketplaces, "#22c55e", "Marketplace");
      addGroup(pois.hospitals, "#ef4444", "Hospital/Clinic");
      addGroup(pois.restaurants, "#3b82f6", "Restaurant/Cafe");
      addGroup(pois.shops, "#a855f7", "Shop");

      // server-provided locations (e.g., known destinations)
      if (Array.isArray(allLocations) && allLocations.length > 0) {
        allLocations.forEach((l) => {
          try {
            const m = L.marker([Number(l.lat), Number(l.lon)], { icon: icon("#f59e0b"), title: l.name });
            m.addTo(mapRef.current).bindPopup(`<strong>${l.name}</strong>`);
            bounds.extend([Number(l.lat), Number(l.lon)]);
          } catch (err) {
            // ignore malformed coords
          }
        });
      }

      // Fit
      if (bounds.isValid()) {
        mapRef.current.fitBounds(bounds, { padding: [24, 24] });
      }
    });
    return () => {
      destroyed = true;
    };
  }, [center.lat, center.lon, zoom, name, pois]);

  return (
    <div className="w-full h-full" style={{ zIndex: 0 }}>
      <div ref={containerRef} style={{ zIndex: 0, position: "relative" }} className="w-full h-[400px] md:h-full" />
      <div className="hidden md:flex gap-3 p-3 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1"><span className="w-3 h-3 rounded-full" style={{background:'#22c55e'}} /> Marketplaces</span>
        <span className="inline-flex items-center gap-1"><span className="w-3 h-3 rounded-full" style={{background:'#ef4444'}} /> Hospitals</span>
        <span className="inline-flex items-center gap-1"><span className="w-3 h-3 rounded-full" style={{background:'#3b82f6'}} /> Restaurants</span>
        <span className="inline-flex items-center gap-1"><span className="w-3 h-3 rounded-full" style={{background:'#a855f7'}} /> Shops</span>
      </div>
    </div>
  );
};

export default LeafletMap;








