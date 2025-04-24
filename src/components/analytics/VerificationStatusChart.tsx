
import React from "react";
import AnalyticsChart from "./AnalyticsChart";
import { useAnalyticsData } from "@/hooks/useAnalyticsData";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface VerificationStatusChartProps {
  period?: string;
  region?: string;
}

const VerificationStatusChart: React.FC<VerificationStatusChartProps> = ({ 
  period = '3months',
  region = 'all'
}) => {
  const { data, loading, error } = useAnalyticsData('verification-status', period, region);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Verification Status</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-[300px] w-full" />
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-[300px]">
            <p className="text-sm text-muted-foreground">Failed to load data</p>
          </div>
        ) : (
          <div>
            <p className="text-sm text-muted-foreground mb-4">
              Verification status of reported incidents
            </p>
            <AnalyticsChart
              data={data}
              type="pie"
              dataKeys={["value"]}
              colors={["#22c55e", "#f59e0b"]}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VerificationStatusChart;
