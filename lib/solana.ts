// Mock Solana wallet and connection functions
// In a real application, you would use @solana/web3.js and @solana/wallet-adapter

export interface Transaction {
  id: string;
  amount: number;
  timestamp: Date;
  status: 'confirmed' | 'pending' | 'failed';
  type: 'send' | 'receive' | 'vote' | 'submit';
  description: string;
}

export interface Wallet {
  address: string;
  balance: number;
  transactions: Transaction[];
}

// Mock function to connect wallet
export const connectWallet = async (): Promise<Wallet> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return mock wallet data
  return {
    address: '8xH4jq9Tz5VJ1zL3Yfq',
    balance: 5.23,
    transactions: generateMockTransactions(),
  };
};

// Mock function to disconnect wallet
export const disconnectWallet = async (): Promise<void> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In a real app, this would clear wallet connection
  return;
};

// Mock function to send a transaction
export const sendTransaction = async (amount: number, recipient: string): Promise<Transaction> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Return mock transaction
  return {
    id: generateRandomId(),
    amount,
    timestamp: new Date(),
    status: 'confirmed',
    type: 'send',
    description: `Sent ${amount} SOL to ${recipient}`,
  };
};

// Helper function to generate mock transactions
function generateMockTransactions(): Transaction[] {
  return [
    {
      id: generateRandomId(),
      amount: 1.2,
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      status: 'confirmed',
      type: 'receive',
      description: 'Received from airdrop',
    },
    {
      id: generateRandomId(),
      amount: 0.5,
      timestamp: new Date(Date.now() - 172800000), // 2 days ago
      status: 'confirmed',
      type: 'send',
      description: 'Sent to marketplace',
    },
    {
      id: generateRandomId(),
      amount: 0.1,
      timestamp: new Date(Date.now() - 259200000), // 3 days ago
      status: 'confirmed',
      type: 'vote',
      description: 'Voted on contribution #1234',
    },
  ];
}

// Helper function to generate random ID
function generateRandomId(): string {
  return Math.random().toString(36).substring(2, 15);
}