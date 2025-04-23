
import React, { useEffect, useRef } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';

interface MapProps {
  className?: string;
  hotspots?: Array<{
    lat: number;
    lng: number;
    type: 'active' | 'reported' | 'monitored';
  }>;
}

const Map: React.FC<MapProps> = ({ className = "", hotspots = [] }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maptilersdk.Map | null>(null);
  const apiKey = ''; // You'll need to add your MapTiler API key here

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize the map
    maptilersdk.config.apiKey = apiKey;
    
    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.SATELLITE,
      center: [-1.0232, 7.9465], // Ghana's coordinates
      zoom: 6
    });

    // Add navigation controls
    map.current.addControl(new maptilersdk.NavigationControl());

    // Add markers for hotspots
    hotspots.forEach(spot => {
      const el = document.createElement('div');
      el.className = `w-4 h-4 rounded-full ${
        spot.type === 'active' ? 'bg-galamsey-red-DEFAULT animate-pulse' :
        spot.type === 'reported' ? 'bg-galamsey-gold-DEFAULT' :
        'bg-galamsey-green-DEFAULT'
      }`;

      new maptilersdk.Marker({element: el})
        .setLngLat([spot.lng, spot.lat])
        .addTo(map.current!);
    });

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [hotspots, apiKey]);

  return (
    <div className={`relative w-full h-full min-h-[400px] rounded-lg overflow-hidden shadow-md ${className}`}>
      <div ref={mapContainer} className="absolute inset-0" />
      
      {/* Legend */}
      <div className="absolute top-4 right-4 bg-white p-2 rounded-md shadow-md z-10">
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
    </div>
  );
};

export default Map;
