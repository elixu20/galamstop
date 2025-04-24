
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/navbar';
import { DroneRegistration } from '@/components/drone-management/DroneRegistration';
import { DroneList } from '@/components/drone-management/DroneList';
import { ReportGenerator } from '@/components/drone-management/ReportGenerator';
import { ReportsList } from '@/components/drone-management/ReportsList';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const DroneManager = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  React.useEffect(() => {
    if (!loading && !user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to access the drone manager.",
        variant: "destructive",
      });
      navigate('/login');
    }
  }, [user, loading, navigate, toast]);

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-galamsey-green-dark">
            Drone Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Register and manage drones for aerial surveillance
          </p>
        </div>

        <div className="grid gap-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DroneRegistration />
            <DroneList />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ReportGenerator />
            <ReportsList />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DroneManager;
