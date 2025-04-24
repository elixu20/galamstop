
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Define the type for our hotspot data
type GalamseyHotspot = {
  id: string;
  location_name: string;
  latitude: number;
  longitude: number;
  severity: number;
  report_count: number;
  last_activity_date: string;
};

export function GalamseyHotspots() {
  const { data: hotspots, isLoading } = useQuery({
    queryKey: ["hotspots"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("galamsey_hotspots")
        .select("*")
        .order("severity", { ascending: false });
      
      if (error) throw error;
      return data as GalamseyHotspot[];
    },
  });

  if (isLoading) return <div>Loading...</div>;

  const getSeverityColor = (severity: number) => {
    switch (severity) {
      case 3: return "red";
      case 2: return "orange";
      default: return "yellow";
    }
  };

  // Define center coordinates for Ghana (approximately)
  const defaultPosition: [number, number] = [6.6745, -1.5716]; // Kumasi coordinates

  return (
    <Card>
      <CardHeader>
        <CardTitle>Galamsey Activity Heatmap</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[500px] w-full">
          <MapContainer 
            style={{ height: "100%", width: "100%" }}
            className="h-full w-full"
            zoom={7}
            center={defaultPosition}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {hotspots?.map((hotspot) => {
              const hotspotPosition: [number, number] = [
                hotspot.latitude, 
                hotspot.longitude
              ];
              
              return (
                <CircleMarker
                  key={hotspot.id}
                  center={hotspotPosition}
                  pathOptions={{
                    fillColor: getSeverityColor(hotspot.severity),
                    color: getSeverityColor(hotspot.severity),
                    weight: 1,
                    opacity: 0.8,
                    fillOpacity: 0.6
                  }}
                >
                  <Popup>
                    <div>
                      <h3 className="font-bold">{hotspot.location_name}</h3>
                      <p>Reports: {hotspot.report_count}</p>
                      <p>Last Activity: {new Date(hotspot.last_activity_date).toLocaleDateString()}</p>
                    </div>
                  </Popup>
                </CircleMarker>
              );
            })}
          </MapContainer>
        </div>
      </CardContent>
    </Card>
  );
}
