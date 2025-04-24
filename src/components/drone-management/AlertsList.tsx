
import React from 'react';
import { format } from 'date-fns';
import { AlertTriangle, Battery, Gauge, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Alert {
  id: string;
  alert_type: string;
  message: string;
  severity: string;
  created_at: string;
  is_read: boolean;
}

interface AlertsListProps {
  alerts: Alert[];
  onMarkAsRead: (alertId: string) => void;
}

export const AlertsList = ({ alerts, onMarkAsRead }: AlertsListProps) => {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'low_battery':
        return <Battery className="h-4 w-4" />;
      case 'high_speed':
        return <Gauge className="h-4 w-4" />;
      case 'high_altitude':
        return <MapPin className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Alert History</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">No alerts to display</p>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className={`flex items-start gap-3 p-3 rounded-md ${
                !alert.is_read ? 'bg-muted/50' : ''
              }`}
              onClick={() => !alert.is_read && onMarkAsRead(alert.id)}
            >
              <div className={`p-2 rounded-full 
                ${alert.severity === 'high' ? 'bg-red-100 text-red-600' :
                  alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-blue-100 text-blue-600'}`}
              >
                {getAlertIcon(alert.alert_type)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <p className="font-medium text-sm">{alert.message}</p>
                  <Badge variant="outline" className="text-xs">
                    {alert.severity}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {format(new Date(alert.created_at), 'MMM d, yyyy HH:mm:ss')}
                </p>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};
