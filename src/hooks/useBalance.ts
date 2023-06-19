import {useWeb3React} from "@web3-react/core";
import {useCallback, useEffect, useState} from "react";
import {BigNumber, ethers} from "ethers";
import useNetwork from "./useNetwork";
import {weiToEth} from "../utils/common";

export const useBalance = () => {
    const [balance, setBalance] = useState<number | null>();
    const {account} = useWeb3React();
    const {network} = useNetwork()
    const [error, setError] = useState<string | null>(null)

    const fetchBalance = useCallback(
        async (account: string) => {
            try {
                const provider = new ethers.providers.JsonRpcProvider(network?.rpcUrl)
                const big_balance: BigNumber = await provider
                    .getBalance(account);
                const balance = weiToEth(big_balance);
                setBalance(balance);
            } catch (error) {
                console.log({error})
                setError('error occured');
            }
        },
        [account,network]
    );

    useEffect(() => {
        if (account&&network) {
            fetchBalance(account);
        }
    }, [account, network]);

    return {balance, error};
};
