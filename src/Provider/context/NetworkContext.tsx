import { useWeb3React } from '@web3-react/core';
import { BigNumber, ethers } from 'ethers';
import React, { createContext, useEffect, useState } from 'react';
import { connectMetaMask, connectWallet, defiConnect, } from '../../Components/wallet';
import networkConfig, { Network, NetworkType } from '../../utils/config/networkConfig';
import { defiWallet, metaMask, walletConnect } from '../../Components/wallet/provider';
import { POLYGON_MAINNET, ETHEREUM_MAINNET } from '../../utils/constant';
import { useLocalStorage } from "../../hooks/useLocalstorage";

type setType = (value: (string | ((val: (string | undefined)) => (string | undefined)) | undefined)) => void
export type NetworkContextType = {
    walletType: string | undefined,
    balance: string,
    network: NetworkType | null | undefined,
    setNetwork: React.Dispatch<React.SetStateAction<NetworkType | null | undefined>>,
    handleWalletProvider: (walletType: string) => void,
    chain: string | undefined,
    setChain: setType,
    setWalletType: setType
};
export const NetworkContext = createContext<NetworkContextType | null>(null);

export const NetworkContextProvider = (props: any) => {
    const { account, chainId, provider } = useWeb3React();
    const [chain, setChain] = useLocalStorage<string | undefined>('chain', undefined);


    const initialNetwork = (): NetworkType | null | undefined => {
        if (!chain) {
            return networkConfig[POLYGON_MAINNET]; //default network
        } else if (chain === Network.polygonMainnet || chainId === POLYGON_MAINNET) {
            return networkConfig[POLYGON_MAINNET];
        } else if (
            chain === Network.ethereumMainnet ||
            chainId === ETHEREUM_MAINNET
        ) {
            return networkConfig[ETHEREUM_MAINNET];
        } else if (chain === Network.unsupportedChain) {
            return null;
        }
    };

    const [balance, setBalance] = useState('');
    const [network, setNetwork] = useState(initialNetwork);
    const [walletType, setWalletType] = useLocalStorage<string | undefined>('walletType', undefined);





    const setMetamaskProvider = async () => {
        try {
            if (!network) return
            await connectMetaMask(
                metaMask,
                setWalletType,
                setChain,
                undefined,
                network.chainId
            );
        } catch (e) {
            // toast({
            //     title: 'Error on Metamask wallet connection',
            //     description: e?.message ?? e.toString(),
            //     status: 'error',
            //     position: 'top-right',
            //     isClosable: true,
            //     duration: null,
            // });
            console.log({ error: e })
        }
    };
    const setDefiBrowserProvider = async () => {
        try {
            if (!network) return
            await defiConnect(defiWallet, setWalletType, setChain, undefined, network.chainId);
        } catch (e) {
            // toast({
            //     title: 'Error on Defi wallet connection',
            //     description: e?.message ?? e.toString(),
            //     status: 'error',
            //     position: 'top-right',
            //     isClosable: true,
            //     duration: null,
            // });
            console.log({ error: e });
        }
    };

    const setWalletConnectProvider = async () => {
        try {
            if (!network) return
            await connectWallet(
                walletConnect,
                setWalletType,
                setChain,
                undefined,
                network.chainId
            );
        } catch (e) {
            // toast({
            //     title: 'Error on Metamask wallet connection',
            //     description: e?.message ?? e.toString(),
            //     status: 'error',
            //     position: 'top-right',
            //     isClosable: true,
            //     duration: null,
            // });
            console.log({ error: e });
        }
    };

    const handleWalletProvider = async (walletType: string) => {
        switch (walletType) {
            case 'metamask':
                await setMetamaskProvider();
                break;
            case 'defi-browser':
                await setDefiBrowserProvider();
                break;
            case 'wallet-connect':
                await setWalletConnectProvider();
                break;
            default:
                console.log('default')
        }
    };

    useEffect(() => {
        if (network) {
            if (network.chainId === POLYGON_MAINNET) {
                localStorage.setItem('chain', Network.polygonMainnet);
                setChain(Network.polygonMainnet)
            } else if (network.chainId === ETHEREUM_MAINNET) {
                localStorage.setItem('chain', Network.ethereumMainnet);
                setChain(Network.ethereumMainnet)
            }
        } else {
            localStorage.setItem('chain', Network.unsupportedChain);
        }
    }, [network]);

    useEffect(() => {
        if (chainId) {
            setNetwork(networkConfig[chainId]);
        }
    }, [chainId]);

    // useEffect(() => {
    //     if (account && network && provider) {
    //         getBalance(account);
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [account, network, provider]);

    useEffect(() => {
        if (walletType) {
            handleWalletProvider(walletType);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [walletType, network]);

    return (
        <NetworkContext.Provider
            value={{
                walletType,
                balance,

                network,
                setNetwork,
                handleWalletProvider,
                chain,
                setChain,
                setWalletType,

            }}
        >
            {props.children}
        </NetworkContext.Provider>
    );
};
