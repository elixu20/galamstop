
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ViolatorsRegistry } from "@/components/transparency/ViolatorsRegistry";
import { GalamseyHotspots } from "@/components/transparency/GalamseyHotspots";

export default function Transparency() {
  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">Transparency & Accountability</h1>
      
      <Tabs defaultValue="registry">
        <TabsList>
          <TabsTrigger value="registry">Violators Registry</TabsTrigger>
          <TabsTrigger value="hotspots">Activity Heatmap</TabsTrigger>
        </TabsList>

        <TabsContent value="registry">
          <ViolatorsRegistry />
        </TabsContent>

        <TabsContent value="hotspots">
          <GalamseyHotspots />
        </TabsContent>
      </Tabs>
    </div>
  );
}
