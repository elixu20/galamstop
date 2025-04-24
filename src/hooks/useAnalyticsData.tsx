
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";

// Mock data generation (can be replaced with real API calls later)
const generateMockData = (type: string) => {
  // Activity trend data (monthly reports)
  if (type === 'activity-trend') {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.map(month => ({
      name: month,
      reports: Math.floor(Math.random() * 100) + 20,
      enforcement: Math.floor(Math.random() * 80)
    }));
  }
  
  // Regional distribution data
  if (type === 'regional-distribution') {
    return [
      { name: 'Ashanti', value: 235 },
      { name: 'Western', value: 187 },
      { name: 'Eastern', value: 162 },
      { name: 'Central', value: 95 },
      { name: 'Greater Accra', value: 57 },
      { name: 'Upper East', value: 42 },
      { name: 'Upper West', value: 38 },
      { name: 'Northern', value: 25 }
    ];
  }
  
  // Environmental impact data
  if (type === 'environmental-impact') {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.map(month => ({
      name: month,
      waterTurbidity: Math.floor(Math.random() * 60) + 40,
      forestLoss: Math.floor(Math.random() * 30) + 10,
      landDegradation: Math.floor(Math.random() * 40) + 20
    }));
  }
  
  // Enforcement outcomes data
  if (type === 'enforcement-outcomes') {
    return [
      { name: 'Action Taken', value: 68 },
      { name: 'Pending', value: 22 },
      { name: 'Referred', value: 10 }
    ];
  }

  // Report types data
  if (type === 'report-types') {
    return [
      { name: 'Active Mining', value: 45 },
      { name: 'Water Pollution', value: 30 },
      { name: 'Deforestation', value: 15 },
      { name: 'Equipment Sighting', value: 10 }
    ];
  }

  // Report verification status
  if (type === 'verification-status') {
    return [
      { name: 'Verified', value: 65 },
      { name: 'Unverified', value: 35 }
    ];
  }

  // Response time data
  if (type === 'response-time') {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.map(month => ({
      name: month,
      responseTime: Math.floor(Math.random() * 48) + 24,
      target: 48
    }));
  }

  // Default empty array
  return [];
};

// In a real implementation, this would fetch from Supabase or another data source
const fetchRealData = async (type: string, period: string = '3months', region: string = 'all') => {
  try {
    if (type === 'activity-trend') {
      // This would be replaced with a real API call or database query
      const { data: reports, error } = await supabase
        .from('drone_reports')
        .select('created_at, report_type, status')
        .order('created_at');
        
      if (error) throw error;
      
      // Process real data into the format needed for charts
      // This is just an example, in a real application you'd do more sophisticated aggregation
      const monthlyData: Record<string, any> = {};
      
      reports?.forEach(report => {
        const date = new Date(report.created_at);
        const monthYear = `${date.toLocaleString('default', { month: 'short' })}-${date.getFullYear()}`;
        
        if (!monthlyData[monthYear]) {
          monthlyData[monthYear] = { name: monthYear, reports: 0, enforcement: 0 };
        }
        
        monthlyData[monthYear].reports += 1;
        if (report.status === 'completed') {
          monthlyData[monthYear].enforcement += 1;
        }
      });
      
      // Convert to array and sort by date
      return Object.values(monthlyData).sort((a: any, b: any) => {
        return new Date(a.name).getTime() - new Date(b.name).getTime();
      });
    }
    
    // For now, return mock data for other types
    return generateMockData(type);
    
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    return generateMockData(type); // Fallback to mock data
  }
};

export function useAnalyticsData(type: string, period: string = '3months', region: string = 'all') {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        // Try to get real data first
        const result = await fetchRealData(type, period, region);
        setData(result);
        setError(null);
      } catch (err) {
        console.error("Error in useAnalyticsData:", err);
        setError(err as Error);
        // Fallback to mock data
        setData(generateMockData(type));
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [type, period, region]);

  return { data, loading, error };
}
