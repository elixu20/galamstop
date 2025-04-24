
import React from 'react';
import Navbar from '@/components/navbar';
import { DroneRegistration } from '@/components/drone-management/DroneRegistration';
import { DroneList } from '@/components/drone-management/DroneList';

const DroneManager = () => {
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DroneRegistration />
          <DroneList />
        </div>
      </main>
    </div>
  );
};

export default DroneManager;
