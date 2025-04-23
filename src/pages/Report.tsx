
import React from "react";
import Navbar from "@/components/navbar";
import ReportForm from "@/components/report-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, MapPin, Shield } from "lucide-react";

const Report: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-galamsey-green-dark">
            Report Illegal Mining Activity
          </h1>
          <p className="text-muted-foreground mt-1">
            Help protect Ghana's natural resources by reporting galamsey activities
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="report" className="mb-6">
              <TabsList>
                <TabsTrigger value="report">
                  <MapPin className="h-4 w-4 mr-2" />
                  Report Activity
                </TabsTrigger>
                <TabsTrigger value="guide">
                  <FileText className="h-4 w-4 mr-2" />
                  Reporting Guide
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="report">
                <Alert className="mb-6 bg-galamsey-green-light/10 border-galamsey-green-DEFAULT">
                  <Shield className="h-4 w-4 text-galamsey-green-DEFAULT" />
                  <AlertTitle>Anonymous Reporting</AlertTitle>
                  <AlertDescription>
                    Your identity can remain anonymous. Focus on providing accurate location details and evidence.
                  </AlertDescription>
                </Alert>
                
                <ReportForm />
              </TabsContent>
              
              <TabsContent value="guide">
                <div className="prose max-w-none">
                  <h3 className="text-xl font-semibold mb-3">
                    How to Report Effectively
                  </h3>
                  <p>
                    When reporting illegal mining activity, providing accurate and detailed information helps authorities respond quickly and effectively. Here's what you should include:
                  </p>
                  
                  <h4 className="font-medium mt-4">1. Precise Location</h4>
                  <p>
                    Use GPS coordinates if possible, or provide detailed descriptions of the location. Reference nearby landmarks, roads, or communities.
                  </p>
                  
                  <h4 className="font-medium mt-4">2. Visual Evidence</h4>
                  <p>
                    Upload photos or videos if it's safe to capture them. Images showing equipment, disturbed land, or polluted water bodies are particularly useful.
                  </p>
                  
                  <h4 className="font-medium mt-4">3. Activity Details</h4>
                  <p>
                    Describe what you observed: number of people, types of equipment, how long the activity has been ongoing, and visible environmental impacts.
                  </p>
                  
                  <h4 className="font-medium mt-4">4. Safety First</h4>
                  <p>
                    Never put yourself at risk to gather information. Report from a safe distance and do not confront those involved in illegal mining.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <h3 className="font-semibold text-lg mb-3">Why Your Reports Matter</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Every report contributes to the protection of Ghana's natural resources and communities affected by galamsey.
              </p>
              
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="bg-galamsey-green-light/20 p-2 rounded-full h-8 w-8 flex items-center justify-center text-galamsey-green-DEFAULT">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Environmental Protection</h4>
                    <p className="text-xs text-muted-foreground">
                      Helps prevent water pollution and land degradation
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="bg-galamsey-blue-light/20 p-2 rounded-full h-8 w-8 flex items-center justify-center text-galamsey-blue-DEFAULT">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Community Health</h4>
                    <p className="text-xs text-muted-foreground">
                      Protects drinking water sources and prevents health hazards
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="bg-galamsey-gold-light/20 p-2 rounded-full h-8 w-8 flex items-center justify-center text-galamsey-gold-DEFAULT">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Economic Benefits</h4>
                    <p className="text-xs text-muted-foreground">
                      Supports regulated mining that contributes to the economy
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-galamsey-brown-light/10 p-6 rounded-lg border border-galamsey-brown-light">
              <h4 className="font-medium mb-2 text-galamsey-brown-dark">Emergency Contact</h4>
              <p className="text-sm mb-3">
                For urgent situations requiring immediate attention:
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Minerals Commission:</span>
                  <span className="font-medium">030 222 1318</span>
                </div>
                <div className="flex justify-between">
                  <span>Environmental Protection Agency:</span>
                  <span className="font-medium">030 266 4697</span>
                </div>
                <div className="flex justify-between">
                  <span>Police Emergency:</span>
                  <span className="font-medium">191</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Report;
