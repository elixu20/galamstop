
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { Wifi, WifiOff } from 'lucide-react';

interface Drone {
  id: string;
  name: string;
  model: string | null;
  serial_number: string | null;
  status: string;
  last_connected: string | null;
  feed_url: string;
}

export const DroneList = () => {
  const [drones, setDrones] = useState<Drone[]>([]);

  useEffect(() => {
    fetchDrones();
    
    // Subscribe to realtime changes
    const channel = supabase
      .channel('public:drones')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'drones' },
        (payload) => {
          fetchDrones();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchDrones = async () => {
    const { data, error } = await supabase
      .from('drones')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setDrones(data);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Registered Drones</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {drones.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              No drones registered yet
            </p>
          ) : (
            drones.map((drone) => (
              <div
                key={drone.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <h3 className="font-medium">{drone.name}</h3>
                  {drone.model && (
                    <p className="text-sm text-muted-foreground">
                      Model: {drone.model}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {drone.status === 'online' ? (
                    <>
                      <Wifi className="h-4 w-4 text-green-500" />
                      <Badge variant="success">Online</Badge>
                    </>
                  ) : (
                    <>
                      <WifiOff className="h-4 w-4 text-gray-500" />
                      <Badge variant="secondary">Offline</Badge>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
