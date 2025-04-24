
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const consequences = [
  {
    id: 'arrest',
    title: 'Arrest & Detention',
    description: 'Immediate arrest by Minerals Commission officers or Ghana Police Service. You can face detention for up to 72 hours before court appearance.',
    details: 'According to the Minerals and Mining Act, Section 99, any person engaged in mining without a license commits an offense and can be arrested without warrant.'
  },
  {
    id: 'fines',
    title: 'Heavy Fines',
    description: 'Financial penalties ranging from GH₵120,000 to GH₵300,000 for individuals, and up to GH₵600,000 for companies.',
    details: 'The amended Minerals and Mining Act imposes stricter financial penalties, and the court may order additional compensation for environmental damage.'
  },
  {
    id: 'seizure',
    title: 'Equipment Seizure',
    description: 'All mining equipment, vehicles, and extracted minerals will be confiscated by the state.',
    details: 'Section 99(2) of the Act states that all equipment used in connection with the commission of the offense shall be seized and kept in the custody of the police.'
  },
  {
    id: 'imprisonment',
    title: 'Imprisonment',
    description: 'Jail terms ranging from 15 to 25 years for Ghanaians, and minimum 20 years for non-Ghanaians.',
    details: 'The 2019 amendment to the Mining Act increased the minimum sentences for illegal mining to emphasize the severity of the offense.'
  },
  {
    id: 'land',
    title: 'Land Seizure',
    description: 'The land used for illegal mining can be seized by the government and any structures on it demolished.',
    details: 'The government has authority to reclaim lands damaged by illegal mining activities and assign them for remediation projects.'
  }
];

export function MiningRightsSimulator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleNext = () => {
    if (currentStep < consequences.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setCompleted(false);
    setShowDetails(false);
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentConsequence = consequences[currentStep];

  return (
    <div className="space-y-8">
      <Card className="border-2 border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle>Mining Without a License: Consequences</CardTitle>
          <CardDescription>
            This interactive guide explains what happens if you mine without proper authorization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 border rounded-md bg-white mb-4">
            <h3 className="text-lg font-semibold mb-2">{currentConsequence.title}</h3>
            <p className="text-gray-700">{currentConsequence.description}</p>
            
            {showDetails && (
              <Alert className="mt-4 bg-blue-50">
                <AlertDescription>
                  {currentConsequence.details}
                </AlertDescription>
              </Alert>
            )}
            
            <div className="flex justify-between mt-4">
              <Button 
                variant="outline" 
                onClick={() => setShowDetails(!showDetails)}
              >
                {showDetails ? 'Hide' : 'Show'} Legal Details
              </Button>
              {!completed && (
                <div className="space-x-2">
                  <Button 
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                  >
                    Previous
                  </Button>
                  <Button onClick={handleNext}>
                    {currentStep === consequences.length - 1 ? 'Complete' : 'Next Consequence'}
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Step {currentStep + 1} of {consequences.length}
            </div>
            <div className="flex gap-1">
              {consequences.map((_, index) => (
                <div 
                  key={index}
                  className={`h-2 w-8 rounded-full ${
                    index <= currentStep ? 'bg-orange-400' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {completed && (
        <Card className="border-2 border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle>Knowledge Summary</CardTitle>
            <CardDescription>
              Review what you've learned about the consequences of illegal mining
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {consequences.map((consequence) => (
                <AccordionItem key={consequence.id} value={consequence.id}>
                  <AccordionTrigger>{consequence.title}</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">{consequence.description}</p>
                    <p className="text-sm text-gray-600">{consequence.details}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            
            <div className="mt-6 text-center">
              <Button onClick={handleReset}>Start Again</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
