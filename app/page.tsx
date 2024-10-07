import React from 'react';
import { ConnectionPage } from '@/components/ConnectionPage';
import { InsurancePage } from '@/components/InsurancePage';
import { ClaimPage } from '@/components/ClaimPage';
import { WalletConnectionProvider } from '@/components/WalletConnectionProvider';
import '@solana/wallet-adapter-react-ui/styles.css';

export default function Page() {
  return (
    <WalletConnectionProvider>
      <div>
      <ConnectionPage />
      <InsurancePage />
      <ClaimPage />
    </div>
    </WalletConnectionProvider>
  );
}
