import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import useNetwork from '../../hooks/useNetwork'
import '../Navbar/component/nav.css'
import {ETHEREUM_LOGO, ETHEREUM_MAINNET, POLYGON_LOGO, POLYGON_MAINNET} from "../../utils/constant";
import networkConfig, {Network} from "../../utils/config/networkConfig";
import ConfirmationModal from "../../modals/ConfirmationModal";
import {useWeb3React} from "@web3-react/core";
import {useSnackbar} from "notistack";
import {addNetwork,switchNetwork} from "../../utils/common";


export const NetWorkSwitchtab = () => {
    const navigate = useNavigate()

    const { setNetwork} =
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
            navigate('/mint')
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
            navigate('/mint')
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

    return (
        <div className='flex flex-col items-center justify-center navigation rounded-lg w-full'>
            <div className='flex flex-col justify-center items-center rounded-lg text-black p-7 gap-10'>
                <div>
                    <h1 className='sm:text-2xl lg:text-4xl font-bold text-wrapper text-white'>Start minting</h1>
                    {/*<span className={"text-white text-xs sm:text-sm"}>NOTE: Even if you pay in Ethereum the NFT will be minted on Polygon.</span>*/}
                </div>
                <div className='flex items-center w-full gap-3 flex-wrap'>
                    {/*<button*/}
                    {/*    className='bg-gradient-to-r from-purple-700 to-[#AB17DF] rounded-md text-white p-2 px-3  flex flex-row justify-center items-center gap-1'*/}
                    {/*    onClick={() => handleSwitchNetwork(POLYGON_TESTNET)}>*/}
                    {/*    /!* <FaEthereum /> *!/*/}
                    {/*    <img className='h-4 w-4' src={POLYGON_LOGO} alt=""/>*/}
                    {/*    <span className='text-xs font-bold'>*/}
                    {/*       {Network.polygonTestnet}*/}
                    {/*    </span>*/}
                    {/*</button>*/}
                    {/*<button*/}
                    {/*    className='bg-gradient-to-r from-purple-700 to-[#AB17DF] rounded-md text-white p-2  flex flex-row justify-center items-center gap-4'*/}
                    {/*    onClick={() => handleSwitchNetwork(ETHEREUM_MAINNET)}>*/}
                    {/*    /!* <FaEthereum /> *!/*/}
                    {/*    <img className='h-4 w-4' src={ETHEREUM_LOGO} alt=""/>*/}
                    {/*    <span className='text-xs font-bold'>*/}
                    {/*        {Network.ethereumMainnet}*/}
                    {/*    </span>*/}
                    {/*</button>*/}
                    <button
                        className='bg-gradient-to-r from-purple-700 to-[#AB17DF] rounded-md text-white p-2 flex flex-row justify-center items-center gap-3'
                        onClick={() => handleSwitchNetwork(POLYGON_MAINNET)}>
                        {/*<img className='h-4 w-4' src={POLYGON_LOGO} alt=""/>*/}
                        <span className='text-xs font-bold'>
                           Mint Now
                        </span>
                    </button>
                </div>
                <span className={"text-white text-xs sm:text-sm"}>To claim reserved and free NFTs please use Polygon. If you pay with Ethereum, we will send you the NFT plus 1 MATIC per NFT you mint.</span>
            </div>
            {/*<ConfirmationModal*/}
            {/*    openConfirmModal={openPolygonTestConfirmModal}*/}
            {/*    handleCloseConfirmModal={handleClosePolygonTestConfirmModal}*/}
            {/*    title={`Would you like to add ${Network.polygonTestnet} Network on Metamask?`}*/}
            {/*    messages={`This will add ${Network.polygonTestnet} chain Id ${POLYGON_TESTNET} network on Metamask.`}*/}

            {/*    handleCallback={()=>handleAddNetwork(POLYGON_TESTNET)}*/}
            {/*/>*/}
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
        </div>
    )
}
