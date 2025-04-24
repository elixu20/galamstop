
import React, { useState } from "react";
import AnalyticsChart from "./AnalyticsChart";
import { useAnalyticsData } from "@/hooks/useAnalyticsData";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface EnvironmentalDetailChartProps {
  period?: string;
  region?: string;
}

const EnvironmentalDetailChart: React.FC<EnvironmentalDetailChartProps> = ({ 
  period = '3months',
  region = 'all'
}) => {
  const [selectedIndicator, setSelectedIndicator] = useState("water");
  const { data, loading, error } = useAnalyticsData('environmental-impact', period, region);

  // Transformed data for specific indicators
  const waterData = data.map(item => ({
    name: item.name,
    turbidity: item.waterTurbidity,
    threshold: 50 // Example threshold
  }));

  const forestData = data.map(item => ({
    name: item.name,
    deforestation: item.forestLoss,
    threshold: 20 // Example threshold
  }));

  const landData = data.map(item => ({
    name: item.name,
    degradation: item.landDegradation,
    threshold: 30 // Example threshold
  }));

  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-lg font-medium mb-4">Environmental Impact Assessment</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Detailed analysis of environmental damage and recovery metrics
        </p>
        
        <Tabs defaultValue="water" onValueChange={setSelectedIndicator}>
          <TabsList className="mb-4">
            <TabsTrigger value="water">Water Quality</TabsTrigger>
            <TabsTrigger value="forest">Forest Cover</TabsTrigger>
            <TabsTrigger value="land">Land Degradation</TabsTrigger>
          </TabsList>
          
          <TabsContent value="water">
            {loading ? (
              <Skeleton className="h-[300px] w-full" />
            ) : error ? (
              <div className="flex items-center justify-center h-[300px]">
                <p className="text-sm text-muted-foreground">Failed to load data</p>
              </div>
            ) : (
              <div>
                <p className="text-sm text-muted-foreground mb-4">
                  Water turbidity levels across monitored water bodies
                </p>
                <AnalyticsChart
                  data={waterData}
                  type="area"
                  xAxisKey="name"
                  dataKeys={["turbidity", "threshold"]}
                  colors={["#3b82f6", "#f59e0b"]}
                />
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="forest">
            {loading ? (
              <Skeleton className="h-[300px] w-full" />
            ) : error ? (
              <div className="flex items-center justify-center h-[300px]">
                <p className="text-sm text-muted-foreground">Failed to load data</p>
              </div>
            ) : (
              <div>
                <p className="text-sm text-muted-foreground mb-4">
                  Forest cover loss due to mining activities
                </p>
                <AnalyticsChart
                  data={forestData}
                  type="area"
                  xAxisKey="name"
                  dataKeys={["deforestation", "threshold"]}
                  colors={["#22c55e", "#f59e0b"]}
                />
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="land">
            {loading ? (
              <Skeleton className="h-[300px] w-full" />
            ) : error ? (
              <div className="flex items-center justify-center h-[300px]">
                <p className="text-sm text-muted-foreground">Failed to load data</p>
              </div>
            ) : (
              <div>
                <p className="text-sm text-muted-foreground mb-4">
                  Land degradation index in affected areas
                </p>
                <AnalyticsChart
                  data={landData}
                  type="area"
                  xAxisKey="name"
                  dataKeys={["degradation", "threshold"]}
                  colors={["#f59e0b", "#ef4444"]}
                />
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EnvironmentalDetailChart;
