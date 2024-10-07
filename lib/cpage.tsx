// "use client"

// import { useEffect, useState } from 'react'
// import { UploadCloud } from 'lucide-react'
// import Image from 'next/image'
// import { Button } from "@/components/ui/button"
// import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Label } from "@/components/ui/label"
// import { Input } from "@/components/ui/input"
// import { cn } from "@/lib/utils"
// import { ScrollArea } from "@/components/ui/scroll-area"

// export function Page() {
//   const [splineLoaded, setSplineLoaded] = useState(false)
//   const [yearlyEarning, setYearlyEarning] = useState<string | null>(null)
//   const [worldIdConnected, setWorldIdConnected] = useState(false)
//   const [isUploaded, setIsUploaded] = useState(false)
//   const [claimFilesUploaded, setClaimFilesUploaded] = useState(false)

//   useEffect(() => {
//     const script = document.createElement('script')
//     script.src = "https://unpkg.com/@splinetool/viewer@1.9.28/build/spline-viewer.js"
//     script.type = "module"
//     script.onload = () => setSplineLoaded(true)
//     document.body.appendChild(script)

//     return () => {
//       document.body.removeChild(script)
//     }
//   }, [])

//   const earningOptions = [
//     { value: "less than 1000$", label: "Less than $1,000" },
//     { value: "up to 5000$", label: "Up to $5,000" },
//     { value: "up to 20000$", label: "Up to $20,000" },
//     { value: "up to 50000$", label: "Up to $50,000" },
//     { value: "more than 55000$", label: "More than $55,000" },
//   ]

//   const getInsuranceAmount = (earning: string | null): string => {
//     switch (earning) {
//       case "less than 1000$": return "$5,000"
//       case "up to 5000$": return "$25,000"
//       case "up to 20000$": return "$100,000"
//       case "up to 50000$": return "$250,000"
//       case "more than 55000$": return "$300,000"
//       default: return "$0"
//     }
//   }

//   const getMonthlyPremium = (earning: string | null): string => {
//     switch (earning) {
//       case "less than 1000$": return "$2"
//       case "up to 5000$": return "$9"
//       case "up to 20000$": return "$50"
//       case "up to 50000$": return "$150"
//       case "more than 55000$": return "$199"
//       default: return "$0"
//     }
//   }

//   const handleWorldIdConnect = () => {
//     setWorldIdConnected(true)
//     setTimeout(() => setWorldIdConnected(false), 3000)
//   }

//   const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<boolean>>) => {
//     const files = e.target.files
//     setter(files !== null && files.length > 0)
//   }

//   const selectedEarningOption = yearlyEarning 
//     ? earningOptions.find((option) => option.value === yearlyEarning) 
//     : null

