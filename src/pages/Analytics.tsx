
import React from "react";
import Navbar from "@/components/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatsCard from "@/components/stats-card";
import { 
  Calendar, 
  MapPin, 
  FileText,
  Download,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Placeholder for a real chart implementation
const ChartPlaceholder = ({ title, description }: { title: string, description?: string }) => (
  <div className="p-4">
    <h3 className="text-lg font-medium">{title}</h3>
    {description && <p className="text-sm text-muted-foreground">{description}</p>}
    <div className="mt-4 bg-gray-100 rounded-md p-4 h-64 flex items-center justify-center">
      <div className="text-center">
        <p className="text-muted-foreground">Chart visualization would appear here</p>
        <p className="text-xs text-muted-foreground mt-2">
          In a real implementation, this would be integrated with a chart library
        </p>
      </div>
    </div>
  </div>
);

const Analytics: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container py-6">
        <div className="flex flex-col md:flex-row items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-galamsey-green-dark">
              Analytics & Insights
            </h1>
            <p className="text-muted-foreground mt-1">
              Visualize trends and measure impact of anti-galamsey efforts
            </p>
          </div>
          
          <div className="flex gap-3 mt-4 md:mt-0">
            <Button>
              <FileText className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Data
            </Button>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex-1 min-w-[240px]">
            <Select defaultValue="3months">
              <SelectTrigger>
                <SelectValue placeholder="Select time period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30days">Last 30 Days</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex-1 min-w-[240px]">
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="ashanti">Ashanti Region</SelectItem>
                <SelectItem value="western">Western Region</SelectItem>
                <SelectItem value="eastern">Eastern Region</SelectItem>
                <SelectItem value="central">Central Region</SelectItem>
                <SelectItem value="greater">Greater Accra</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button variant="outline" className="ml-auto">
            <ChevronDown className="mr-2 h-4 w-4" />
            More Filters
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <StatsCard
            title="Total Reports"
            value="1,245"
            icon={<MapPin className="h-4 w-4" />}
            description="All time activity reports"
          />
          <StatsCard
            title="Reports This Month"
            value="87"
            icon={<Calendar className="h-4 w-4" />}
            trend={{ value: 5, isPositive: false }}
          />
          <StatsCard
            title="Enforcement Rate"
            value="68%"
            description="Reports leading to action"
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Water Bodies Affected"
            value="23"
            description="Monitored water sources"
            trend={{ value: 3, isPositive: false }}
          />
        </div>
        
        <Tabs defaultValue="overview" className="mb-6">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="reports">Reports Analysis</TabsTrigger>
            <TabsTrigger value="environmental">Environmental Impact</TabsTrigger>
            <TabsTrigger value="enforcement">Enforcement</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Galamsey Activity Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartPlaceholder 
                    title="Monthly Reports" 
                    description="Number of galamsey incidents reported over time"
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Regional Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartPlaceholder 
                    title="Activity by Region" 
                    description="Heatmap of galamsey activity across Ghana's regions"
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Environmental Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartPlaceholder 
                    title="Environmental Indicators" 
                    description="Water turbidity, forest cover loss, and land degradation metrics"
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Enforcement Outcomes</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartPlaceholder 
                    title="Action Taken vs. Pending" 
                    description="Status of enforcement actions on reported cases"
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="reports">
            <Card>
              <CardContent className="pt-6">
                <ChartPlaceholder 
                  title="Detailed Reports Analysis" 
                  description="Comprehensive breakdown of report types, sources, and verification status"
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="environmental">
            <Card>
              <CardContent className="pt-6">
                <ChartPlaceholder 
                  title="Environmental Impact Assessment" 
                  description="Detailed analysis of environmental damage and recovery metrics"
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="enforcement">
            <Card>
              <CardContent className="pt-6">
                <ChartPlaceholder 
                  title="Enforcement Effectiveness" 
                  description="Analysis of response times, actions taken, and outcomes"
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Top Affected Areas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {["Obuasi", "Tarkwa", "Akyem", "Prestea", "Dunkwa-on-Offin"].map((area, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-full max-w-md">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">{area}</span>
                        <span className="text-sm text-muted-foreground">
                          {90 - index * 15}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-galamsey-green-DEFAULT h-2.5 rounded-full"
                          style={{ width: `${90 - index * 15}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Report Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Active Mining", percentage: 45 },
                  { name: "Water Pollution", percentage: 30 },
                  { name: "Deforestation", percentage: 15 },
                  { name: "Equipment Sighting", percentage: 10 }
                ].map((category, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{category.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {category.percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-galamsey-gold-DEFAULT h-2.5 rounded-full"
                        style={{ width: `${category.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Analytics;
