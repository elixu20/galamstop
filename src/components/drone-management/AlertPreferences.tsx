
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface AlertPreference {
  id: string;
  alert_type: string;
  enabled: boolean;
  threshold_value: number;
}

interface AlertPreferencesProps {
  preferences: AlertPreference[];
  onPreferenceUpdate: () => void;
}

export const AlertPreferences = ({ preferences, onPreferenceUpdate }: AlertPreferencesProps) => {
  const { toast } = useToast();

  const updatePreference = async (prefId: string, updates: Partial<AlertPreference>) => {
    const { error } = await supabase
      .from('alert_preferences')
      .update(updates)
      .eq('id', prefId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update alert preferences",
        variant: "destructive",
      });
    } else {
      onPreferenceUpdate();
    }
  };

  const formatAlertType = (type: string) => {
    return type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Alert Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {preferences.map((pref) => (
          <div key={pref.id} className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor={`${pref.id}-enabled`}>{formatAlertType(pref.alert_type)}</Label>
              <Switch
                id={`${pref.id}-enabled`}
                checked={pref.enabled}
                onCheckedChange={(checked) => updatePreference(pref.id, { enabled: checked })}
              />
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor={`${pref.id}-threshold`}>Threshold</Label>
              <Input
                id={`${pref.id}-threshold`}
                type="number"
                value={pref.threshold_value}
                onChange={(e) => updatePreference(pref.id, { threshold_value: Number(e.target.value) })}
                className="max-w-[100px]"
              />
              <span className="text-sm text-muted-foreground">
                {pref.alert_type === 'low_battery' ? '%' : 
                 pref.alert_type === 'high_speed' ? 'm/s' : 'm'}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
