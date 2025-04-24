
import React, { useEffect } from 'react';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { offlineStorage } from '@/services/offlineStorage';
import { useToast } from '@/components/ui/use-toast';

export const SyncManager = () => {
  const isOnline = useNetworkStatus();
  const { toast } = useToast();

  useEffect(() => {
    if (isOnline) {
      syncOfflineData();
    }
  }, [isOnline]);

  const syncOfflineData = async () => {
    try {
      await offlineStorage.syncReports();
      toast({
        title: "Sync complete",
        description: "All offline reports have been synchronized.",
      });
    } catch (error) {
      toast({
        title: "Sync failed",
        description: "Failed to sync some reports. They will be retried later.",
        variant: "destructive",
      });
    }
  };

  return null;
};
