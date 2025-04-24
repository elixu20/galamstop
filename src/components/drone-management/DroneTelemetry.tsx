import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import TelemetryChart from './TelemetryChart';
import { AlertBadge } from './AlertBadge';
import { AlertsList } from './AlertsList';
import { AlertPreferences } from './AlertPreferences';

interface TelemetryData {
  timestamp: string;
  altitude?: number;
  speed?: number;
  battery_level?: number;
}

interface Alert {
  id: string;
  alert_type: string;
  message: string;
  severity: string;
  created_at: string;
  is_read: boolean;
}

interface AlertPreference {
  id: string;
  alert_type: string;
  enabled: boolean;
  threshold_value: number;
}

interface DroneTelemetryProps {
  droneId: string;
}

export const DroneTelemetry: React.FC<DroneTelemetryProps> = ({ droneId }) => {
  const [telemetryData, setTelemetryData] = useState<TelemetryData[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [preferences, setPreferences] = useState<AlertPreference[]>([]);
  const [unreadCount, setUnreadCount] = useState({ high: 0, medium: 0, low: 0 });

  useEffect(() => {
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

    const fetchAlerts = async () => {
      const { data: alertsData } = await supabase
        .from('drone_alerts')
        .select('*')
        .eq('drone_id', droneId)
        .order('created_at', { ascending: false });

      if (alertsData) {
        setAlerts(alertsData);
        updateUnreadCount(alertsData);
      }
    };

    const fetchPreferences = async () => {
      const { data: preferencesData } = await supabase
        .from('alert_preferences')
        .select('*');

      if (preferencesData) {
        setPreferences(preferencesData);
      }
    };

    fetchTelemetry();
    fetchAlerts();
    fetchPreferences();

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
            return newData.slice(-50);
          });
        }
      )
      .subscribe();

    const alertsChannel = supabase
      .channel('drone-alerts')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'drone_alerts',
          filter: `drone_id=eq.${droneId}`,
        },
        (payload) => {
          setAlerts((current) => [payload.new as Alert, ...current]);
          updateUnreadCount([payload.new as Alert, ...alerts]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
      supabase.removeChannel(alertsChannel);
    };
  }, [droneId]);

  const updateUnreadCount = (alertsData: Alert[]) => {
    const counts = { high: 0, medium: 0, low: 0 };
    alertsData.forEach((alert) => {
      if (!alert.is_read) {
        counts[alert.severity as keyof typeof counts]++;
      }
    });
    setUnreadCount(counts);
  };

  const handleMarkAsRead = async (alertId: string) => {
    const { error } = await supabase
      .from('drone_alerts')
      .update({ is_read: true })
      .eq('id', alertId);

    if (!error) {
      setAlerts(alerts.map(alert => 
        alert.id === alertId ? { ...alert, is_read: true } : alert
      ));
      updateUnreadCount(alerts.map(alert => 
        alert.id === alertId ? { ...alert, is_read: true } : alert
      ));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 mb-4">
        {unreadCount.high > 0 && <AlertBadge severity="high" count={unreadCount.high} />}
        {unreadCount.medium > 0 && <AlertBadge severity="medium" count={unreadCount.medium} />}
        {unreadCount.low > 0 && <AlertBadge severity="low" count={unreadCount.low} />}
      </div>

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <AlertsList alerts={alerts} onMarkAsRead={handleMarkAsRead} />
        <AlertPreferences 
          preferences={preferences} 
          onPreferenceUpdate={() => fetchPreferences()}
        />
      </div>
    </div>
  );
};
