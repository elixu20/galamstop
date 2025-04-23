
import React, { useRef, useEffect } from "react";

// Placeholder for a real map implementation
// In a real application, we would integrate with libraries like Mapbox or Leaflet
const Map: React.FC<{ className?: string; hotspots?: any[] }> = ({
  className = "",
  hotspots = []
}) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // In a real implementation, this would initialize a map library
    console.log("Map would initialize here with hotspots:", hotspots);
  }, [hotspots]);

  return (
    <div 
      ref={mapRef} 
      className={`relative w-full h-full min-h-[400px] bg-[url('/map-placeholder.jpg')] bg-center bg-cover border border-border rounded-lg overflow-hidden shadow-md ${className}`}
    >
      <div className="absolute top-4 right-4 bg-white p-2 rounded-md shadow-md">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 rounded-full bg-galamsey-red-DEFAULT"></div>
          <span className="text-xs">Active Illegal Mining</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 rounded-full bg-galamsey-gold-DEFAULT"></div>
          <span className="text-xs">Reported Location</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-galamsey-green-DEFAULT"></div>
          <span className="text-xs">Monitored Area</span>
        </div>
      </div>
      
      {/* Simulated hotspots for the demo */}
      <div className="absolute top-[30%] left-[40%] w-4 h-4 bg-galamsey-red-DEFAULT rounded-full animate-pulse"></div>
      <div className="absolute top-[45%] left-[60%] w-4 h-4 bg-galamsey-red-DEFAULT rounded-full animate-pulse"></div>
      <div className="absolute top-[60%] left-[25%] w-4 h-4 bg-galamsey-gold-DEFAULT rounded-full"></div>
      <div className="absolute top-[25%] left-[55%] w-4 h-4 bg-galamsey-gold-DEFAULT rounded-full"></div>
      
      {/* Protected area overlay */}
      <div className="absolute top-[35%] left-[30%] w-32 h-32 border-2 border-galamsey-green-DEFAULT rounded-full opacity-40"></div>
    </div>
  );
};

export default Map;
