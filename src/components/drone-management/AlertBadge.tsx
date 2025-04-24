
import { Bell, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface AlertBadgeProps {
  severity: string;
  count: number;
}

export const AlertBadge = ({ severity, count }: AlertBadgeProps) => {
  const badgeStyles = {
    high: 'bg-red-500 hover:bg-red-600',
    medium: 'bg-yellow-500 hover:bg-yellow-600',
    low: 'bg-blue-500 hover:bg-blue-600',
  }[severity] || 'bg-gray-500 hover:bg-gray-600';

  return (
    <Badge className={`${badgeStyles} gap-1 cursor-pointer`}>
      {severity === 'high' ? <Bell className="h-3 w-3" /> : <Info className="h-3 w-3" />}
      <span>{count}</span>
    </Badge>
  );
};
