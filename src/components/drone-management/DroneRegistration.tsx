
import React from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface DroneFormData {
  name: string;
  model: string;
  serial_number: string;
  feed_url: string;
}

export const DroneRegistration = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<DroneFormData>();
  const { toast } = useToast();
  const { user } = useAuth();

  const onSubmit = async (data: DroneFormData) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to register a drone",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('drones')
        .insert({
          ...data,
          status: 'offline',
          user_id: user.id
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Drone registered successfully",
      });
      reset();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register New Drone</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Drone Name</Label>
            <Input
              id="name"
              {...register("name", { required: "Drone name is required" })}
              placeholder="Enter drone name"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="model">Model (Optional)</Label>
            <Input
              id="model"
              {...register("model")}
              placeholder="Enter drone model"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="serial_number">Serial Number (Optional)</Label>
            <Input
              id="serial_number"
              {...register("serial_number")}
              placeholder="Enter serial number"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="feed_url">Feed URL</Label>
            <Input
              id="feed_url"
              {...register("feed_url", { required: "Feed URL is required" })}
              placeholder="Enter live feed URL"
            />
            {errors.feed_url && (
              <p className="text-sm text-red-500">{errors.feed_url.message}</p>
            )}
          </div>

          <Button type="submit">Register Drone</Button>
        </form>
      </CardContent>
    </Card>
  );
};
