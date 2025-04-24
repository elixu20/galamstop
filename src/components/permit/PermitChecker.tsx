
import React, { useState, useEffect } from 'react';
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
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface License {
  company_name: string;
  license_number: string;
  location: string;
  status: string;
  expiry_date: string;
}

// Mock data to use when API is not available
const mockLicenses: License[] = [
  {
    company_name: "Golden Minerals Ltd.",
    license_number: "GML-2024-0423",
    location: "Ashanti Region",
    status: "active",
    expiry_date: "2026-05-15"
  },
  {
    company_name: "Akrofuom Mining Corp.",
    license_number: "AMC-2023-1187",
    location: "Western Region",
    status: "active",
    expiry_date: "2025-11-30"
  },
  {
    company_name: "Eastern Extraction Co.",
    license_number: "EEC-2023-0782",
    location: "Eastern Region",
    status: "active",
    expiry_date: "2025-08-22"
  },
  {
    company_name: "Bluestone Resources",
    license_number: "BSR-2024-0291",
    location: "Central Region",
    status: "active",
    expiry_date: "2026-02-28"
  },
  {
    company_name: "Tarkwa Exploration Group",
    license_number: "TEG-2022-1548",
    location: "Western Region",
    status: "active",
    expiry_date: "2025-04-10"
  }
];

export function PermitChecker() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  // Function to fetch and parse data from the iframe source
  const fetchLicenseData = async (): Promise<License[]> => {
    try {
      // Try to fetch from the API endpoint
      const response = await fetch('https://ghana.revenuedev.org/active-licenses?pageSize=100&workspace=-1&licenseType=');
      
      if (!response.ok) {
        throw new Error('Failed to fetch license data from API');
      }
      
      const data = await response.json();
      return data.licenses || [];
    } catch (error) {
      console.error('Error fetching licenses:', error);
      
      // Fallback to mock data with a console log
      console.log('Using mock license data due to API fetch failure');
      return mockLicenses;
    }
  };

  // Use React Query for data fetching with proper error handling
  const { data: licenses, isLoading, error, refetch } = useQuery({
    queryKey: ['licenses'],
    queryFn: fetchLicenseData,
    retry: 2,
    meta: {
      onError: () => {
        toast({
          title: "Data Loading Issue",
          description: "Using demo data due to connection issues with the permit database.",
          variant: "default"
        });
      }
    }
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
        
        {error && (
          <Alert className="mb-4 bg-amber-50">
            <AlertDescription className="flex justify-between items-center">
              <span>Using demo data due to connection issues with the permit database.</span>
              <Button variant="outline" size="sm" onClick={() => refetch()}>
                Retry
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {filteredLicenses.length > 0 && (
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
