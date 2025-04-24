
import React, { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from 'date-fns';

interface Permit {
  id: string;
  company_name: string;
  permit_number: string;
  site_location: string;
  issue_date: string;
  expiry_date: string;
  status: string;
}

export function PermitChecker() {
  const [searchTerm, setSearchTerm] = useState('');
  const [permits, setPermits] = useState<Permit[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchPermits = async () => {
    if (!searchTerm.trim()) return;

    setIsLoading(true);
    const { data, error } = await supabase
      .from('mining_permits')
      .select('*')
      .or(`company_name.ilike.%${searchTerm}%,site_location.ilike.%${searchTerm}%`)
      .order('company_name');

    setIsLoading(false);
    if (error) {
      console.error('Error searching permits:', error);
      return;
    }

    setPermits(data || []);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mining Permit Checker</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-4">
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by company name or location..."
            className="flex-1"
          />
          <Button onClick={searchPermits} disabled={isLoading}>
            {isLoading ? 'Searching...' : 'Search'}
          </Button>
        </div>
        
        {permits.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Permit Number</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Valid Until</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {permits.map((permit) => (
                <TableRow key={permit.id}>
                  <TableCell>{permit.company_name}</TableCell>
                  <TableCell>{permit.permit_number}</TableCell>
                  <TableCell>{permit.site_location}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      permit.status === 'active' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {permit.status}
                    </span>
                  </TableCell>
                  <TableCell>{format(new Date(permit.expiry_date), 'MMM d, yyyy')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
