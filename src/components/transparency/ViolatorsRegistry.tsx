
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function ViolatorsRegistry() {
  const { data: violators, isLoading } = useQuery({
    queryKey: ["violators"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("violators_registry")
        .select("*")
        .order("violation_count", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Violators Registry</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Organization</TableHead>
              <TableHead>Violations</TableHead>
              <TableHead>Total Fines</TableHead>
              <TableHead>Equipment Seized</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {violators?.map((violator) => (
              <TableRow key={violator.id}>
                <TableCell>{violator.offender_name}</TableCell>
                <TableCell>{violator.organization || "N/A"}</TableCell>
                <TableCell>{violator.violation_count}</TableCell>
                <TableCell>₵{violator.total_fines.toLocaleString()}</TableCell>
                <TableCell>
                  {violator.equipment_seized?.join(", ") || "None"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
