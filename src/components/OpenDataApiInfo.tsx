
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Database, FileText, Key } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const OpenDataApiInfo: React.FC = () => {
  const { toast } = useToast();
  const apiUrl = "https://cqfqmkrtzalcufrlrjkv.supabase.co/functions/v1/open-data-api";
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied to clipboard",
        description: "The API URL has been copied to your clipboard.",
      });
    });
  };

  return (
    <Card className="bg-white shadow-md">
      <CardHeader className="bg-galamsey-green-light/10">
        <CardTitle className="flex items-center gap-2 text-galamsey-green-DEFAULT">
          <Database className="h-5 w-5" />
          Open Data API
        </CardTitle>
        <CardDescription>
          Access anonymized mining incident data for research and transparency
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs defaultValue="about">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
            <TabsTrigger value="access">Request Access</TabsTrigger>
          </TabsList>
          
          <TabsContent value="about" className="mt-4 space-y-4">
            <div className="prose prose-sm max-w-none">
              <p className="text-muted-foreground">
                Our Open Data API provides access to anonymized mining incident data to promote transparency 
                and enable research by journalists, NGOs, and academic institutions.
              </p>
              
              <h4 className="text-base font-semibold mt-4">Benefits:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Access standardized, anonymized mining incident reports</li>
                <li>Track trends and patterns in illegal mining activities</li>
                <li>Support evidence-based policy making</li>
                <li>Enable cross-referencing with other environmental datasets</li>
              </ul>
              
              <h4 className="text-base font-semibold mt-4">Data Privacy:</h4>
              <p className="text-muted-foreground">
                All data is anonymized to protect privacy. Personal identifiers are removed, 
                and location data is reduced in precision to prevent identification of specific individuals.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="endpoints" className="mt-4">
            <div className="space-y-4">
              <div className="rounded-md bg-muted p-4">
                <div className="flex items-center justify-between">
                  <code className="text-sm font-mono">{apiUrl}/reports</code>
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard(`${apiUrl}/reports`)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <h4 className="text-sm font-semibold">Available Endpoints:</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Endpoint</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono text-xs">/reports</TableCell>
                    <TableCell>Anonymized mining incident reports</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">/stats</TableCell>
                    <TableCell>Aggregated statistics by region, type, and time</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              
              <div className="text-sm mt-2">
                <a 
                  href={`https://cqfqmkrtzalcufrlrjkv.supabase.co/functions/v1/api-docs`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-galamsey-green-DEFAULT hover:underline"
                >
                  <FileText className="h-4 w-4" />
                  View full API documentation
                </a>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="access" className="mt-4 space-y-4">
            <div className="prose prose-sm max-w-none">
              <p className="text-muted-foreground">
                Access to the Open Data API requires an API key. To request access, please fill out the form below 
                with information about your organization and intended use of the data.
              </p>
              
              <div className="flex items-center gap-2 mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
                <Key className="h-5 w-5 text-amber-600" />
                <p className="text-sm text-amber-800 m-0">
                  API keys are provided to verified organizations and researchers only.
                </p>
              </div>
            </div>
            
            <div className="flex gap-2 mt-4">
              <Button className="bg-galamsey-green-DEFAULT hover:bg-galamsey-green-dark">
                Request API Access
              </Button>
              <Button variant="outline">
                Contact Us
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="bg-muted/20 flex flex-col items-start gap-2 text-xs text-muted-foreground">
        <p>
          This data is provided under the <a href="#" className="text-galamsey-green-DEFAULT hover:underline">Open Data License</a>.
        </p>
        <p>
          By accessing this API, you agree to use the data responsibly and ethically.
        </p>
      </CardFooter>
    </Card>
  );
};

export default OpenDataApiInfo;
