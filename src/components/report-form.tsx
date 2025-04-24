import React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Camera, MapPin, Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { offlineStorage } from '@/services/offlineStorage';
import { useToast } from "@/components/ui/use-toast";

const reportSchema = z.object({
  incidentType: z.string().min(1, "Please select an incident type"),
  location: z.string().min(1, "Location is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  date: z.string().min(1, "Date is required"),
  images: z.any().optional(),
});

type ReportFormValues = z.infer<typeof reportSchema>;

const ReportForm: React.FC = () => {
  const isOnline = useNetworkStatus();
  const { toast } = useToast();
  const form = useForm<ReportFormValues>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      incidentType: "",
      location: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
      images: undefined,
    },
  });

  async function onSubmit(data: ReportFormValues) {
    try {
      if (isOnline) {
        console.log("Form submitted:", data);
        // In a real app, this would send data to a backend API
        alert("Report submitted successfully!");
        form.reset();
      } else {
        await offlineStorage.saveReport(data);
        toast({
          title: "Report saved offline",
          description: "Your report will be submitted when internet connection is restored.",
        });
        form.reset();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save report. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="incidentType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Incident Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select incident type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="active_mining">Active Mining</SelectItem>
                  <SelectItem value="water_pollution">Water Pollution</SelectItem>
                  <SelectItem value="deforestation">Deforestation</SelectItem>
                  <SelectItem value="equipment">Mining Equipment</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <div className="flex">
                <FormControl>
                  <Input placeholder="Enter location or coordinates" {...field} />
                </FormControl>
                <Button type="button" variant="outline" size="icon" className="ml-2">
                  <MapPin className="h-4 w-4" />
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe what you observed..." 
                  className="min-h-[120px]" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload Images/Evidence</FormLabel>
              <FormControl>
                <div className="border-2 border-dashed border-input rounded-md p-6 flex flex-col items-center justify-center">
                  <Camera className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Drag and drop files or click to upload
                  </p>
                  <Button type="button" variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Files
                  </Button>
                  <Input
                    type="file"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files) {
                        field.onChange(e.target.files);
                      }
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-3">
          <Button type="submit" className="bg-galamsey-green-DEFAULT hover:bg-galamsey-green-dark">
            Submit Report
          </Button>
          <Button type="button" variant="outline">
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ReportForm;
