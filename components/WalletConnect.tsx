// src/components/WalletConnect.tsx
'use client';
import { useEffect, useState } from 'react';

declare global {
  interface Window {
    solana?: any;
  }
}

const WalletConnect = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const connectWallet = async () => {
    if (window.solana) {
      try {
        const resp = await window.solana.connect();
        setWalletAddress(resp.publicKey.toString());
      } catch (err) {
        console.error(err);
      }
    } else {
      alert('Solana wallet not found. Please install Phantom wallet.');
    }
  };

  useEffect(() => {
    if (window.solana && window.solana.isPhantom) {
      window.solana
        .connect({ onlyIfTrusted: true })
        .then((resp: any) => setWalletAddress(resp.publicKey.toString()))
        .catch(() => console.log('User has not connected wallet yet.'));
    }
  }, []);

  return (
    <div className="wallet-container">
      {walletAddress ? <p>Connected: {walletAddress}</p> : <button onClick={connectWallet}>Connect Wallet</button>}
    </div>
  );
};

export default WalletConnect;
