
import React, { useState } from "react";
import Navbar from "@/components/navbar";
import { Card, CardContent } from "@/components/ui/card";
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

// Import our chart components
import ActivityTrendChart from "@/components/analytics/ActivityTrendChart";
import RegionalDistributionChart from "@/components/analytics/RegionalDistributionChart";
import EnvironmentalImpactChart from "@/components/analytics/EnvironmentalImpactChart";
import EnforcementOutcomesChart from "@/components/analytics/EnforcementOutcomesChart";
import ReportsAnalysisChart from "@/components/analytics/ReportsAnalysisChart";
import EnvironmentalDetailChart from "@/components/analytics/EnvironmentalDetailChart";
import EnforcementDetailChart from "@/components/analytics/EnforcementDetailChart";

const Analytics: React.FC = () => {
  const [period, setPeriod] = useState("3months");
  const [region, setRegion] = useState("all");

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
            <Select 
              defaultValue={period} 
              value={period} 
              onValueChange={setPeriod}
            >
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
            <Select 
              defaultValue={region} 
              value={region} 
              onValueChange={setRegion}
            >
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
              <ActivityTrendChart period={period} region={region} />
              <RegionalDistributionChart period={period} />
              <EnvironmentalImpactChart period={period} region={region} />
              <EnforcementOutcomesChart period={period} region={region} />
            </div>
          </TabsContent>
          
          <TabsContent value="reports">
            <ReportsAnalysisChart period={period} region={region} />
          </TabsContent>
          
          <TabsContent value="environmental">
            <EnvironmentalDetailChart period={period} region={region} />
          </TabsContent>
          
          <TabsContent value="enforcement">
            <EnforcementDetailChart period={period} region={region} />
          </TabsContent>
        </Tabs>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Top Affected Areas</h3>
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
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Report Categories</h3>
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
