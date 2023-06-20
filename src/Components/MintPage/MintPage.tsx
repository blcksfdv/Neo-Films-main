import React, { Fragment, useEffect, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Divider,
  Paper,
  Step,
  StepContent,
  StepLabel,
  Stepper,
} from "@mui/material";
import { PriceInMatic } from "../../Helper/getCurrency";
import { useWeb3React } from "@web3-react/core";
import { useSnackbar } from "notistack";
import { BigNumber, ethers } from "ethers";
import { getErrorMessage } from "../../utils/common";
import claim from "../../assets/refund.png";
import ERC721ABI from "../../utils/abis/erc721";
import MintStatus from "./MintStatus";
import Confetti from "react-confetti";
// import ERC721ABI from '../../../utils/abi/erc721ABI';
import WalletConnectModal from "../Modals/WalletConnectModal";
import useNetwork from "../../hooks/useNetwork";
import DropConfettiModal from "../Modals/DropConfettiModal";
import "../Navbar/component/nav.css";
import { GiWallet } from "react-icons/gi";
import {
  ETHEREUM_MAINNET,
  GENESIS_ADDRESS,
  POLYGON_MAINNET,
} from "../../utils/constant";
import networkConfig from "../../utils/config/networkConfig";
import Decimal from "decimal.js";
import { CrossmintPayButton } from "@crossmint/client-sdk-react-ui";
import neoHeroimage from "../../assets/neoHeroImage.gif";
import { useBalance } from "../../hooks/useBalance";
export const MAX_SUPPLY = 3333;

const TESTNET = true;