//   return (
//     <div className="h-screen w-screen overflow-hidden relative bg-black">
//       {splineLoaded && (
//         <spline-viewer 
//           url="https://prod.spline.design/SHH-JPca4GBBBwxe/scene.splinecode"
//           className="absolute inset-0 w-full h-full"
//         />
//       )}  
//       <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black to-transparent z-10"></div>
//       <header className="absolute top-0 left-0 right-0 flex justify-between p-6 z-20">
//         <div className="relative w-16 h-16 ml-[12%]">
//           <Image
//             src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3d_i-lcYESZp5zUHhmnoNxl1TG55485IMrT.png"
//             alt="3D 'i' Logo"
//             fill
//             style={{ objectFit: 'contain' }}
//             quality={100}
//           />
//         </div>
//         <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-black transition-colors px-4 py-2 text-sm rounded-full mr-[12%]">
//           Connect
//         </Button>
//       </header>
//       <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent z-10"></div>
//       <footer className="absolute bottom-0 left-0 right-0 bg-transparent z-20">
//         <div className="flex justify-center space-x-8 p-6">
//           <button className="text-white hover:underline">What is INSURE</button>
//           <button className="text-white hover:underline">Roadmap</button>
//           <Drawer>
//             <DrawerTrigger asChild>
//               <button className="text-white hover:underline">Buy Insurance</button>
//             </DrawerTrigger>
//             <DrawerContent>
//               <Card className="w-[350px] mx-auto my-4">
//                 <CardHeader>
//                   <CardTitle>Buy Life Insurance</CardTitle>
//                   <CardDescription>Only with i tokens</CardDescription>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="yearly-earning">Your yearly earning in USD</Label>
//                     {/* Use standard HTML select */}
//                     <select
//                       id="yearly-earning"
//                       className="w-full border rounded p-2 text-black"
//                       value={yearlyEarning || ""}
//                       onChange={(e) => setYearlyEarning(e.target.value)}
//                     >
//                       <option value="" disabled>Select yearly earning...</option>
//                       {earningOptions.map((option) => (
//                         <option key={option.value} value={option.value}>
//                           {option.label}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div className="space-y-2">
//                     <Label>Your insurance amount is passed up to</Label>
//                     <Input 
//                       value={`${getInsuranceAmount(yearlyEarning)} in i tokens`}
//                       readOnly
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label>Your monthly premium will be</Label>
//                     <Input 
//                       value={`${getMonthlyPremium(yearlyEarning)} of i tokens`}
//                       readOnly
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="file-upload">Health Documents</Label>
//                     <div className="flex items-center justify-center w-full">
//                       <Label htmlFor="file-upload" className="w-full">
//                         <div className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
//                           <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                             <UploadCloud className="w-8 h-8 mb-4 text-gray-500" />
//                             <p className="mb-2 text-sm text-gray-500">
//                               <span className="font-semibold">Click to upload</span> or drag and drop
//                             </p>
//                             <p className="text-xs text-gray-500">Multiple files allowed</p>
//                           </div>
//                           <Input
//                             id="file-upload"
//                             type="file"
//                             className="hidden"
//                             onChange={(e) => handleFileUpload(e, setIsUploaded)}
//                             multiple
//                           />
//                         </div>
//                       </Label>
//                     </div>
//                     <p className="text-sm text-gray-500">
//                       If you have any type of health care problem, share each and every document. If you don't tell us now, you may face problems in the future. If you don't have any medical issues, write a note on a white page stating that you are fit and fine, and put your signature on it.
//                     </p>
//                   </div>
//                 </CardContent>
//                 <CardFooter className="flex flex-col space-y-2">
//                   <Button 
//                     className={cn(
//                       "w-full transition-colors",
//                       worldIdConnected ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"
//                     )}
//                     onClick={handleWorldIdConnect}
//                   >
//                     {worldIdConnected ? "World ID Connected" : "Connect World ID"}
//                   </Button>
//                   <Button 
//                     className="w-full"
//                     disabled={!worldIdConnected || !isUploaded || !yearlyEarning}
//                   >
//                     Buy Premium with i
//                   </Button>
//                 </CardFooter>
//               </Card>
//             </DrawerContent>
//           </Drawer>
//           <Drawer>
//             <DrawerTrigger asChild>
//               <button className="text-white hover:underline">Claim</button>
//             </DrawerTrigger>
//             <DrawerContent>
//               <Card className="w-[350px] mx-auto my-4">
//                 <CardHeader>
//                   <CardTitle>Claim Process</CardTitle>
//                   <CardDescription>Required documents for insurance claim</CardDescription>
//                 </CardHeader>
//                 <ScrollArea className="h-[400px] w-full pr-4">
//                   <CardContent className="space-y-4">
//                     <div className="space-y-2">
//                       <h3 className="font-semibold">1. Proof of Death:</h3>
//                       <ul className="list-disc list-inside text-sm">
//                         <li>Death Certificate (issued by the government)</li>
//                         <li>Hospital/Doctor's Report (detailing the cause of death)</li>
//                         <li>Post-Mortem/Autopsy Report (if applicable)</li>
//                       </ul>
//                     </div>
//                     <div className="space-y-2">
//                       <h3 className="font-semibold">2. Identification Documents:</h3>
//                       <ul className="list-disc list-inside text-sm">
//                         <li>ID Proof of the Nominee (passport, driving license, national ID, etc.)</li>
//                         <li>Relationship Proof with the Policyholder (birth certificate, marriage certificate, or legal document)</li>
//                       </ul>
//                     </div>
//                     <div className="space-y-2">
//                       <h3 className="font-semibold">3. Policy Documentation:</h3>
//                       <ul className="list-disc list-inside text-sm">
//                         <li>Original Insurance Policy Document (or proof of purchase)</li>
//                         <li>Completed Claim Form (provided by the insurer)</li>
//                       </ul>
//                     </div>
//                     <div className="space-y-2">
//                       <h3 className="font-semibold">4. Cause of Death Verification:</h3>
//                       <ul className="list-disc list-inside text-sm">
//                         <li>Accident Report (if death was due to an accident)</li>
//                         <li>FIR (First Information Report) from police (in case of unnatural death)</li>
//                         <li>Hospital Records/Discharge Summary (in case of illness-related death)</li>
//                         <li>Witness Statements (if applicable in accidental or suspicious deaths)</li>
//                       </ul>
//                     </div>
//                     <div className="space-y-2">
//                       <h3 className="font-semibold">5. Cause of Death Specific Documents:</h3>
//                       <ul className="list-disc list-inside text-sm">
//                         <li>Critical Illness Report (if the death is related to an illness covered by the policy)</li>
//                         <li>Attending Physician Statement (formal statement from the treating doctor)</li>
//                       </ul>
//                     </div>
//                     <div className="space-y-2">
//                       <h3 className="font-semibold">6. Additional Documents (if needed):</h3>
//                       <ul className="list-disc list-inside text-sm">
//                         <li>Court Orders (if there are legal disputes over the claim or nominee)</li>
//                       </ul>
//                     </div>
//                     <p className="text-xs text-gray-500 mt-4">
//                       $5 of i tokens will be charged to start the claiming process.
//                     </p>
//                   </CardContent>
//                 </ScrollArea>
//                 <CardFooter className="flex flex-col space-y-2">
//                   <div className="w-full space-y-2">
//                     <Label htmlFor="claim-file-upload" className="w-full">
//                       <div className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
//                         <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                           <UploadCloud className="w-8 h-8 mb-4 text-gray-500" />
//                           <p className="mb-2 text-sm text-gray-500">
//                             <span className="font-semibold">Click to upload</span> or drag and drop
//                           </p>
//                           <p className="text-xs text-gray-500">Multiple files allowed</p>
//                         </div>
//                         <Input
//                           id="claim-file-upload" 
//                           type="file"
//                           className="hidden"
//                           onChange={(e) => handleFileUpload(e, setClaimFilesUploaded)}
//                           multiple
//                         />
//                       </div>
//                     </Label>
//                     <p className="text-xs text-gray-500 text-center">
//                       Maximum file size is 100MB
//                     </p>
//                   </div>
//                   <Button className="w-full" disabled={!claimFilesUploaded}>
//                     Apply for Claiming Process
//                   </Button>
//                   <p className="text-xs text-center text-gray-500">
//                     Our team will reach out to you within 1-4 weeks via call or, if needed, in person.
//                   </p>
//                 </CardFooter>
//               </Card>
//             </DrawerContent>
//           </Drawer>
//         </div>
//       </footer>
//       <div className="absolute bottom-0 right-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-md text-white px-6 py-3 text-lg font-bold z-20 transform lg:scale-x-[0.94] lg:scale-y-[1.03] lg:origin-bottom-right">
//   MVP/ PROTOCOL
// </div>
//     </div>
//   )
// }