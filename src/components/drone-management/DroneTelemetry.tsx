
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import TelemetryChart from './TelemetryChart';

interface TelemetryData {
  timestamp: string;
  altitude?: number;
  speed?: number;
  battery_level?: number;
}

interface DroneTelemetryProps {
  droneId: string;
}

export const DroneTelemetry: React.FC<DroneTelemetryProps> = ({ droneId }) => {
  const [telemetryData, setTelemetryData] = useState<TelemetryData[]>([]);

  useEffect(() => {
    // Fetch initial telemetry data
    const fetchTelemetry = async () => {
      const { data, error } = await supabase
        .from('drone_telemetry')
        .select('*')
        .eq('drone_id', droneId)
        .order('timestamp', { ascending: false })
        .limit(50);

      if (!error && data) {
        setTelemetryData(data.reverse());
      }
    };

    fetchTelemetry();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('drone-telemetry')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'drone_telemetry',
          filter: `drone_id=eq.${droneId}`,
        },
        (payload) => {
          setTelemetryData((current) => {
            const newData = [...current, payload.new as TelemetryData];
            return newData.slice(-50); // Keep last 50 data points
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [droneId]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <TelemetryChart
        data={telemetryData}
        metric="altitude"
        title="Altitude (m)"
        color="#2E7D32"
      />
      <TelemetryChart
        data={telemetryData}
        metric="speed"
        title="Speed (m/s)"
        color="#1976D2"
      />
      <TelemetryChart
        data={telemetryData}
        metric="battery_level"
        title="Battery Level (%)"
        color="#ED6C02"
      />
    </div>
  );
};
