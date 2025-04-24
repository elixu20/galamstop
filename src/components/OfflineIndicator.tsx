
import React from 'react';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { WifiOff } from 'lucide-react';
import { cn } from '@/lib/utils';

export const OfflineIndicator = () => {
  const isOnline = useNetworkStatus();

  if (isOnline) return null;

  return (
    <div className={cn(
      "fixed bottom-4 right-4 bg-yellow-500 text-white px-4 py-2 rounded-md",
      "flex items-center gap-2 shadow-lg animate-bounce"
    )}>
      <WifiOff className="h-4 w-4" />
      <span>Offline Mode</span>
    </div>
  );
};
