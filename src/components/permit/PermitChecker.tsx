
import React, { useState } from 'react';
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
import { useQuery } from '@tanstack/react-query';

interface License {
  company_name: string;
  license_number: string;
  location: string;
  status: string;
  expiry_date: string;
}

export function PermitChecker() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Function to fetch and parse data from the iframe source
  const fetchLicenseData = async (): Promise<License[]> => {
    try {
      const response = await fetch('https://ghana.revenuedev.org/active-licenses?pageSize=100&workspace=-1&licenseType=');
      if (!response.ok) {
        throw new Error('Failed to fetch license data');
      }
      const data = await response.json();
      return data.licenses || [];
    } catch (error) {
      console.error('Error fetching licenses:', error);
      throw error;
    }
  };

  // Use React Query for data fetching
  const { data: licenses, isLoading, error } = useQuery({
    queryKey: ['licenses'],
    queryFn: fetchLicenseData,
  });

  const searchLicenses = () => {
    setIsSearching(true);
    // Reset searching state after a brief delay
    setTimeout(() => setIsSearching(false), 1000);
  };

  // Filter licenses based on search term
  const filteredLicenses = licenses?.filter(license => 
    license.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    license.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    license.license_number.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

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
            placeholder="Search by company name, permit number, or location..."
            className="flex-1"
          />
          <Button onClick={searchLicenses} disabled={isLoading || isSearching}>
            {isLoading ? 'Loading...' : isSearching ? 'Searching...' : 'Search'}
          </Button>
        </div>
        
        {error ? (
          <div className="text-red-500 p-4">
            Failed to load license data. Please try again later.
          </div>
        ) : filteredLicenses.length > 0 && (
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
              {filteredLicenses.map((license) => (
                <TableRow key={license.license_number}>
                  <TableCell>{license.company_name}</TableCell>
                  <TableCell>{license.license_number}</TableCell>
                  <TableCell>{license.location}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      license.status === 'active' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {license.status}
                    </span>
                  </TableCell>
                  <TableCell>{format(new Date(license.expiry_date), 'MMM d, yyyy')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {!isLoading && filteredLicenses.length === 0 && (
          <div className="text-center p-4 text-gray-500">
            No matching permits found. Try adjusting your search terms.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
