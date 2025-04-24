
import React, { useState } from 'react';
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
  format: string;
}

export const ReportGenerator = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { register, handleSubmit, reset } = useForm<ReportFormData>();
  const [isGenerating, setIsGenerating] = useState(false);

  const onSubmit = async (data: ReportFormData) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to generate reports",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const { error, data: reportData } = await supabase
        .from('drone_reports')
        .insert({
          user_id: user.id,
          report_type: data.reportType,
          parameters: {
            startDate: data.startDate,
            endDate: data.endDate,
            format: data.format,
          },
        })
        .select('id')
        .single();

      if (error) throw error;

      toast({
        title: "Report Generation Started",
        description: `Your ${data.reportType.replace('_', ' ')} report is being generated. You'll be notified when it's ready.`,
      });
      
      reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate report",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
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
                <SelectItem value="drone_status">Drone Status</SelectItem>
                <SelectItem value="anomaly_detection">Anomaly Detection</SelectItem>
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

          <div className="space-y-2">
            <label className="text-sm font-medium">Export Format</label>
            <Select {...register('format')}>
              <SelectTrigger>
                <SelectValue placeholder="Select export format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF Document</SelectItem>
                <SelectItem value="csv">CSV Spreadsheet</SelectItem>
                <SelectItem value="xlsx">Excel Spreadsheet</SelectItem>
                <SelectItem value="json">JSON Data</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            type="submit" 
            disabled={isGenerating}
            className={isGenerating ? "animate-pulse" : ""}
          >
            {isGenerating ? "Generating..." : "Generate Report"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