const MintPage = () => {
  const { account, provider, chainId, isActive, accounts } = useWeb3React();
  const [activeStep, setActiveStep] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openConfettiModal, setConfettiModal] = useState(false);
  const [amount, setAmount] = useState(1);
  const { enqueueSnackbar } = useSnackbar();
  const [isClaimRemainLoading, setIsClaimRemainLoading] = useState(false);
  const [isReservedFetchLoading, setIsReservedFetchLoading] = useState(false);
  const [isFetchBTGOFetching, setIsFetchBTGOFetching] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [receipentAddress, setReceipentAddress] = useState("");
  const [Free, setFree] = useState<number>(0);
  const [reservedTokens, setReservedTokens] = useState<string[]>([]);
  const [MintedAmount, setMintedAmount] = useState<number | undefined>();
  const [btgo, setBtgo] = useState<number | undefined>();
  const [showGiftUi, setShowGiftUi] = useState(false);
  const [price, setPrice] = useState<number>(0);
  const toggleGiftUi = () => setShowGiftUi((prev) => !prev);
  // const {isFetchLoading, minted, startTime, fetchError, setMinted} = useMintFetch();
  // const [userMinted, setUserMinted] = useState([]);
  // console.log({ isWhiteListed, isFetchLoading, minted, mintedPercentage, startTime, fetchError });
  const { network } = useNetwork();
  const currencySymbol = network?.connectInfo.nativeCurrency.symbol;
  const crossmintPrice = Number(PriceInMatic);

  const currentNetwork = networkConfig[POLYGON_MAINNET];
  const {balance, error} = useBalance()

  const handleClaimReserved = async () => {
    try {
      setIsReservedFetchLoading(true);
      const signer = provider?.getSigner();
      const contract = new ethers.Contract(
        network?.film?.contractAddress ?? "",
        network?.film?.abi ?? [],
        signer
      );
      const estimation = await contract.estimateGas.claimReserved();
      let tx = await contract.claimReserved({
        gasLimit: estimation,
      });
      await tx.wait();
      await fetchData();
      enqueueSnackbar("Claimed Reserved Tokens", { variant: "success" });
      setIsReservedFetchLoading(false);
    } catch (error) {
      console.error({ error });

      enqueueSnackbar(getErrorMessage(error, "Error occured", false));
      setIsReservedFetchLoading(false);
    }
  };
  const handleClaimFree = async () => {
    try {
      setIsClaimRemainLoading(true);
      const signer = provider?.getSigner();
      const contract = new ethers.Contract(
        network?.film?.contractAddress ?? "",
        network?.film?.abi ?? [],
        signer
      );
      const estimation = await contract.estimateGas.claimFree();
      let tx = await contract.claimFree({
        gasLimit: estimation,
      });
      await tx.wait();
      await fetchData();
      enqueueSnackbar("Claimed Free Tokens", { variant: "success" });
      setIsClaimRemainLoading(false);
    } catch (error) {
      console.error({ error });
      enqueueSnackbar(getErrorMessage(error, "Error occured", false));
      setIsClaimRemainLoading(false);
    }
  };
  const handleClaimBtgo = async () => {
    try {
      setIsFetchBTGOFetching(true);
      const signer = provider?.getSigner();
      const contract = new ethers.Contract(
        network?.film?.contractAddress ?? "",
        network?.film?.abi ?? [],
        signer
      );
      const estimation = await contract.estimateGas.claimBtgoFree();
      let tx = await contract.claimBtgoFree({
        gasLimit: estimation,
      });
      await tx.wait();
      await btgoRemainning();
      enqueueSnackbar("Claimed BTGO Tokens", { variant: "success" });
      setIsFetchBTGOFetching(false);
    } catch (error) {
      console.error({ error });
      enqueueSnackbar(getErrorMessage(error, "Error occured", false));
      setIsFetchBTGOFetching(false);
    }
  };
  const handleMint = async () => {
    try {
      setIsLoading(true);
      if (network?.chainId === 1) {
        const signer = provider?.getSigner();

        const contract = new ethers.Contract(
          network?.film?.contractAddress ?? "",
          network?.film?.abi ?? [],
          signer
        );
        let total = (amount * price).toString();
        console.log({ amount, account, price, total });
        const estimation = await contract.estimateGas.mint(amount, account, {
          value: ethers.utils.parseEther(total),
        });
        let tx = await contract.mint(amount, account, {
          gasLimit: estimation,
          value: ethers.utils.parseEther(total),
        });
        await tx.wait();
      } else {
        if(Number(balance) >= amount * price){
          const signer = provider?.getSigner();
          const contract = new ethers.Contract(
            network?.film?.contractAddress ?? "",
            network?.film?.abi ?? [],
            signer
          );
          const estimation = await contract.estimateGas.publicMintToWithTip(
            account,
            amount,
            0,
            {
              value: ethers.utils.parseEther((amount * price).toFixed(18)),
            }
          );
          let tx = await contract.publicMintToWithTip(account, amount, 0, {
            gasLimit: estimation,
            value: ethers.utils.parseEther((amount * price).toFixed(18)),
          });
          await tx.wait();
          if (amount > 1) {
            await btgoRemainning();
          }
          enqueueSnackbar("Minted " + amount + " NFTs, please view on OpenSea", {
            variant: "success",
          });
  
        }else{
       
          
          enqueueSnackbar(getErrorMessage(error, "Not enough matic", false));
        }
        
      }
      setIsLoading(false);
   
    } catch (error) {
      console.error({ error });
      enqueueSnackbar(getErrorMessage(error, "Error occured", false));
      setIsLoading(false);
    }
  };

  const decrementMintHandler = () => {
    if (amount > 1) {
      setAmount((prev) => parseFloat(new Decimal(prev).minus(1).toString()));
    }
  };

  const incrementMintHandler = () => {
    setAmount((prev) => parseFloat(new Decimal(prev).add(1).toString()));
  };

  console.log("active", isActive);

  const handleCloseConfettiModal = () => setConfettiModal(false);
  const handleCloseModal = () => setOpenModal(false);
  const handleOpenModal = () => setOpenModal(true);

  const btgoRemainning = async () => {
    try {
      if (account && network) {
        const provider = new ethers.providers.JsonRpcProvider(
          currentNetwork.rpcUrl
        );
        let contract = new ethers.Contract(
          currentNetwork?.film?.contractAddress ?? "",
          currentNetwork?.film?.abi ?? [],
          provider
        );
        const btgo = await contract.getBtgoFreeClaimsRemaining(account);
        setBtgo(parseInt(btgo._hex, 16));
      }
    } catch (error) {
      throw error;
    }
  };
  const fetchData = async () => {
    try {
      if (!network) {
        return;
      }
      const provider = new ethers.providers.JsonRpcProvider(
        currentNetwork.rpcUrl
      );
      let contract = new ethers.Contract(
        currentNetwork?.film?.contractAddress ?? "",
        currentNetwork?.film?.abi ?? [],
        provider
      );

      const price = await contract.getPublicMintPrice();
      setPrice(parseFloat(ethers.utils.formatEther(price)));
      const freeRemaining = await contract.getClaimFreeRemaining(account);
      setFree(parseInt(freeRemaining._hex, 16));
      const reservedTokens = await contract.getReservedTokens(account);
      const tokenIds = Array.from(reservedTokens, (item: BigNumber) =>
        item.toString()
      );
      setReservedTokens(tokenIds);

      await btgoRemainning();
    } catch (error) {
      console.error({ error });
      enqueueSnackbar(getErrorMessage(error, "Error occured", false));
    }
  };

  useEffect(() => {
    async function fetchMintedAmount() {
      if (!network) {
        return;
      }
      const provider = new ethers.providers.JsonRpcProvider(
        currentNetwork.rpcUrl
      );
      let contract = new ethers.Contract(
        currentNetwork?.film?.contractAddress ?? "",
        currentNetwork?.film?.abi ?? [],
        provider
      );
      const mintedAmount = await contract.totalSupply();
      setMintedAmount(parseInt(mintedAmount._hex, 16));
    }

    fetchMintedAmount();
  });
  useEffect(() => {
    if (account && network) {
      fetchData();
    }
  }, [account, network]);

  useEffect(() => {
    if (account) {
      setActiveStep(1);
    } else {
      setActiveStep(0);
    }
  }, [account]);

  useEffect(() => {
    if (!network) {
      return;
    }
    const customProvider = new ethers.providers.JsonRpcProvider(
      currentNetwork.rpcUrl
    );
    const contract = new ethers.Contract(
      currentNetwork?.film?.contractAddress ?? "",
      ERC721ABI,
      customProvider
    );
    const transferFilter = contract.filters.Transfer(
      GENESIS_ADDRESS,
      null,
      null
    );

    customProvider.on(transferFilter, (log) => {
      setMintedAmount((prev) => (prev !== undefined ? prev + 1 : 1));
    });

    return () => {
      customProvider.off(transferFilter);
    };
  }, []);
  const mintedPercentage = ((MintedAmount! / MAX_SUPPLY) * 100).toFixed(0);
  return (
    <div className={"py-5 sm:py-10 text-white"}>
      {openModal && (
        <WalletConnectModal
          handleCloseModal={handleCloseModal}
          openModal={openModal}
        />
      )}
      {/* <div className={"max-w-4xl m-auto px-5 text-center"}>
        <h1 className={"text-md"}>
          Enter the # you want to purchase. You will automatically receive these
          NFTs into your wallet.
        </h1>
        <h1 className={"text-md"}>
          For the new B2G1 deal, purchases in multiples of 2 will be rewarded by
          a free, claimable, NFT [e.g. purchase 10, receive 5 free].{" "}
        </h1>
      </div> */}
      <div className="img rounded-3xl w-96 cursor-pointer hover:scale-125 hover:rotate-3 m-auto pt-5">
        <img src={neoHeroimage} alt="" className={"rounded-3xl"} />
      </div>
      <div className="flex flex-col w-full justify-center items-center py-5">
        <Paper
          className="navigation"
          sx={{
            p: 3, // px: 1,
            transition: "all 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            transform: "translateY(0px)",
            "&:hover": {
              boxShadow: "0 4px 8px 0px rgb(0 0 0 / 30%)",
              transform: "translateY(-4px)",
              "& .card-img:after": {
                transform: "rotate(25deg)",
                top: "-30%",
                opacity: 0.18,
              },
            },
          }}
        >
          <div className="flex flex-col justify-center w-full sm:w-[600px] gap-3 ">
            <Fragment>
              <MintStatus
                minted={MintedAmount}
                mintedPercentage={mintedPercentage}
                isLoading={MintedAmount === undefined}
              />
              {!isActive && (
                <div>
                  <button
                    className="bg-gradient-to-r m-auto from-purple-700 to-[#AB17DF] rounded-md text-white p-2 flex flex-row justify-center items-center gap-3"
                    onClick={handleOpenModal}
                  >
                    <GiWallet />
                    <span className="font-extrabold text-base ">
                      Connect Wallet
                    </span>
                  </button>
                </div>
              )}

              {chainId === POLYGON_MAINNET && isActive && (
                <Stepper activeStep={activeStep} orientation="vertical">
                  <Step className="">
                    <StepLabel>
                      <h1 className="font-bold text-lg text-white">
                        Wallet Connected
                      </h1>
                    </StepLabel>
                  </Step>
                  <Step>
                    <StepLabel>
                      <h1 className="font-bold text-lg text-white">
                        Select the amount you want to mint to your wallet
                      </h1>
                      {/* <span>
                        Even if you mint with Crossmint it will be minted to
                        your wallet. If you want to mint to a CrossMint account,
                        please disconnect your wallet.
                      </span> */}
                    </StepLabel>
                    <StepContent>
                      <Box className={"text-green-500"}>
                        {Free > 0 && chainId === POLYGON_MAINNET && (
                          <Box>
                            <div className={"mb-3"}>
                              <h1 className=" font-bold">
                                You Have {Free} free claim remaining.
                              </h1>
                              <button
                                className="bg-gradient-to-r from-purple-700 to-[#AB17DF] text-xs rounded-md text-white p-2 flex flex-row justify-center items-center gap-3"
                                onClick={handleClaimFree}
                                disabled={isLoading}
                              >
                                <img src={claim} className="w-4 h-4" alt="" />
                                <span className="text-xs font-bold ">
                                  Claim Now
                                </span>
                                {isClaimRemainLoading && (
                                  <CircularProgress
                                    className={"text-white"}
                                    size={"16px"}
                                  />
                                )}
                              </button>
                            </div>
                            <Divider className={"w-full bg-white"} />
                          </Box>
                        )}

                        {reservedTokens.length > 0 &&
                          chainId === POLYGON_MAINNET && (
                            <div>
                              <h1 className=" font-bold">
                                You Have {reservedTokens.length} reserved tokens
                                which are:
                              </h1>
                              <Box className={"flex items-center gap-3 mb-3"}>
                                <button
                                  onClick={handleClaimReserved}
                                  disabled={isLoading}
                                  className="bg-gradient-to-r from-purple-700 to-[#AB17DF] rounded-md text-white p-2 flex flex-row justify-center items-center gap-3"
                                >
                                  <img src={claim} className="w-4 h-4" alt="" />
                                  <span className="text-xs font-bold text-hite">
                                    Claim Now
                                  </span>
                                  {isReservedFetchLoading && (
                                    <CircularProgress
                                      className={"text-white"}
                                      size={"16px"}
                                    />
                                  )}
                                </button>
                                <div
                                  className={
                                    "flex items-center gap-2 flex-wrap"
                                  }
                                >
                                  {reservedTokens.map((token: string) => {
                                    return (
                                      <h1 className="p-2 border-2 font-semibold border-white">
                                        {token}
                                      </h1>
                                    );
                                  })}
                                </div>
                              </Box>
                              <Divider className={"w-full bg-white"} />
                            </div>
                          )}
                        {btgo !== undefined &&
                          btgo !== 0 &&
                          chainId === POLYGON_MAINNET && (
                            <div>
                              <h1 className=" font-bold">
                                You Have {btgo} claim remaining because of buy
                                two get one free.
                              </h1>

                              <button
                                onClick={handleClaimBtgo}
                                disabled={isLoading}
                                className="bg-gradient-to-r from-purple-700 to-[#AB17DF] rounded-md text-white p-2 flex mb-3 flex-row justify-center items-center gap-3"
                              >
                                <img src={claim} className="w-4 h-4" alt="" />
                                <span className="text-xs font-bold text-white">
                                  Claim Now
                                </span>
                                {isFetchBTGOFetching && (
                                  <CircularProgress
                                    className={"text-white"}
                                    size={"16px"}
                                  />
                                )}
                              </button>
                              <Divider className={"w-full bg-white"} />
                            </div>
                          )}
                      </Box>
                      <Box
                        className={
                          "mt-3 flex flex-col items-center justify-center gap-2 border-2 border-solid border-gray-300 p-5 rounded-xl max-w-sm"
                        }
                      >
                        <ButtonGroup
                          size="large"
                          aria-label="small outlined button group"
                          fullWidth
                          className="border-2 !border-white"
                        >
                          <Button
                            variant={"outlined"}
                            onClick={decrementMintHandler}
                            className="border-2 !border-white !text-white"
                          >
                            -
                          </Button>
                          <Button
                            value={amount}
                            className="border-2 !border-white !text-white"
                          >
                            {amount}
                          </Button>
                          <Button
                            className="border-2 !border-white !text-white"
                            variant={"outlined"}
                            onClick={incrementMintHandler}
                          >
                            +
                          </Button>
                        </ButtonGroup>
                        {chainId === POLYGON_MAINNET && (
                          <>
                            <Button
                              variant={"contained"}
                              fullWidth
                              onClick={handleMint}
                              className="bg-gradient-to-r from-purple-700 to-[#AB17DF] rounded-md text-white p-2 flex flex-row justify-center items-center gap-3"
                              disabled={isLoading || amount === 0}
                            >
                              Mint For {(amount * price).toFixed(2)}{" "}
                              {currencySymbol}
                            </Button>
                          </>
                        )}
                        <CrossmintPayButton
                          clientId="919d666c-fa5a-4fab-a166-6f1960f873d3"
                          mintConfig={{
                            type: "erc-721",
                            totalPrice: (price * amount).toString(),
                            amount: amount,
                            tipAmount: "0",
                            quantity: amount,
                          }}
                          mintTo={account}
                          paymentMethod="ETH"
                        />
                        <CrossmintPayButton
                          clientId="919d666c-fa5a-4fab-a166-6f1960f873d3"
                          mintConfig={{
                            type: "erc-721",
                            totalPrice: (price * amount).toString(),
                            amount: amount,
                            tipAmount: "0",
                            quantity: amount,
                          }}
                          mintTo={account}
                        />
                      </Box>
                    </StepContent>
                  </Step>
                </Stepper>
              )}

              {1 != 1 && (
                <Stepper
                  activeStep={activeStep}
                  orientation="vertical"
                  className="items-center"
                >
                  <Step>
                    <StepLabel>
                      <h1 className="font-bold text-lg text-white">
                        Select the amount you want to mint
                      </h1>
                    </StepLabel>
                    <StepContent>
                      <Box
                        className={
                          "mt-3 flex flex-col items-center justify-center gap-2 border-2 border-solid border-gray-300 p-5 rounded-xl max-w-sm"
                        }
                      >
                        <ButtonGroup
                          size="large"
                          aria-label="small outlined button group"
                          fullWidth
                          className="border-2 !border-white"
                        >
                          <Button
                            variant={"outlined"}
                            onClick={decrementMintHandler}
                            className="border-2 !border-white !text-white"
                          >
                            -
                          </Button>
                          <Button
                            value={amount}
                            className="border-2 !border-white !text-white"
                          >
                            {amount}
                          </Button>
                          <Button
                            className="border-2 !border-white !text-white"
                            variant={"outlined"}
                            onClick={incrementMintHandler}
                          >
                            +
                          </Button>
                        </ButtonGroup>
                        {chainId === POLYGON_MAINNET && (
                          <>
                            <Button
                              variant={"contained"}
                              fullWidth
                              onClick={handleMint}
                              className="bg-gradient-to-r from-purple-700 to-[#AB17DF] rounded-md text-white p-2 flex flex-row justify-center items-center gap-3"
                              disabled={isLoading || amount === 0}
                            >
                              Mint For {(amount * price).toFixed(2)}{" "}
                              {currencySymbol}
                            </Button>
                            <p className="text-white">
                              Mint directly on Polygon!
                            </p>
                          </>
                        )}
                        <button
                          onClick={handleOpenModal}
                          className="bg-gradient-to-r from-purple-700 to-[#AB17DF] rounded-md text-white p-2 flex flex-row justify-center items-center gap-3"
                        >
                          <GiWallet />
                          <span className="font-extrabold text-base ">
                            Mint with MATIC
                          </span>
                        </button>
                        <CrossmintPayButton
                          mintTo=""
                          clientId="919d666c-fa5a-4fab-a166-6f1960f873d3"
                          mintConfig={{
                            type: "erc-721",
                            totalPrice: (crossmintPrice * amount).toString(),
                            amount: amount,
                            tipAmount: "0",
                            quantity: amount,
                          }}
                          paymentMethod="ETH"
                        />
                        <CrossmintPayButton
                          clientId="919d666c-fa5a-4fab-a166-6f1960f873d3"
                          mintConfig={{
                            type: "erc-721",
                            totalPrice: (crossmintPrice * amount).toString(),
                            amount: amount,
                            tipAmount: "0",
                            quantity: amount,
                          }}
                        />
                        <span className="text-white text-center">
                          If you pay with CrossMint without connecting your
                          wallet, a wallet will be created on your behalf.
                        </span>
                      </Box>
                    </StepContent>
                  </Step>
                </Stepper>
              )}
            </Fragment>
          </div>
        </Paper>
        {openConfettiModal && (
          <DropConfettiModal
            openModal={openConfettiModal}
            handleCloseModal={handleCloseConfettiModal}
            rawNftList={[]}
          />
        )}
        {openConfettiModal && <Confetti />}
      </div>

      {network?.chainId === POLYGON_MAINNET && (
        <div className={"max-w-4xl m-auto px-5"}>
          <h1 className={"text-md text-center"}>
            {`If you choose to mint using Matic, any free NFTs you are owed via the buy-2-get-1 deal will automatically appear as a "claim". 

If you choose to mint using ETH or a Credit Card, please open a ticket on Discord for your NFTs to be airdropped to your wallet. 

For more information, please visit: https://discord.gg/neofilms.`}
          </h1>
        </div>
      )}
      {network?.chainId === ETHEREUM_MAINNET && (
        <div className={"max-w-4xl m-auto px-5"}>
          <h1 className={"text-lg"}>
            When your purchase is complete, select the POLYGON option at the top
            of the website. Any free NFTs you are due, will appear as a "claim"
            option
          </h1>
        </div>
      )}
    </div>
  );
};

export default MintPage;
