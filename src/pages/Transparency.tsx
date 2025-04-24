
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ViolatorsRegistry } from "@/components/transparency/ViolatorsRegistry";
import { GalamseyHotspots } from "@/components/transparency/GalamseyHotspots";
import { MiningRightsSimulator } from "@/components/transparency/MiningRightsSimulator";

export default function Transparency() {
  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">Transparency & Accountability</h1>
      
      <Tabs defaultValue="registry">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="registry">Violators Registry</TabsTrigger>
          <TabsTrigger value="hotspots">Activity Heatmap</TabsTrigger>
          <TabsTrigger value="education">Civic Education</TabsTrigger>
        </TabsList>

        <TabsContent value="registry">
          <ViolatorsRegistry />
        </TabsContent>

        <TabsContent value="hotspots">
          <GalamseyHotspots />
        </TabsContent>

        <TabsContent value="education">
          <MiningRightsSimulator />
        </TabsContent>
      </Tabs>
    </div>
  );
}
