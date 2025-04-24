
import React from "react";
import AnalyticsChart from "./AnalyticsChart";
import { useAnalyticsData } from "@/hooks/useAnalyticsData";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface ActivityTrendChartProps {
  period?: string;
  region?: string;
}

const ActivityTrendChart: React.FC<ActivityTrendChartProps> = ({ 
  period = '3months',
  region = 'all'
}) => {
  const { data, loading, error } = useAnalyticsData('activity-trend', period, region);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Galamsey Activity Trend</CardTitle>
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
              Number of galamsey incidents reported over time
            </p>
            <AnalyticsChart
              data={data}
              type="area"
              xAxisKey="name"
              dataKeys={["reports", "enforcement"]}
              colors={["#22c55e", "#f59e0b"]}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ActivityTrendChart;
