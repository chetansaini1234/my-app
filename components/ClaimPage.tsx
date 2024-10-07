"use client";
import { Drawer, DrawerTrigger, DrawerContent } from '@/components/ui/drawer';
import {
    Card,
    CardContent,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import React, { useState } from 'react';
import { UploadCloud } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ClaimPage() {
    // Changed state to store an array of uploaded files
    const [claimFilesUploaded, setClaimFilesUploaded] = useState<File[]>([]);

    // Updated handler to store the uploaded files
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setClaimFilesUploaded(Array.from(files));
        } else {
            setClaimFilesUploaded([]);
        }
    };

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <button className="text-white hover:underline">Claim</button>
            </DrawerTrigger>
            <DrawerContent>
                <Card className="w-[350px] mx-auto my-4">
                    <CardHeader>
                        <CardTitle>Claim Process</CardTitle>
                        <CardDescription>
                            Required documents for insurance claim
                        </CardDescription>
                    </CardHeader>
                    <ScrollArea className="h-[400px] w-full pr-4">
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <h3 className="font-semibold">1. Proof of Death:</h3>
                                <ul className="list-disc list-inside text-sm">
                                    <li>Death Certificate (issued by the government)</li>
                                    <li>Hospital/Doctor's Report (detailing the cause of death)</li>
                                    <li>Post-Mortem/Autopsy Report (if applicable)</li>
                                </ul>
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-semibold">2. Identification Documents:</h3>
                                <ul className="list-disc list-inside text-sm">
                                    <li>ID Proof of the Nominee (passport, driving license, national ID, etc.)</li>
                                    <li>Relationship Proof with the Policyholder (birth certificate, marriage certificate, or legal document)</li>
                                </ul>
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-semibold">3. Policy Documentation:</h3>
                                <ul className="list-disc list-inside text-sm">
                                    <li>Original Insurance Policy Document (or proof of purchase)</li>
                                    <li>Completed Claim Form (provided by the insurer)</li>
                                </ul>
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-semibold">4. Cause of Death Verification:</h3>
                                <ul className="list-disc list-inside text-sm">
                                    <li>Accident Report (if death was due to an accident)</li>
                                    <li>FIR (First Information Report) from police (in case of unnatural death)</li>
                                    <li>Hospital Records/Discharge Summary (in case of illness-related death)</li>
                                    <li>Witness Statements (if applicable in accidental or suspicious deaths)</li>
                                </ul>
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-semibold">5. Cause of Death Specific Documents:</h3>
                                <ul className="list-disc list-inside text-sm">
                                    <li>Critical Illness Report (if the death is related to an illness covered by the policy)</li>
                                    <li>Attending Physician Statement (formal statement from the treating doctor)</li>
                                </ul>
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-semibold">6. Additional Documents (if needed):</h3>
                                <ul className="list-disc list-inside text-sm">
                                    <li>Court Orders (if there are legal disputes over the claim or nominee)</li>
                                </ul>
                            </div>
                            <p className="text-xs text-gray-500 mt-4">
                                $5 of i tokens will be charged to start the claiming process.
                            </p>
                        </CardContent>
                    </ScrollArea>
                    <CardFooter className="flex flex-col space-y-2">
                        <Label htmlFor="claim-file-upload" className="w-full">
                            <div className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <UploadCloud className="w-8 h-8 mb-4 text-gray-500" />
                                    <p className="mb-2 text-sm text-gray-500">
                                        <span className="font-semibold">Click to upload</span> or
                                        drag and drop
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Multiple files allowed
                                    </p>
                                </div>
                                <Input
                                    id="claim-file-upload"
                                    type="file"
                                    className="hidden"
                                    onChange={handleFileUpload}
                                    multiple
                                />
                            </div>
                        </Label>

                        {/* Display uploaded files */}
                        {claimFilesUploaded.length > 0 && (
                            <div className="mt-2">
                                <Label>Uploaded Files:</Label>
                                <ul className="list-disc list-inside">
                                    {claimFilesUploaded.map((file, index) => (
                                        <li key={index}>{file.name}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Update the disabled prop */}
                        <Button
                            className="w-full"
                            disabled={claimFilesUploaded.length === 0}
                        >
                            Apply for Claiming Process
                        </Button>
                        <p className="text-xs text-center text-gray-500">
                            Our team will reach out to you within 1-4 weeks via call or, if
                            needed, in person.
                        </p>
                    </CardFooter>
                </Card>
            </DrawerContent>
        </Drawer>
    );
}