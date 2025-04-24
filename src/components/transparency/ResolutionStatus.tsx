
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ResolutionStatusProps {
  reportId: string;
  currentStatus: string;
}

export function ResolutionStatus({ reportId, currentStatus }: ResolutionStatusProps) {
  const queryClient = useQueryClient();

  const updateStatus = async (status: string) => {
    const { error } = await supabase
      .from("drone_reports")
      .update({ resolution_status: status })
      .eq("id", reportId);

    if (error) throw error;
    queryClient.invalidateQueries({ queryKey: ["reports"] });
  };

  return (
    <Select
      defaultValue={currentStatus}
      onValueChange={updateStatus}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="pending">Pending</SelectItem>
        <SelectItem value="resolved">Resolved</SelectItem>
        <SelectItem value="active">Still Active</SelectItem>
        <SelectItem value="ignored">Ignored</SelectItem>
      </SelectContent>
    </Select>
  );
}
