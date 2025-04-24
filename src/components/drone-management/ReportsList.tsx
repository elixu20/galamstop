
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Download, FileHeart, Search, Filter } from 'lucide-react';
import { format } from 'date-fns';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Report {
  id: string;
  report_type: string;
  status: string;
  created_at: string;
  report_url: string | null;
}

export const ReportsList = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [filteredReports, setFilteredReports] = useState<Report[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  useEffect(() => {
    fetchReports();
    
    const channel = supabase
      .channel('public:drone_reports')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'drone_reports' },
        (payload) => {
          // Show notification when a report is completed
          if (payload.eventType === 'UPDATE' && 
              payload.new.status === 'completed' && 
              payload.old.status === 'processing') {
            showCompletionNotification(payload.new.report_type);
          }
          fetchReports();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    // Apply filters when reports, searchTerm, or filters change
    applyFilters();
  }, [reports, searchTerm, statusFilter, typeFilter]);

  const fetchReports = async () => {
    const { data } = await supabase
      .from('drone_reports')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) {
      setReports(data);
    }
  };

  const applyFilters = () => {
    let result = [...reports];

    // Apply search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(report => 
        report.report_type.toLowerCase().includes(searchLower)
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(report => report.status === statusFilter);
    }

    // Apply type filter
    if (typeFilter !== 'all') {
      result = result.filter(report => report.report_type === typeFilter);
    }

    setFilteredReports(result);
  };

  const showCompletionNotification = (reportType: string) => {
    // Create a notification element
    const notification = document.createElement('div');
    notification.className = 
      'fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-md shadow-lg z-50 animate-slide-in-right';
    notification.innerHTML = `
      <div class="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" 
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <span>Report ${reportType.replace('_', ' ')} is ready for download</span>
      </div>
    `;

    // Add to DOM
    document.body.appendChild(notification);

    // Remove after 5 seconds
    setTimeout(() => {
      notification.classList.replace('animate-slide-in-right', 'animate-slide-out-right');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 5000);
  };

  // Get unique report types for the filter dropdown
  const reportTypes = ['all', ...Array.from(new Set(reports.map(report => report.report_type)))];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileHeart className="h-5 w-5" />
          Generated Reports
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Search and filter controls */}
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reports..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select
                value={statusFilter}
                onValueChange={setStatusFilter}
              >
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={typeFilter}
                onValueChange={setTypeFilter}
              >
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type === 'all' ? 'All Types' : type.replace('_', ' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {filteredReports.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              {reports.length === 0 ? "No reports generated yet" : "No reports match your filters"}
            </p>
          ) : (
            filteredReports.map((report) => (
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
                    variant={
                      report.status === 'completed' ? 'default' : 
                      report.status === 'processing' ? 'secondary' :
                      report.status === 'failed' ? 'destructive' : 'outline'
                    }
                  >
                    {report.status}
                    {report.status === 'processing' && (
                      <span className="ml-2 h-2 w-2 animate-pulse rounded-full bg-current"></span>
                    )}
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
