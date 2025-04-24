
import { supabase } from '@/integrations/supabase/client';

interface OfflineReport {
  id: string;
  incidentType: string;
  location: string;
  description: string;
  date: string;
  images?: FileList;
  createdAt: string;
  synced: boolean;
}

class OfflineStorage {
  private readonly STORAGE_KEY = 'offline_reports';

  async saveReport(report: Omit<OfflineReport, "id" | "synced" | "createdAt">) {
    const reports = await this.getOfflineReports();
    const newReport: OfflineReport = {
      ...report,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      synced: false,
    };

    reports.push(newReport);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(reports));
    return newReport;
  }

  async getOfflineReports(): Promise<OfflineReport[]> {
    const reports = localStorage.getItem(this.STORAGE_KEY);
    return reports ? JSON.parse(reports) : [];
  }

  async syncReports() {
    const reports = await this.getOfflineReports();
    const unsyncedReports = reports.filter(report => !report.synced);
    
    for (const report of unsyncedReports) {
      try {
        // Using drone_reports table instead of "reports"
        const { error } = await supabase
          .from('drone_reports')
          .insert({
            report_type: 'mining_incident',
            parameters: {
              incidentType: report.incidentType,
              location: report.location,
              description: report.description,
              reportedDate: report.date,
            },
            // You might need to add user_id if required
            user_id: '00000000-0000-0000-0000-000000000000' // Replace with actual user ID when available
          });

        if (!error) {
          // Update report as synced
          const updatedReports = reports.map(r => 
            r.id === report.id ? { ...r, synced: true } : r
          );
          localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedReports));
        }
      } catch (error) {
        console.error('Failed to sync report:', error);
      }
    }
  }
}

export const offlineStorage = new OfflineStorage();
