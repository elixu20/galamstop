
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet with Vite
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapProps {
  className?: string;
  hotspots?: Array<{
    lat: number;
    lng: number;
    type: 'active' | 'reported' | 'monitored';
  }>;
}

const Map: React.FC<MapProps> = ({ className = "", hotspots = [] }) => {
  // Center coordinates for Ghana
  const defaultCenter: [number, number] = [7.9465, -1.0232];
  const defaultZoom = 6;

  const getMarkerColor = (type: 'active' | 'reported' | 'monitored') => {
    switch (type) {
      case 'active': return 'bg-galamsey-red-DEFAULT';
      case 'reported': return 'bg-galamsey-gold-DEFAULT';
      case 'monitored': return 'bg-galamsey-green-DEFAULT';
      default: return 'bg-galamsey-green-DEFAULT';
    }
  };

  return (
    <div className={`relative w-full h-full min-h-[400px] rounded-lg overflow-hidden shadow-md ${className}`}>
      <MapContainer 
        center={defaultCenter} 
        zoom={defaultZoom} 
        style={{ height: "100%", width: "100%" }}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {hotspots.map((spot, index) => (
          <Marker 
            key={index} 
            position={[spot.lat, spot.lng]}
          >
            <Popup>
              <div className="p-2">
                <div className={`inline-block w-3 h-3 rounded-full ${getMarkerColor(spot.type)} mr-2`} />
                <span className="text-sm font-medium">
                  {spot.type.charAt(0).toUpperCase() + spot.type.slice(1)} Site
                </span>
                <div className="mt-2 text-xs text-muted-foreground">
                  <div>Latitude: {spot.lat.toFixed(4)}°</div>
                  <div>Longitude: {spot.lng.toFixed(4)}°</div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Legend */}
      <div className="absolute top-4 right-4 bg-white p-2 rounded-md shadow-md z-[1000]">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 rounded-full bg-galamsey-red-DEFAULT"></div>
          <span className="text-xs">Active Illegal Mining</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 rounded-full bg-galamsey-gold-DEFAULT"></div>
          <span className="text-xs">Reported Activity</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-galamsey-green-DEFAULT"></div>
          <span className="text-xs">Monitored Area</span>
        </div>
      </div>
    </div>
  );
};

export default Map;
