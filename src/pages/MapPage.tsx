import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowLeft, Store, Hospital, Utensils, ShoppingBag } from "lucide-react";
import LeafletMap from "@/components/map/LeafletMap";

const presets: Record<string, { lat: number; lon: number; zoom?: number; nearby: string[] }> = {
  "Hundru Falls": { lat: 23.383, lon: 85.444, zoom: 13, nearby: ["Dassam Falls", "Jonha Falls", "Ranchi"] },
  "Betla National Park": { lat: 23.911, lon: 84.196, zoom: 12, nearby: ["Palamu Fort", "Lodh Falls", "Daltonganj"] },
  "Deoghar": { lat: 24.476, lon: 86.691, zoom: 13, nearby: ["Baidyanath Temple", "Naulakha Mandir", "Tapovan Hills"] },
  "Netarhat": { lat: 23.468, lon: 84.268, zoom: 12, nearby: ["Sunrise Point", "Koel View Point", "Upper Ghaghri"] },
  "Dassam Falls": { lat: 23.259, lon: 85.529, zoom: 13, nearby: ["Hundru Falls", "Jonha Falls", "Ranchi"] },
};

const MapPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const name = params.get("name") || "Hundru Falls";

  const [allLocations, setAllLocations] = useState<Array<{ name: string; lat: number; lon: number }>>([]);
  const [loadingLocations, setLoadingLocations] = useState(false);
  const [locationsError, setLocationsError] = useState<string | null>(null);

  const { lat, lon, zoom = 13, nearby } = useMemo(() => {
    const preset = presets[name] || presets["Hundru Falls"];
    return preset;
  }, [name]);

  // If the user passed a name that exists in server locations, prefer that center
  useEffect(() => {
    const fetchLocations = async () => {
      setLoadingLocations(true);
      setLocationsError(null);
      try {
        const res = await fetch("/api/locations");
        if (!res.ok) throw new Error("Failed to fetch locations");
        const data = await res.json();
        // Normalize to { name, lat, lon }
        const normalized = (data || []).map((l: any) => ({ name: l.name, lat: Number(l.lat), lon: Number(l.lng ?? l.lon ?? l.lon2) }));
        setAllLocations(normalized);
      } catch (err: any) {
        setLocationsError("Could not load locations");
      } finally {
        setLoadingLocations(false);
      }
    };
    fetchLocations();
  }, []);

  const osmUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lon - 0.1}%2C${lat - 0.1}%2C${lon + 0.1}%2C${lat + 0.1}&layer=mapnik&marker=${lat}%2C${lon}`;

  // Static map with multiple markers (overlay image) using OSM static map service
  const buildStaticMapUrl = (): string => {
    const base = "https://staticmap.openstreetmap.de/staticmap.php";
    const params: string[] = [];
    params.push(`center=${lat},${lon}`);
    params.push(`zoom=${zoom}`);
    params.push("size=800x400");
    const cap = (arr: any[], n: number) => arr.slice(0, n);
    const addMarkers = (arr: Poi[], color: string) => {
      cap(arr, 15).forEach((p) => {
        params.push(`markers=${p.lat},${p.lon},${color}1`);
      });
    };
    addMarkers(pois.marketplaces, "green");
    addMarkers(pois.hospitals, "red");
    addMarkers(pois.restaurants, "blue");
    addMarkers(pois.shops, "purple");
    return `${base}?${params.join("&")}`;
  };

  // Nearby Points of Interest via Overpass API
  type Poi = { id: number; name: string; lat: number; lon: number; type: string; distKm: number };
  const [pois, setPois] = useState<{ marketplaces: Poi[]; hospitals: Poi[]; restaurants: Poi[]; shops: Poi[] }>({ marketplaces: [], hospitals: [], restaurants: [], shops: [] });
  const [loadingPois, setLoadingPois] = useState(false);
  const [poiError, setPoiError] = useState<string | null>(null);

  const distanceKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const toRad = (d: number) => (d * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(a));
  };

  useEffect(() => {
    const fetchPois = async () => {
      setLoadingPois(true);
      setPoiError(null);
      try {
        const radius = 7000; // meters
        const query = `[
          out:json][timeout:25];
          (
            node[amenity=marketplace](around:${radius},${lat},${lon});
            node[amenity=hospital](around:${radius},${lat},${lon});
            node[amenity=clinic](around:${radius},${lat},${lon});
            node[amenity=restaurant](around:${radius},${lat},${lon});
            node[amenity=cafe](around:${radius},${lat},${lon});
            node[shop](around:${radius},${lat},${lon});
          );
          out center;`;
        const res = await fetch("https://overpass-api.de/api/interpreter", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({ data: query }).toString(),
        });
        const data = await res.json();
        const elements = (data?.elements || []) as any[];
        const mapToPoi = (el: any): Poi => ({
          id: el.id,
          name: el.tags?.name || el.tags?.["name:en"] || "Unnamed",
          lat: el.lat ?? el.center?.lat,
          lon: el.lon ?? el.center?.lon,
          type: el.tags?.amenity || el.tags?.shop || "poi",
          distKm: distanceKm(lat, lon, el.lat ?? el.center?.lat, el.lon ?? el.center?.lon),
        });

        const marketplaces = elements.filter((e) => e.tags?.amenity === "marketplace").map(mapToPoi).sort((a, b) => a.distKm - b.distKm).slice(0, 10);
        const hospitals = elements.filter((e) => ["hospital", "clinic"].includes(e.tags?.amenity)).map(mapToPoi).sort((a, b) => a.distKm - b.distKm).slice(0, 10);
        const restaurants = elements.filter((e) => ["restaurant", "cafe"].includes(e.tags?.amenity)).map(mapToPoi).sort((a, b) => a.distKm - b.distKm).slice(0, 10);
        const shops = elements.filter((e) => !!e.tags?.shop).map(mapToPoi).sort((a, b) => a.distKm - b.distKm).slice(0, 10);

        setPois({ marketplaces, hospitals, restaurants, shops });
      } catch (err: any) {
        setPoiError("Failed to load nearby places. Please try again.");
      } finally {
        setLoadingPois(false);
      }
    };
    fetchPois();
  }, [lat, lon]);

  return (
    <div className="min-h-screen py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4 mr-1" /> Back
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold">
              <span className="bg-gradient-earth bg-clip-text text-transparent">Map</span> · {name}
            </h1>
          </div>
        </div>

        <Card className="overflow-hidden">
          <div className="aspect-video w-full">
            <LeafletMap center={{ lat, lon }} zoom={zoom} name={name} pois={pois} allLocations={allLocations} />
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-4 md:col-span-2">
            <h2 className="text-lg font-semibold mb-3">Nearby points</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  <ShoppingBag className="h-4 w-4" />
                  <span className="font-medium">Marketplaces</span>
                </div>
                {loadingPois ? (
                  <p className="text-sm text-muted-foreground">Loading…</p>
                ) : poiError ? (
                  <p className="text-sm text-red-500">{poiError}</p>
                ) : (
                  <ul className="space-y-1 text-sm">
                    {pois.marketplaces.map((p) => (
                      <li key={p.id} className="flex items-center justify-between gap-2">
                        <span className="truncate">{p.name}</span>
                        <span className="text-muted-foreground">{p.distKm.toFixed(1)} km</span>
                      </li>
                    ))}
                    {pois.marketplaces.length === 0 && <li className="text-muted-foreground">No data</li>}
                  </ul>
                )}
              </Card>

              <Card className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Hospital className="h-4 w-4" />
                  <span className="font-medium">Hospitals & Clinics</span>
                </div>
                {loadingPois ? (
                  <p className="text-sm text-muted-foreground">Loading…</p>
                ) : poiError ? (
                  <p className="text-sm text-red-500">{poiError}</p>
                ) : (
                  <ul className="space-y-1 text-sm">
                    {pois.hospitals.map((p) => (
                      <li key={p.id} className="flex items-center justify-between gap-2">
                        <span className="truncate">{p.name}</span>
                        <span className="text-muted-foreground">{p.distKm.toFixed(1)} km</span>
                      </li>
                    ))}
                    {pois.hospitals.length === 0 && <li className="text-muted-foreground">No data</li>}
                  </ul>
                )}
              </Card>

              <Card className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Utensils className="h-4 w-4" />
                  <span className="font-medium">Restaurants & Cafes</span>
                </div>
                {loadingPois ? (
                  <p className="text-sm text-muted-foreground">Loading…</p>
                ) : poiError ? (
                  <p className="text-sm text-red-500">{poiError}</p>
                ) : (
                  <ul className="space-y-1 text-sm">
                    {pois.restaurants.map((p) => (
                      <li key={p.id} className="flex items-center justify-between gap-2">
                        <span className="truncate">{p.name}</span>
                        <span className="text-muted-foreground">{p.distKm.toFixed(1)} km</span>
                      </li>
                    ))}
                    {pois.restaurants.length === 0 && <li className="text-muted-foreground">No data</li>}
                  </ul>
                )}
              </Card>

              <Card className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Store className="h-4 w-4" />
                  <span className="font-medium">All Shops</span>
                </div>
                {loadingPois ? (
                  <p className="text-sm text-muted-foreground">Loading…</p>
                ) : poiError ? (
                  <p className="text-sm text-red-500">{poiError}</p>
                ) : (
                  <ul className="space-y-1 text-sm">
                    {pois.shops.map((p) => (
                      <li key={p.id} className="flex items-center justify-between gap-2">
                        <span className="truncate">{p.name}</span>
                        <span className="text-muted-foreground">{p.distKm.toFixed(1)} km</span>
                      </li>
                    ))}
                    {pois.shops.length === 0 && <li className="text-muted-foreground">No data</li>}
                  </ul>
                )}
              </Card>
            </div>
          </Card>

          <Card className="p-4">
            <h2 className="text-lg font-semibold mb-3">Tips</h2>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
              <li>Zoom and pan the map to explore surroundings.</li>
              <li>Use Nearby points to quickly jump between places.</li>
              <li>Check seasonal access and local guidelines.</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MapPage;


