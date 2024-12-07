import React, { useState } from 'react';
import { Transaction } from '@coinbase/onchainkit/transaction';
import { useAccount } from 'wagmi';
import { toast } from 'react-toastify';
import { parseEther } from 'viem';

const TransactionComponent = () => {
  const { address } = useAccount();
  const [transactionHash, setTransactionHash] = useState<string | null>(null);

  const handleSendTransaction = async () => {
    if (!address) {
      toast.error('Please connect wallet first');
      return;
    }

    try {
      // Example transaction to a dummy address
      const transaction = await Transaction({
        from: address,
        to: '0x1234567890123456789012345678901234567890', // Replace with actual recipient
        value: parseEther('0.01'), // 0.01 ETH
        chain: 'base', // Or appropriate chain
      });

      if (transaction.hash) {
        setTransactionHash(transaction.hash);
        toast.success('Transaction sent successfully!');
      }
    } catch (error) {
      console.error('Transaction error:', error);
      toast.error('Failed to send transaction');
    }
  };

  return (
    <div className="transaction-container">
      <button 
        onClick={handleSendTransaction} 
        className="btn btn-success mt-3"
        disabled={!address}
      >
        Send Sample Transaction
      </button>

      {transactionHash && (
        <div className="transaction-status mt-3">
          <h4>Transaction Details</h4>
          <p>Transaction Hash: {transactionHash}</p>
        </div>
      )}
    </div>
  );
};

export default TransactionComponent;