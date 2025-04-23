import React, { useEffect, useRef } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';
import { AlertCircle } from 'lucide-react';

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
  const apiKey = 'ng9XeAIkOXQ1bsBuricA'; // Added MapTiler API key

  useEffect(() => {
    if (!mapContainer.current || !apiKey) return;

    // Initialize the map
    maptilersdk.config.apiKey = apiKey;
    
    try {
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
    } catch (error) {
      console.error("Error initializing map:", error);
    }

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [hotspots, apiKey]);

  // Show a message if no API key is provided
  if (!apiKey) {
    return (
      <div className={`flex flex-col items-center justify-center w-full h-full min-h-[400px] bg-gray-100 rounded-lg ${className}`}>
        <AlertCircle className="h-10 w-10 text-galamsey-gold-DEFAULT mb-4" />
        <h3 className="text-lg font-medium mb-2">MapTiler API Key Required</h3>
        <p className="text-sm text-gray-500 text-center max-w-md px-4">
          Please add your MapTiler API key to the map.tsx file to enable the map functionality.
          You can get a free API key from <a href="https://www.maptiler.com/" className="text-galamsey-green-DEFAULT underline" target="_blank" rel="noreferrer">MapTiler</a>.
        </p>
      </div>
    );
  }

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
