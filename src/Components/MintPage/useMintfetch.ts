import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useSnackbar } from "notistack";
import useNetwork from "../../hooks/useNetwork";
import { getErrorMessage } from "../../utils/common";

const useMintFetch = () => {
  const { network } = useNetwork();
  const [isFetchLoading, setLoading] = useState(false);
  const [minted, setMinted] = useState(0);
  // const [mintedPercentage, setMintedPercentage] = useState(0);
  const [startTime, setStartTime] = useState();
  const { enqueueSnackbar } = useSnackbar();
  const [fetchError, setFetchError] = useState(null);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       // console.log({ network });
//       const provider = new ethers.providers.JsonRpcProvider(network.rpcUrl);
//       let contract = new ethers.Contract(
//         network.drop.cronosDuel.contractAddress,
//         network.drop.cronosDuel.abi,
//         provider
//       );
//       let minted = await contract.totalSupply();
//       setMinted(parseInt(minted._hex, 16));
//       // const mintedPercentage = ((minted / MAX_SUPPLY) * 100).toFixed(3);
//       // setMintedPercentage(mintedPercentage);
//       setLoading(false);
//     } catch (error) {
//       console.error({ error });
//       setFetchError(getErrorMessage(error, "Error occured", false));
//       setLoading(false);
//       enqueueSnackbar(getErrorMessage(error, "Error occured", false));
//     }
//   };
//   useEffect(() => {
//     if (network) {
//       fetchData();
//     }
//   }, [network]);
  return { isFetchLoading, minted, startTime, fetchError, setMinted };
};
export default useMintFetch;
