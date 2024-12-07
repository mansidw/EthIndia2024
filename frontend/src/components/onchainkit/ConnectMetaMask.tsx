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

const WalletConnection: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const handleConnect = async () => {
    try {
      if (!window.ethereum) {
        toast.error('MetaMask is not installed!');
        return;
      }

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      setWalletAddress(accounts[0]);
      setIsConnected(true);
      toast.success('Wallet connected successfully!');
    } catch (error) {
      console.error('Wallet connection error:', error);
      toast.error('Failed to connect wallet');
    }
  };

  const handleDisconnect = async () => {
    try {
      setIsConnected(false);
      setWalletAddress(null);
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
          <WalletDefault>Connect Wallet</WalletDefault>
        </ConnectWallet>
      ) : (
        <Wallet>
          <div className="wallet-info">
            <Identity address={walletAddress}>
              <Avatar />
              <Name />
              <Address address={walletAddress} />
              <Badge />
              <EthBalance />
            </Identity>

            <WalletDropdown>
              <WalletDropdownBasename>My Wallet</WalletDropdownBasename>
              <WalletDropdownLink href="/profile">Profile</WalletDropdownLink>
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
