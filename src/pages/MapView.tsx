
import React, { useState } from "react";
import Navbar from "@/components/navbar";
import Map from "@/components/ui/map";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MapPin, Calendar } from "lucide-react";

const MapView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-galamsey-green-dark">
            Galamsey Activity Map
          </h1>
          <p className="text-muted-foreground mt-1">
            Visualize and track illegal mining activities across Ghana
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-3/4">
            <div className="bg-white p-4 rounded-lg border shadow-sm mb-6">
              <div className="flex flex-wrap gap-3 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search by location or coordinates..." 
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
                <Button>Show All</Button>
              </div>
              
              <Tabs defaultValue="satellite">
                <TabsList className="mb-4">
                  <TabsTrigger value="satellite">Satellite</TabsTrigger>
                  <TabsTrigger value="terrain">Terrain</TabsTrigger>
                  <TabsTrigger value="heatmap">Heat Map</TabsTrigger>
                </TabsList>
                
                <TabsContent value="satellite" className="h-[600px] rounded-md overflow-hidden">
                  <Map className="h-full" />
                </TabsContent>
                
                <TabsContent value="terrain" className="h-[600px] rounded-md overflow-hidden">
                  <Map className="h-full" />
                </TabsContent>
                
                <TabsContent value="heatmap" className="h-[600px] rounded-md overflow-hidden">
                  <Map className="h-full" />
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          <div className="w-full lg:w-1/4 space-y-6">
            <div className="bg-white p-4 rounded-lg border shadow-sm">
              <h3 className="font-semibold mb-4">Activity Legend</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-galamsey-red-DEFAULT"></div>
                  <span className="text-sm">Active Illegal Mining</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-galamsey-gold-DEFAULT"></div>
                  <span className="text-sm">Reported Location</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-galamsey-green-DEFAULT"></div>
                  <span className="text-sm">Monitored Area</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-galamsey-blue-DEFAULT"></div>
                  <span className="text-sm">Licensed Mining</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-galamsey-brown-DEFAULT"></div>
                  <span className="text-sm">Rehabilitated Site</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border shadow-sm">
              <h3 className="font-semibold mb-4">Recent Reports</h3>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border-b pb-3 last:border-b-0 last:pb-0">
                    <h4 className="font-medium text-sm">Illegal mining site near Obuasi</h4>
                    <div className="flex items-center mt-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>Obuasi, Ashanti Region</span>
                    </div>
                    <div className="flex items-center mt-0.5 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>April 22, 2024</span>
                    </div>
                    <div className="mt-1">
                      <Badge variant="outline" className="text-xs">
                        Under Investigation
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="link" className="w-full mt-2 text-galamsey-green-DEFAULT">
                View All Reports
              </Button>
            </div>
            
            <div className="bg-white p-4 rounded-lg border shadow-sm">
              <h3 className="font-semibold mb-4">Filter Options</h3>
              <div className="space-y-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Activity Type</label>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="cursor-pointer">All</Badge>
                    <Badge variant="outline" className="cursor-pointer">Mining</Badge>
                    <Badge variant="outline" className="cursor-pointer">Water Pollution</Badge>
                    <Badge variant="outline" className="cursor-pointer">Deforestation</Badge>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Time Period</label>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="cursor-pointer">All Time</Badge>
                    <Badge variant="outline" className="cursor-pointer">This Month</Badge>
                    <Badge variant="outline" className="cursor-pointer">Last 3 Months</Badge>
                    <Badge variant="outline" className="cursor-pointer">Last Year</Badge>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="cursor-pointer">All</Badge>
                    <Badge variant="outline" className="cursor-pointer">Active</Badge>
                    <Badge variant="outline" className="cursor-pointer">Investigating</Badge>
                    <Badge variant="outline" className="cursor-pointer">Resolved</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MapView;
