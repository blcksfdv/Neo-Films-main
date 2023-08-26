import React, {Fragment, useEffect, useState} from 'react'
import WalletConnectModal from '../../Modals/WalletConnectModal';
import {useWeb3React} from '@web3-react/core';
import {handleDisconnect} from "../../wallet";
import './nav.css'
import {GiWallet} from 'react-icons/gi'
import useNetwork from '../../../hooks/useNetwork';
import {NetworkContextType} from '../../../Provider/context/NetworkContext';
import {ETHEREUM_MAINNET, MAIN_LOGO, POLYGON_MAINNET} from "../../../utils/constant";
import networkConfig, {Network} from "../../../utils/config/networkConfig";
import {Link} from "react-router-dom";
import {Avatar, Box, Button, CircularProgress, Menu, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {addNetwork, switchNetwork} from "../../../utils/common";
import ConfirmationModal from "../../../modals/ConfirmationModal";
import {useSnackbar} from "notistack";
import {useBalance} from "../../../hooks/useBalance";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import styled from "styled-components";
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import useRpcNodeStatus from "../../../hooks/useRpcNodeStatus";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {RxDividerHorizontal, RxDividerVertical} from "react-icons/all";
export const Navbar = () => {
    const [openWalletModal, setOpenWalletModal] = useState<boolean>(false);
    const {account, connector, chainId, } = useWeb3React();
    const {setWalletType, setNetwork, setChain} = useNetwork() as NetworkContextType;
    const {enqueueSnackbar} = useSnackbar()
    const {network}=useNetwork() as NetworkContextType;
    const handleCloseModal = () => {
        setOpenWalletModal(false);
    }
    const [openPolygonTestConfirmModal, setOpenPolygonTestConfirmModal] = useState(false);
    const [openPolygonMainConfirmModal, setOpenPolygonMainConfirmModal] = useState(false);
    const [openEthereumConfirmModal, setOpenEthereumConfirmModal] = useState(false);
    const handleClosePolygonTestConfirmModal = () => setOpenPolygonTestConfirmModal(false);
    const handleClosePolygonMainConfirmModal = () => setOpenPolygonMainConfirmModal(false);
    const handleCloseEthereumConfirmModal = () => setOpenEthereumConfirmModal(false);


    const status = useRpcNodeStatus(network?.rpcUrl)

    const networks = [Network.polygonMainnet, Network.unsupportedChain]
    const supportedChain = [POLYGON_MAINNET];
    const handleSwitchNetwork = async (chainId: number) => {
        try {
            if (account) {
                await switchNetwork(networkConfig[chainId].connectInfo.chainId);
            }
            setNetwork(networkConfig[chainId]);
        } catch (switchError: any) {
            console.error({switchError});
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
    const handleAddNetwork = async (chainId: number) => {
        try {
            await addNetwork(networkConfig[chainId].connectInfo);
            handleOpenModal(chainId);
        } catch (adderror) {
            console.log({adderror});
            enqueueSnackbar('Error on Adding network on metamask', {
                variant: 'error',
                autoHideDuration: 5000,
            });
        }
    };
    const handleOpenModal = (chainId: number) => {
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
    const {balance, error} = useBalance()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div className='flex flex-row justify-between p-4 navigation'>
            <div className='flex flex-row justify-between w-full sm:px-32'>
                <Link to={'/'}>
                    <img src={MAIN_LOGO} className='h-14 w-20' alt=""/>
                </Link>
                <div className='flex  flex-col justify-end gap-5'>
                    {
                        account && chainId ? (
                            <Fragment>

                                <RightBlock className='gap-3' style={{
                                    gap:"8px"
                                }}>
                                    <Box>
                                        {balance === undefined ? <CircularProgress size={"12px"}/> : error ?
                                            <Box>{error}</Box> :
                                            supportedChain.includes(chainId) &&
                                            <Box>Balance: {balance} {RenderUnit(chainId)}</Box>}
                                    </Box>
                                    <RxDividerVertical/>
                                    {/*<CustomSelect*/}
                                    {/*    selected={getNetworkById(chainId)}*/}
                                    {/*    onChange={async (networkName: string) => {*/}
                                    {/*        await handleSwitchNetwork(getIdByNetwork(networkName) || 1)*/}
                                    {/*    }}*/}
                                    {/*    sx={{flex: 1}}*/}
                                    {/*    items={networks.filter((network) => network !== Network.unsupportedChain)}*/}
                                    {/*/>*/}
                                    <span>Network: {getNetworkById(chainId)}</span>
                                    <Button className='mx-2' variant={'contained'}
                                            onClick={() => handleDisconnect(setWalletType, connector, setChain)}>Disconnect</Button>
                                    {status&&<Box className={"ml-1 flex items-center gap-1"}>
                                        <Box>Status</Box>
                                        {status==='green'&&<CheckCircleIcon color={'success'}/>}
                                        {status==='yellow'&&<CheckCircleIcon color={'warning'}/>}
                                        {status==='red'&&<CancelRoundedIcon color={"error"}/>}
                                    </Box>}
                                </RightBlock>
                                <AvatarBlock>
                                    <Avatar
                                        id="basic-button"
                                        aria-controls={open ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        className={"cursor-pointer"}
                                        onClick={handleClick}
                                    >
                                        <PersonOutlineIcon/>
                                    </Avatar>
                                    <Menu
                                        id="demo-positioned-menu"
                                        aria-labelledby="demo-positioned-button"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'left',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'left',
                                        }}
                                    >
                                        <MenuItem onClick={handleClose}>  {balance === undefined ?
                                            <CircularProgress size={"12px"}/> : error ?
                                                <Box>{error}</Box> :
                                                supportedChain.includes(chainId) &&
                                                <Box>Balance: {balance} {RenderUnit(chainId)}</Box>}</MenuItem>
                                        <MenuItem>
                                            <CustomSelect
                                            textColor={'black'}
                                            selected={getNetworkById(chainId)}
                                            onChange={async (networkName: string) => {
                                                await handleSwitchNetwork(getIdByNetwork(networkName) || 1)
                                            }}
                                            sx={{flex: 1}}
                                            items={networks.filter((network) => network !== Network.unsupportedChain)}
                                        />
                                        </MenuItem>
                                        <MenuItem> {status&&<Box className={"ml-1 flex items-center gap-1"}>
                                            <Box>Status</Box>
                                            {status==='green'&&<CheckCircleIcon color={'success'}/>}
                                            {status==='yellow'&&<CheckCircleIcon color={'warning'}/>}
                                            {status==='red'&&<CancelRoundedIcon color={"error"}/>}
                                        </Box>}
                                        </MenuItem>
                                    <MenuItem
                                            onClick={() => handleDisconnect(setWalletType, connector, setChain)}>Disconnect</MenuItem>
                                    </Menu>
                                </AvatarBlock>

                            </Fragment>

                        ) : (
                            <button
                                className='bg-gradient-to-r from-purple-700 to-[#AB17DF] rounded-md text-white p-2 flex flex-row justify-center items-center gap-3'
                                onClick={() => setOpenWalletModal(true)}>
                                <GiWallet/>
                                <span className='font-extrabold text-base '>
                  Connect Wallet
                </span>
                            </button>
                        )
                    }
                </div>
            </div>
            {
                openWalletModal && (
                    <WalletConnectModal openModal={openWalletModal} handleCloseModal={handleCloseModal}/>
                )
            }
            {/*<ConfirmationModal*/}
            {/*    openConfirmModal={openPolygonTestConfirmModal}*/}
            {/*    handleCloseConfirmModal={handleClosePolygonTestConfirmModal}*/}
            {/*    title={`Would you like to add ${Network.polygonTestnet} Network on Metamask?`}*/}
            {/*    messages={`This will add ${Network.polygonTestnet} chain Id ${POLYGON_TESTNET} network on Metamask.`}*/}

            {/*    handleCallback={() => handleAddNetwork(POLYGON_TESTNET)}*/}
            {/*/>*/}
            <ConfirmationModal
                openConfirmModal={openPolygonMainConfirmModal}
                handleCloseConfirmModal={handleClosePolygonMainConfirmModal}
                title={`Would you like to add ${Network.polygonMainnet} on Metamask?`}
                messages={
                    `This will add ${Network.polygonMainnet} chain Id ${POLYGON_MAINNET} network on Metamask.`
                }
                handleCallback={() => handleAddNetwork(POLYGON_MAINNET)}
            /> <ConfirmationModal
            openConfirmModal={openEthereumConfirmModal}
            handleCloseConfirmModal={handleCloseEthereumConfirmModal}
            title={`Would you like to add ${Network.ethereumMainnet} on Metamask?`}
            messages={
                `This will add ${Network.ethereumMainnet} chain Id ${ETHEREUM_MAINNET} network on Metamask.`
            }
            handleCallback={() => handleAddNetwork(ETHEREUM_MAINNET)}
        />
        </div>
    )

    function RenderUnit(chainId: number) {
        switch (chainId) {
            case POLYGON_MAINNET:
                return '$MATIC';

            // case POLYGON_TESTNET:
            //     return 'TMatic';

            case ETHEREUM_MAINNET:
                return 'ETH'

        }
    }

    function getNetworkById(chainId: number) {
        switch (chainId) {
            case POLYGON_MAINNET:
                return Network.polygonMainnet;

            // case POLYGON_TESTNET:
            //     return Network.polygonTestnet;

            case ETHEREUM_MAINNET:
                return Network.ethereumMainnet

            default:
                return Network.unsupportedChain;

        }
    }

    function getIdByNetwork(networkName: string) {
        switch (networkName) {
            case Network.polygonMainnet:
                return POLYGON_MAINNET;

            // case Network.polygonTestnet:
            //     return POLYGON_TESTNET;

            case Network.ethereumMainnet:
                return ETHEREUM_MAINNET

            default:
                return null;

        }
    }
}
export const CustomSelect = ({
                                 selected,
                                 onChange,
                                 sx = {},
                                 items,
                                 textColor
                             }: {
    selected: string,
    onChange: (value: string) => void,
    sx?: any,
    items: string[]
    textColor?: string
}) => {
    const handleChange = (event: SelectChangeEvent<string>) => {
        onChange(event.target.value);
    };
    const MenuProps = {
        anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
        },
        transformOrigin: {
            vertical: 'top',
            horizontal: 'left',
        },

        variant: 'menu',
    };
    return <Select
        value={selected}
        onChange={handleChange}
        inputProps={{'aria-label': 'Without label'}}
        size="small"
        sx={{mr: 1, ...sx, color: textColor ? textColor : 'white'}}
    >
        {items.map((item, i) => (
            <MenuItem key={i} value={item} autoFocus={selected === item}>
                {item}
            </MenuItem>
        ))}
    </Select>
}

const RightBlock = styled(Box)`
  display: flex;
  align-items: center;
  gap: 2px;
  @media screen and (max-width: 850px) {
    display: none;

  }
`
const AvatarBlock = styled(Box)`
  display: none;
  @media screen and (max-width: 850px) {
    display: block;
  }
`
