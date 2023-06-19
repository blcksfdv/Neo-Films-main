import React from 'react'
import ReactDOM from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import './index.css'

import App from './App'
import theme from "./utils/theme";
import { Web3ReactProvider } from "@web3-react/core";
import {
    metaMask,
    metaMaskHooks,
    defiWallet,
    defiWalletHook,
    walletConnect,
    walletConnectHooks,
} from './Components/wallet/provider'
import { NetworkContext, NetworkContextProvider } from "./Provider/context/NetworkContext";
import { SnackbarProvider } from 'notistack';
const rootElement = document.getElementById('root') as HTMLElement

const root = ReactDOM.createRoot(rootElement);
root.render(
    <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />

        <Web3ReactProvider
            connectors={[
                [metaMask, metaMaskHooks],
                [walletConnect, walletConnectHooks],
                [defiWallet, defiWalletHook],
            ]}
            lookupENS={false}
        >
            <NetworkContextProvider>
                <SnackbarProvider >
                    <App />
                </SnackbarProvider >

            </NetworkContextProvider>
        </Web3ReactProvider>

    </ThemeProvider>
)
