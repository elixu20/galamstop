import React from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { FileHeart } from 'lucide-react';

interface ReportFormData {
  reportType: string;
  startDate: string;
  endDate: string;
}

export const ReportGenerator = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { register, handleSubmit } = useForm<ReportFormData>();

  const onSubmit = async (data: ReportFormData) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to generate reports",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('drone_reports')
        .insert({
          user_id: user.id,
          report_type: data.reportType,
          parameters: {
            startDate: data.startDate,
            endDate: data.endDate,
          },
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Report generation started",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate report",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileHeart className="h-5 w-5" />
          Generate Report
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Report Type</label>
            <Select {...register('reportType')}>
              <SelectTrigger>
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="telemetry">Telemetry Data</SelectItem>
                <SelectItem value="activity">Activity Log</SelectItem>
                <SelectItem value="summary">Summary Report</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Start Date</label>
              <Input
                type="datetime-local"
                {...register('startDate')}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">End Date</label>
              <Input
                type="datetime-local"
                {...register('endDate')}
              />
            </div>
          </div>

          <Button type="submit">Generate Report</Button>
        </form>
      </CardContent>
    </Card>
  );
};
