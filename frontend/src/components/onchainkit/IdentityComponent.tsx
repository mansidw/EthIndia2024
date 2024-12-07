import React, { useState } from 'react';
import {
  ConnectWallet,
  Wallet,
  WalletDefault,
  WalletDropdown,
  WalletDropdownBasename,
  WalletDropdownLink,
  WalletDropdownDisconnect,
} from '@coinbase/onchainkit/wallet';
import {
  Address,
  Avatar,
  Badge,
  EthBalance,
  Name,
  Identity,
} from '@coinbase/onchainkit/identity';
import { toast } from 'react-toastify';

const WalletConnection = () => {
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = async () => {
    try {
      // Implement connection logic
      // Note: Actual connection method depends on your wallet provider setup
      setIsConnected(true);
      toast.success('Wallet connected successfully!');
    } catch (error) {
      console.error('Wallet connection error:', error);
      toast.error('Failed to connect wallet');
    }
  };

  const handleDisconnect = async () => {
    try {
      // Implement disconnection logic
      setIsConnected(false);
      toast.info('Wallet disconnected');
    } catch (error) {
      console.error('Wallet disconnection error:', error);
      toast.error('Failed to disconnect wallet');
    }
  };

  return (
    <div className="wallet-connection-container">
      {!isConnected ? (
        <ConnectWallet 
          onConnect={handleConnect}
          className="connect-wallet-button"
        >
          <WalletDefault>
            Connect Wallet
          </WalletDefault>
        </ConnectWallet>
      ) : (
        <Wallet>
          <div className="wallet-info">
            <Identity>
              <Avatar />
              <Name />
              <Address />
              <Badge />
              <EthBalance />
            </Identity>
            
            <WalletDropdown>
              <WalletDropdownBasename>My Wallet</WalletDropdownBasename>
              <WalletDropdownLink href="/profile">
                Profile
              </WalletDropdownLink>
              <WalletDropdownDisconnect onDisconnect={handleDisconnect}>
                Disconnect
              </WalletDropdownDisconnect>
            </WalletDropdown>
          </div>
        </Wallet>
      )}
    </div>
  );
};

export default WalletConnection;