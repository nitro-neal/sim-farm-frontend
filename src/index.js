import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { useWallet, UseWalletProvider } from 'use-wallet'

const rpcUrl = "https://rpc-mumbai.matic.today"
const chainId = 80001

ReactDOM.render(
  <React.StrictMode>
    <UseWalletProvider
      chainId={chainId}
      connectors={{
        walletconnect: { rpcUrl }
      }}
    >
      <App />
    </UseWalletProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)