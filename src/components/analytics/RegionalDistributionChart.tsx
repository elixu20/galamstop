
import React from "react";
import AnalyticsChart from "./AnalyticsChart";
import { useAnalyticsData } from "@/hooks/useAnalyticsData";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface RegionalDistributionChartProps {
  period?: string;
}

const RegionalDistributionChart: React.FC<RegionalDistributionChartProps> = ({ 
  period = '3months'
}) => {
  const { data, loading, error } = useAnalyticsData('regional-distribution', period);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Regional Distribution</CardTitle>
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
              Heatmap of galamsey activity across Ghana's regions
            </p>
            <AnalyticsChart
              data={data}
              type="bar"
              xAxisKey="name"
              dataKeys={["value"]}
              colors={["#22c55e"]}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RegionalDistributionChart;
