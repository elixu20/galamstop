
import React, { useState } from "react";
import {
  ActivityTrendChart,
  RegionalDistributionChart,
  EnvironmentalImpactChart,
  EnforcementOutcomesChart,
  ReportTypesChart,
  VerificationStatusChart,
  ResponseTimeChart,
} from "@/components/analytics";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CaseDiscussion } from "@/components/collaboration/CaseDiscussion";
import { PermitChecker } from "@/components/permit/PermitChecker";
import { EnforcementForm } from "@/components/enforcement/EnforcementForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Analytics() {
  const [period, setPeriod] = useState('3months');
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [selectedCase, setSelectedCase] = useState<string | null>(null);

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Analytics & Collaboration</h1>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="environmental">Environmental</TabsTrigger>
          <TabsTrigger value="enforcement">Enforcement</TabsTrigger>
          <TabsTrigger value="collaboration">Collaboration Tools</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Time Period</CardTitle>
              </CardHeader>
              <div className="p-4">
                <Select onValueChange={setPeriod}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select time period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3months">3 Months</SelectItem>
                    <SelectItem value="6months">6 Months</SelectItem>
                    <SelectItem value="1year">1 Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Date Picker</CardTitle>
              </CardHeader>
              <div className="p-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[180px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? date?.toLocaleDateString() : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <DatePicker
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="border-none shadow-none"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </Card>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ActivityTrendChart period={period} />
            <RegionalDistributionChart period={period} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ReportTypesChart period={period} />
            <VerificationStatusChart period={period} />
          </div>
          <ResponseTimeChart period={period} />
        </TabsContent>

        <TabsContent value="environmental" className="space-y-4">
          <EnvironmentalImpactChart period={period} />
        </TabsContent>

        <TabsContent value="enforcement" className="space-y-4">
          <EnforcementOutcomesChart period={period} />
        </TabsContent>

        <TabsContent value="collaboration" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <PermitChecker />
              {selectedCase && (
                <EnforcementForm 
                  caseId={selectedCase} 
                  onSuccess={() => setSelectedCase(null)} 
                />
              )}
            </div>
            <div>
              {selectedCase && <CaseDiscussion caseId={selectedCase} />}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
