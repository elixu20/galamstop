
import React, { useState } from "react";
import Navbar from "@/components/navbar";
import Map from "@/components/ui/map";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MapPin, Calendar } from "lucide-react";

// Sample hotspot data to display on the map
const sampleHotspots = [
  // Active mining sites (red)
  { lat: 7.9465, lng: -1.0232, type: 'active' }, // Center of Ghana
  { lat: 7.6233, lng: -1.5232, type: 'active' },
  { lat: 8.1465, lng: -0.8832, type: 'active' },
  { lat: 7.3865, lng: -1.2432, type: 'active' },
  
  // Reported activity sites (gold)
  { lat: 7.8765, lng: -1.3432, type: 'reported' },
  { lat: 7.5965, lng: -0.8732, type: 'reported' },
  { lat: 8.0265, lng: -1.1632, type: 'reported' },
  
  // Monitored areas (green)
  { lat: 7.7165, lng: -0.9932, type: 'monitored' },
  { lat: 8.2065, lng: -1.1232, type: 'monitored' },
  { lat: 7.4865, lng: -0.7532, type: 'monitored' }
];

const MapView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredHotspots, setFilteredHotspots] = useState(sampleHotspots);
  const [activeTab, setActiveTab] = useState("satellite");
  
  // Function to filter hotspots based on search query
  const handleSearch = () => {
    if (!searchQuery) {
      setFilteredHotspots(sampleHotspots);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const filtered = sampleHotspots.filter(spot => 
      // Simple filtering logic - can be expanded based on requirements
      spot.type.toLowerCase().includes(query)
    );
    
    setFilteredHotspots(filtered);
  };
  
  // Reset filters to show all hotspots
  const showAll = () => {
    setSearchQuery("");
    setFilteredHotspots(sampleHotspots);
  };
  
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
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                <Button variant="outline" onClick={handleSearch}>
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button onClick={showAll}>Show All</Button>
              </div>
              
              <Tabs 
                defaultValue="satellite" 
                value={activeTab}
                onValueChange={setActiveTab}
              >
                <TabsList className="mb-4">
                  <TabsTrigger value="satellite">Satellite</TabsTrigger>
                  <TabsTrigger value="terrain">Terrain</TabsTrigger>
                  <TabsTrigger value="heatmap">Heat Map</TabsTrigger>
                </TabsList>
                
                <TabsContent value="satellite" className="h-[600px] rounded-md overflow-hidden">
                  <Map 
                    className="h-full" 
                    hotspots={filteredHotspots}
                  />
                </TabsContent>
                
                <TabsContent value="terrain" className="h-[600px] rounded-md overflow-hidden">
                  <Map 
                    className="h-full" 
                    hotspots={filteredHotspots}
                  />
                </TabsContent>
                
                <TabsContent value="heatmap" className="h-[600px] rounded-md overflow-hidden">
                  <Map 
                    className="h-full" 
                    hotspots={filteredHotspots}
                  />
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
