
import React from "react";
import AnalyticsChart from "./AnalyticsChart";
import { useAnalyticsData } from "@/hooks/useAnalyticsData";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface EnforcementDetailChartProps {
  period?: string;
  region?: string;
}

const EnforcementDetailChart: React.FC<EnforcementDetailChartProps> = ({ 
  period = '3months',
  region = 'all'
}) => {
  const { data: responseTimeData, loading: responseLoading, error: responseError } = 
    useAnalyticsData('response-time', period, region);
    
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-lg font-medium mb-4">Enforcement Effectiveness</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Analysis of response times, actions taken, and outcomes
        </p>
        
        <Tabs defaultValue="response">
          <TabsList className="mb-4">
            <TabsTrigger value="response">Response Time</TabsTrigger>
            <TabsTrigger value="outcomes">Action Outcomes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="response">
            {responseLoading ? (
              <Skeleton className="h-[300px] w-full" />
            ) : responseError ? (
              <div className="flex items-center justify-center h-[300px]">
                <p className="text-sm text-muted-foreground">Failed to load data</p>
              </div>
            ) : (
              <div>
                <p className="text-sm text-muted-foreground mb-4">
                  Average response time in hours (lower is better)
                </p>
                <AnalyticsChart
                  data={responseTimeData}
                  type="line"
                  xAxisKey="name"
                  dataKeys={["responseTime", "target"]}
                  colors={["#22c55e", "#f59e0b"]}
                />
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="outcomes">
            {/* This could be a more detailed analysis of action outcomes */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                  <h4 className="font-medium text-green-800">68%</h4>
                  <p className="text-sm text-green-600">Cases Resolved</p>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100">
                  <h4 className="font-medium text-yellow-800">22%</h4>
                  <p className="text-sm text-yellow-600">In Progress</p>
                </div>
                <div className="bg-red-50 rounded-lg p-4 border border-red-100">
                  <h4 className="font-medium text-red-800">10%</h4>
                  <p className="text-sm text-red-600">No Action Taken</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Regional Enforcement Effectiveness</h4>
                <div className="space-y-3">
                  {["Ashanti Region", "Western Region", "Eastern Region", "Central Region"].map((region, idx) => (
                    <div key={region} className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm">{region}</span>
                        <span className="text-sm">{85 - idx * 10}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-green-500 h-1.5 rounded-full" 
                          style={{ width: `${85 - idx * 10}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EnforcementDetailChart;
