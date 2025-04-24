
import React from "react";
import AnalyticsChart from "./AnalyticsChart";
import { useAnalyticsData } from "@/hooks/useAnalyticsData";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface EnvironmentalImpactChartProps {
  period?: string;
  region?: string;
}

const EnvironmentalImpactChart: React.FC<EnvironmentalImpactChartProps> = ({ 
  period = '3months',
  region = 'all'
}) => {
  const { data, loading, error } = useAnalyticsData('environmental-impact', period, region);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Environmental Impact</CardTitle>
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
              Water turbidity, forest cover loss, and land degradation metrics
            </p>
            <AnalyticsChart
              data={data}
              type="line"
              xAxisKey="name"
              dataKeys={["waterTurbidity", "forestLoss", "landDegradation"]}
              colors={["#3b82f6", "#22c55e", "#f59e0b"]}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EnvironmentalImpactChart;
