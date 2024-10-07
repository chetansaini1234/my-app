"use client";
import { useState } from 'react';
import { Input } from "../components/ui/input";
import { Button } from '@/components/ui/button'; 
import { Drawer, DrawerContent, DrawerTrigger } from "../components/ui/drawer";
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { UploadCloud } from 'lucide-react';
import { cn } from "@/lib/utils"; // Ensure you have this utility function
import React from 'react';

// Spinner Component
const Spinner = () => (
  <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
  </svg>
);

export function InsurancePage() {
  const [yearlyEarning, setYearlyEarning] = useState<string | null>(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [worldIdStatus, setWorldIdStatus] = useState<'idle' | 'loading' | 'connected'>('idle');

  const earningOptions = [
    { value: "up to 5000$", label: "Up to $5,000" },
    { value: "up to 20000$", label: "Up to $20,000 (Coming Soon)", disabled: true },
    { value: "up to 50000$", label: "Up to $50,000 (Coming Soon)", disabled: true },
    { value: "more than 55000$", label: "More than $55,000 (Coming Soon)", disabled: true },
  ];

  function getInsuranceAmount(earning: string | null): string {
    switch (earning) {
      case "up to 5000$": return "$25,000";
      default: return "$0";
    }
  }

  function getMonthlyPremium(earning: string | null): string {
    switch (earning) {
      case "up to 5000$": return "$9";
      default: return "$0";
    }
  }

  const handleWorldIdConnect = () => {
    setWorldIdStatus('loading');
    setTimeout(() => {
      setWorldIdStatus('connected');
    }, 3000); // Simulate a 3-second loading period
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setIsUploaded(true);
      setUploadedFiles(Array.from(files));
    } else {
      setIsUploaded(false);
      setUploadedFiles([]);
    }
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="text-white hover:underline">Buy Insurance</button>
      </DrawerTrigger>
      <DrawerContent>
        <Card className="w-[350px] mx-auto my-4">
          <CardHeader>
            <CardTitle>Buy Life Insurance</CardTitle>
            <CardDescription>Only with i tokens</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="yearly-earning">Your yearly earning in USD</Label>
              <select
                id="yearly-earning"
                className="w-full border rounded p-2 text-black"
                value={yearlyEarning || ""}
                onChange={(e) => setYearlyEarning(e.target.value)}
              >
                <option value="" disabled>Select yearly earning...</option>
                {earningOptions.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label>Your insurance amount is passed up to</Label>
              <Input 
                value={`${getInsuranceAmount(yearlyEarning)} in i tokens`}
                readOnly
              />
            </div>
            <div className="space-y-2">
              <Label>Your monthly premium will be</Label>
              <Input 
                value={`${getMonthlyPremium(yearlyEarning)} of i tokens`}
                readOnly
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="file-upload">Health Documents</Label>
              <div className="flex items-center justify-center w-full">
                <Label htmlFor="file-upload" className="w-full">
                  <div className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <UploadCloud className="w-8 h-8 mb-4 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">Multiple files allowed</p>
                    </div>
                    <Input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      onChange={handleFileUpload}
                      multiple
                    />
                  </div>
                </Label>
              </div>
              {uploadedFiles.length > 0 && (
                <div className="mt-2">
                  <Label>Uploaded Files:</Label>
                  <ul className="list-disc list-inside">
                    {uploadedFiles.map((file, index) => (
                      <li key={index}>{file.name}</li>
                    ))}
                  </ul>
                </div>
              )}
              <p className="text-sm text-gray-500">
                If you have any type of health care problem, share each and every document. If you don't tell us now, you may face problems in the future. If you don't have any medical issues, write a note on a white page stating that you are fit and fine, and put your signature on it.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button
              className={cn(
                "w-full transition-colors flex items-center justify-center",
                worldIdStatus === 'connected' ? 'bg-green-500 hover:bg-green-600' : '',
                worldIdStatus === 'loading' ? 'bg-blue-500 opacity-50 cursor-not-allowed' : '',
                worldIdStatus === 'idle' ? 'bg-blue-500 hover:bg-blue-600' : ''
              )}
              onClick={handleWorldIdConnect}
              disabled={worldIdStatus !== 'idle'}
            >
              {worldIdStatus === 'idle' && 'Connect World ID'}
              {worldIdStatus === 'loading' && (
                <>
                  <Spinner />
                  Connecting...
                </>
              )}
              {worldIdStatus === 'connected' && 'World ID Connected'}
            </Button>
            <Button
              className="w-full"
              disabled={
                worldIdStatus !== 'connected' ||
                !isUploaded ||
                !yearlyEarning
              }
            >
              Buy Premium with i
            </Button>
          </CardFooter>
        </Card>
      </DrawerContent>
    </Drawer>
  );
}