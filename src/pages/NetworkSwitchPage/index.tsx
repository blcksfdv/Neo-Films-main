import { useWeb3React } from '@web3-react/core';
import { useState } from 'react';
import ConfirmationModal from '../../modals/ConfirmationModal';
import { addNetwork, switchNetwork } from '../../utils/common';
import { Box } from '@mui/material';
import { useSnackbar } from 'notistack';
import { handleDisconnect } from '../../Components/wallet';
import {NOT_FOUND_IMG} from "../../utils/constant";
import {Button} from '@mui/material';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import {
    ETHEREUM_LOGO,
    ETHEREUM_MAINNET,
    POLYGON_LOGO,
    POLYGON_MAINNET
} from '../../utils/constant';


import useNetwork from "../../hooks/useNetwork";
import networkConfig, {Network} from "../../utils/config/networkConfig";
import MintPage from "../../Components/MintPage/MintPage";

const supportedChains = [
    ETHEREUM_MAINNET,
    POLYGON_MAINNET
];
const NetworkSwitchPage = () => {

    const { setNetwork, walletType, setWalletType, setChain } =
        useNetwork();
    const { chainId, isActive, account,connector } = useWeb3React();



    const [openPolygonTestConfirmModal, setOpenPolygonTestConfirmModal] = useState(false);
    const [openPolygonMainConfirmModal, setOpenPolygonMainConfirmModal] = useState(false);
    const [openEthereumConfirmModal, setOpenEthereumConfirmModal] = useState(false);
    const handleClosePolygonTestConfirmModal = () => setOpenPolygonTestConfirmModal(false);
    const handleClosePolygonMainConfirmModal = () => setOpenPolygonMainConfirmModal(false);
    const handleCloseEthereumConfirmModal = () => setOpenEthereumConfirmModal(false);

    const { enqueueSnackbar } = useSnackbar();


    const handleSwitchNetwork = async (chainId:number) => {
        try {
            if (account) {
                await switchNetwork(networkConfig[chainId].connectInfo.chainId);
                setNetwork(networkConfig[chainId]);
            } else {
                setNetwork(networkConfig[chainId]);
            }
        } catch (switchError:any) {
            if (switchError.code === 4902) {
                handleOpenModal(chainId);
            } else {
                enqueueSnackbar('Error on Switching network on metamask', {
                    variant: 'error',
                    autoHideDuration: 5000,
                });
            }
        }
    };
    const handleAddNetwork = async (chainId:number) => {
        try {
            await addNetwork(networkConfig[chainId].connectInfo);
            handleOpenModal(chainId);
        } catch (adderror) {
            console.log({ adderror });
            enqueueSnackbar('Error on Adding network on metamask', {
                variant: 'error',
                autoHideDuration: 5000,
            });
        }
    };
    const handleOpenModal=(chainId:number)=>{
        switch (chainId) {
            case POLYGON_MAINNET:
                setOpenPolygonMainConfirmModal(true);
                break;
            case ETHEREUM_MAINNET:
                setOpenEthereumConfirmModal(true);
                break;
            default:
                console.log("Invalid chainId");
                break;
        }
    }
    if (isActive && account) {
        if (chainId && supportedChains.includes(chainId)) {
            return <MintPage/>;
        } else {
            return   <div>
                <div className="flex flex-col items-center justify-center gap-5 font-Sen py-5">
                    <h1 className="sm:text-2xl text-center font-bold tracking-widest ">
                        😅Oops! you are in wrong network, please switch to supported network
                    </h1>
                    <div className="font-extrabold sm:text-3xl">
                        WALLET : {walletType?.toUpperCase()}
                    </div>
                    <div>
                        <h2 className="text-md text-center font-semibold mb-2">
                            This feature only works with Metamask; please switch network within
                            the application for other wallets.
                        </h2>

                        <div className="flex items-center justify-center gap-3">
                            <Button
                                variant="contained"
                                startIcon={
                                    <Box
                                        draggable={false}
                                        component="img"
                                        alt=""
                                        src={POLYGON_LOGO}
                                        sx={{
                                            width: 24,
                                            height: 24,
                                            filter: 'unset',
                                        }}
                                    />
                                }
                                size="small"
                                onClick={()=>handleSwitchNetwork(POLYGON_MAINNET)}
                            >
                                {Network.polygonMainnet}
                            </Button>
                            <Button
                                variant="contained"
                                startIcon={
                                    <Box
                                        draggable={false}
                                        component="img"
                                        alt=""
                                        src={ETHEREUM_LOGO}
                                        sx={{
                                            width: 24,
                                            height: 24,
                                            filter: 'unset',
                                        }}
                                    />
                                }
                                size="small"
                                onClick={()=>handleSwitchNetwork(ETHEREUM_MAINNET)}
                            >
                                {Network.ethereumMainnet}
                            </Button>
                            <Button
                                variant="contained"
                                startIcon={<LogoutOutlinedIcon />}
                                size="small"
                                onClick={() =>
                                    handleDisconnect(setWalletType, connector, setChain)
                                }
                            >
                                Disconnect Wallet
                            </Button>
                        </div>
                    </div>
                    <div className="w-64 flex justify-center items-center">
                        <img
                            className="w-full"
                            src={NOT_FOUND_IMG}
                            alt=""
                        />
                    </div>
                </div>
                <ConfirmationModal
                    openConfirmModal={openPolygonMainConfirmModal}
                    handleCloseConfirmModal={handleClosePolygonMainConfirmModal}
                    title={`Would you like to add ${Network.polygonMainnet} on Metamask?`}
                    messages={
                        `This will add ${Network.polygonMainnet} chain Id ${POLYGON_MAINNET} network on Metamask.`
                    }
                    handleCallback={()=>handleAddNetwork(POLYGON_MAINNET)}
                />  <ConfirmationModal
                    openConfirmModal={openEthereumConfirmModal}
                    handleCloseConfirmModal={handleCloseEthereumConfirmModal}
                    title={`Would you like to add ${Network.ethereumMainnet} on Metamask?`}
                    messages={
                        `This will add ${Network.ethereumMainnet} chain Id ${ETHEREUM_MAINNET} network on Metamask.`
                    }
                    handleCallback={()=>handleAddNetwork(ETHEREUM_MAINNET)}
                />
            </div>;
        }
    } else {
        return <MintPage/>;
    }
};
export default NetworkSwitchPage;

