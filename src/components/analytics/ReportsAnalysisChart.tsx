
import React from "react";
import AnalyticsChart from "./AnalyticsChart";
import { useAnalyticsData } from "@/hooks/useAnalyticsData";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ReportsAnalysisChartProps {
  period?: string;
  region?: string;
}

const ReportsAnalysisChart: React.FC<ReportsAnalysisChartProps> = ({ 
  period = '3months',
  region = 'all'
}) => {
  const reportTypesData = useAnalyticsData('report-types', period, region);
  const verificationData = useAnalyticsData('verification-status', period, region);

  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-lg font-medium mb-4">Detailed Reports Analysis</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Comprehensive breakdown of report types, sources, and verification status
        </p>
        
        <Tabs defaultValue="types">
          <TabsList className="mb-4">
            <TabsTrigger value="types">Report Types</TabsTrigger>
            <TabsTrigger value="verification">Verification Status</TabsTrigger>
          </TabsList>
          
          <TabsContent value="types">
            {reportTypesData.loading ? (
              <Skeleton className="h-[300px] w-full" />
            ) : reportTypesData.error ? (
              <div className="flex items-center justify-center h-[300px]">
                <p className="text-sm text-muted-foreground">Failed to load data</p>
              </div>
            ) : (
              <AnalyticsChart
                data={reportTypesData.data}
                type="pie"
                dataKeys={["value"]}
                colors={["#22c55e", "#3b82f6", "#f59e0b", "#ec4899"]}
              />
            )}
          </TabsContent>
          
          <TabsContent value="verification">
            {verificationData.loading ? (
              <Skeleton className="h-[300px] w-full" />
            ) : verificationData.error ? (
              <div className="flex items-center justify-center h-[300px]">
                <p className="text-sm text-muted-foreground">Failed to load data</p>
              </div>
            ) : (
              <AnalyticsChart
                data={verificationData.data}
                type="pie"
                dataKeys={["value"]}
                colors={["#22c55e", "#f59e0b"]}
              />
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ReportsAnalysisChart;
