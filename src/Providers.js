import React from 'react'
import { ModalProvider } from '@pancakeswap-libs/uikit'
import * as bsc from '@binance-chain/bsc-use-wallet'
import { Provider } from 'react-redux'
import { RPC_URL } from './constants/constants'

const Providers = ({ children }) => {
  const chainId = 80001
  return (
    <Provider>
          <bsc.UseWalletProvider
            chainId={chainId}
            connectors={{
              walletconnect: { RPC_URL },
              bsc,
            }}
          >
                <ModalProvider>{children}</ModalProvider>
          </bsc.UseWalletProvider>

    </Provider>
  )
}

export default Providers