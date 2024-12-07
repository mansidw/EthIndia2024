import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Wagmi Providers
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from './config/wagmi-config';

// OnchainKit Provider
import { OnchainKitProvider } from '@coinbase/onchainkit';

// Routes and Constants
import CustomRoutes from './utils/Routes';
import { PAGE_TITLE } from './utils/constants';

// Components
import ConnectMetaMaskWallet from "./components/onchainkit/ConnectMetaMask";
import TransactionComponent from "./components/onchainkit/TransactionComponent";
import IdentityComponent from "./components/onchainkit/IdentityComponent";

// Create a query client
const queryClient = new QueryClient();

function App() {
  // Set page title
  document.title = PAGE_TITLE;

  // State management
  const [activeComponent, setActiveComponent] = useState<'identity' | 'transaction' | null>(null);
  const [walletConnected, setWalletConnected] = useState(false);

  // Handle successful wallet connection
  const handleWalletConnect = () => {
    setWalletConnected(true);
    setActiveComponent('identity');
  };

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider
          chain="base" 
          apiKey={import.meta.env.VITE_ONCHAINKIT_API_KEY || ''}
        >
          <div className="app-container container">
            {/* Toast Notifications */}
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />

            {/* Wallet Connection and Navigation */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <ConnectMetaMaskWallet onConnect={handleWalletConnect} />

              {walletConnected && activeComponent === 'identity' && (
                <button
                  className="btn btn-secondary"
                  onClick={() => setActiveComponent('transaction')}
                >
                  View Transactions
                </button>
              )}

              {activeComponent === 'transaction' && (
                <button
                  className="btn btn-primary"
                  onClick={() => setActiveComponent(null)}
                >
                  Back to Home
                </button>
              )}
            </div>

            {/* Render Components Based on State */}
            {walletConnected && activeComponent === 'identity' && <IdentityComponent />}
            {activeComponent === 'transaction' && <TransactionComponent />}
            {activeComponent === null && !walletConnected && <CustomRoutes />}
          </div>
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
