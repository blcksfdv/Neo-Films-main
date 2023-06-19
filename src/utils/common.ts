import { ethers } from "ethers";

// Get Abbrevation of hex addres //
export const reduceHexAddress = (strAddress: any) => {
  if (!strAddress) return "";
  if (strAddress.length < 10) return strAddress;
  return `${strAddress.substring(0, 5)}...${strAddress.substring(
    strAddress.length - 4,
    strAddress.length
  )}`;
};
export const weiToEth = (balance: any) => {
  return parseFloat(parseFloat(ethers.utils.formatEther(balance)).toFixed(2));
};

export const ethToWei = (value: any) => {
  return ethers.utils.parseEther(value.toString());
};

export const switchNetwork = async (chainId: any) => {
  try {
    const ethereum = window.ethereum as any;
    if (ethereum && ethereum.request) {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: chainId }],
      });
    }
  } catch (switchError) {
    throw switchError;
  }
};


const errorMessageAbberation = (message: string) => {
  return message.length > 268 ? message.substring(0, 268) + "..." : message;
};
export const getErrorMessage = (
  error: any,
  customMessage = "Something went wrong",
  showFullMessage = false
) => {
  const message =
    error?.response && error?.response?.data?.message
      ? error.response.data.message
      : error?.message ?? error?.reason ?? customMessage;
  return showFullMessage ? message : errorMessageAbberation(message);
};


export const addNetwork = async (network: any) => {
  try {
    const ethereum = window.ethereum as any;
    if (ethereum && ethereum.request) {
      await ethereum?.request({
        method: "wallet_addEthereumChain",
        params: [network],
      });
    }
  } catch (addError) {
    throw addError;
  }
};