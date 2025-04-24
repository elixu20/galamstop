
import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface EnforcementFormProps {
  caseId: string;
  onSuccess?: () => void;
}

interface FormData {
  actionType: string;
  description: string;
  fineAmount?: number;
  courtRuling?: string;
  equipmentDestroyed: boolean;
}

export function EnforcementForm({ caseId, onSuccess }: EnforcementFormProps) {
  const { user } = useAuth();
  const form = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    if (!user) return;

    const { error } = await supabase
      .from('enforcement_actions')
      .insert({
        case_id: caseId,
        action_type: data.actionType,
        description: data.description,
        fine_amount: data.fineAmount,
        court_ruling: data.courtRuling,
        equipment_destroyed: data.equipmentDestroyed,
        created_by: user.id,
      });

    if (error) {
      console.error('Error submitting enforcement action:', error);
      toast.error('Failed to submit enforcement action');
      return;
    }

    toast.success('Enforcement action submitted successfully');
    form.reset();
    onSuccess?.();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Record Enforcement Action</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="actionType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Action Type</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g., Site inspection, Equipment seizure" />
                  </FormControl>
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
                    <Textarea {...field} placeholder="Describe the enforcement action taken..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fineAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fine Amount (if applicable)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} placeholder="Enter amount" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="courtRuling"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Court Ruling (if applicable)</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Enter court ruling details..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Submit Enforcement Action</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
