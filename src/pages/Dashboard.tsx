
import React from "react";
import Navbar from "@/components/navbar";
import Map from "@/components/ui/map";
import StatsCard from "@/components/stats-card";
import ActivityFeed from "@/components/activity-feed";
import { Button } from "@/components/ui/button";
import { MapPin, FileText, Search, Bell, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container py-6">
        <div className="flex flex-col md:flex-row items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-galamsey-green-dark">
              Monitoring Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Track and monitor illegal mining activities across Ghana
            </p>
          </div>
          
          <div className="flex gap-3 mt-4 md:mt-0">
            <Button>
              <FileText className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
            <Button variant="outline">
              <Bell className="mr-2 h-4 w-4" />
              Alerts
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <StatsCard
            title="Active Reports"
            value={247}
            icon={<MapPin className="h-4 w-4" />}
            trend={{ value: 12, isPositive: false }}
          />
          <StatsCard
            title="Monitored Areas"
            value={32}
            icon={<Search className="h-4 w-4" />}
            trend={{ value: 8, isPositive: true }}
          />
          <StatsCard
            title="Enforcement Actions"
            value={58}
            icon={<Bell className="h-4 w-4" />}
            trend={{ value: 24, isPositive: true }}
          />
          <StatsCard
            title="Community Reports"
            value={142}
            icon={<Calendar className="h-4 w-4" />}
            trend={{ value: 18, isPositive: true }}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardContent className="p-0">
              <div className="p-4 border-b">
                <h3 className="font-medium">Active Galamsey Hotspots</h3>
              </div>
              <div className="h-[400px]">
                <Map />
              </div>
            </CardContent>
          </Card>
          
          <div className="space-y-6">
            <ActivityFeed />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
