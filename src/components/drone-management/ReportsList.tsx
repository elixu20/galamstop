
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Download, FileChart } from 'lucide-react';
import { format } from 'date-fns';

interface Report {
  id: string;
  report_type: string;
  status: string;
  created_at: string;
  report_url: string | null;
}

export const ReportsList = () => {
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    fetchReports();
    
    const channel = supabase
      .channel('public:drone_reports')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'drone_reports' },
        () => {
          fetchReports();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchReports = async () => {
    const { data } = await supabase
      .from('drone_reports')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) {
      setReports(data);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileChart className="h-5 w-5" />
          Generated Reports
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reports.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              No reports generated yet
            </p>
          ) : (
            reports.map((report) => (
              <div
                key={report.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="space-y-1">
                  <h3 className="font-medium capitalize">
                    {report.report_type.replace('_', ' ')} Report
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Generated on {format(new Date(report.created_at), 'PPp')}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Badge
                    variant={report.status === 'completed' ? 'default' : 'secondary'}
                  >
                    {report.status}
                  </Badge>
                  {report.report_url && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                      asChild
                    >
                      <a href={report.report_url} download>
                        <Download className="h-4 w-4" />
                        Download
                      </a>
                    </Button>
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
