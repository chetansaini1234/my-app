// ConnectionPage.tsx

"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { InsurancePage } from './InsurancePage';
import { ClaimPage } from './ClaimPage';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';
export function ConnectionPage() {
  const [splineLoaded, setSplineLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://unpkg.com/@splinetool/viewer@1.9.28/build/spline-viewer.js';
    script.type = 'module';
    script.onload = () => setSplineLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden relative bg-black">
      {splineLoaded && (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <spline-viewer
            url="https://prod.spline.design/SHH-JPca4GBBBwxe/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      )}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black to-transparent z-10"></div>
      <header className="absolute top-0 left-0 right-0 h-24 flex justify-between p-6 z-20">
        <div className="relative w-16 h-16 ml-[12%]">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3d_i-lcYESZp5zUHhmnoNxl1TG55485IMrT.png"
            alt="3D 'i' Logo"
            fill
            style={{ objectFit: 'contain' }}
            quality={100}
          />
        </div>
        {/* Replace the Button with WalletMultiButton */}
        <div className="mr-[12%]">
          <WalletMultiButton />
        </div>
      </header>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent z-10"></div>
      <footer className="absolute bottom-0 left-0 right-0 h-24 flex justify-center space-x-8 p-6 z-20">
        <button className="text-white hover:underline">What is INSURE</button>
        <button className="text-white hover:underline">Roadmap</button>
        <InsurancePage />
        <ClaimPage />
      </footer>
    </div>
  );
}