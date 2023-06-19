import React from 'react';
import { Avatar, Box, Button, Dialog, DialogContent, DialogTitle, Grid, IconButton, Typography, } from '@mui/material';

import strings from '../../utils/strings';
import { connectMetaMask, connectWallet, defiConnect, } from '../wallet';
import { defiWallet, metaMask, walletConnect, } from '../wallet/provider';
import useNetwork from '../../hooks/useNetwork';
import { AiOutlineClose } from "react-icons/all";
import { NetworkType } from "../../utils/config/networkConfig";
import { NetworkContextType } from "../../Provider/context/NetworkContext";


const WalletConnectModal = ({ openModal, handleCloseModal }: { openModal: boolean, handleCloseModal: () => void }) => {
    const { setWalletType, network, setChain } = useNetwork() as NetworkContextType;

    const handleChooseWallet = async (type: string) => {
        if (!network?.chainId) return;
        try {
            switch (type) {
                case 'metamask':
                    await connectMetaMask(metaMask, setWalletType, setChain, undefined, network.chainId);
                    break;
                case 'defi wallet':
                    await defiConnect(defiWallet, setWalletType, setChain, undefined, network.chainId);
                    break;

                case 'wallet connect':
                    await connectWallet(walletConnect, setWalletType, setChain, undefined, network.chainId);
                    break;

                default:
                    console.log('default case');
            }
        } catch (e) {
            console.log({ error: e })
        } finally {
            handleCloseModal();
        }
    };

    return (
        <Dialog open={openModal} onClose={handleCloseModal}>
            <DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleCloseModal}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    {/*<CloseIcon/>*/}
                    <AiOutlineClose />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Typography
                    variant="h3"
                    component="div"
                    sx={{ color: 'text.primary' }}
                    align="center"
                >
                    {strings.connet_dialog_title}
                </Typography>
                <Box component="div" sx={{ maxWidth: 350, m: 'auto' }}>
                    <Grid container spacing={2} sx={{ my: 4 }}>
                        <Grid item xs={12} sx={{ pt: '8px !important' }}>
                            <Button
                                variant="contained"
                                startIcon={
                                    <Avatar
                                        alt="metamask"
                                        src="/static/wallet/meta.svg"
                                        sx={{
                                            width: 24,
                                            height: 24,
                                            backgroundColor: 'white',
                                            p: '5px',
                                        }}
                                    />
                                }
                                onClick={() => {
                                    handleChooseWallet('metamask');
                                }}
                                fullWidth
                            >
                                MetaMask
                            </Button>
                        </Grid>
                        <Grid item xs={12} sx={{ pt: '8px !important' }}>
                            <Button
                                variant="contained"
                                startIcon={
                                    <Avatar
                                        alt="walletconnect"
                                        src="/static/wallet/walletconnect.svg"
                                        sx={{
                                            width: 24,
                                            height: 24,
                                            backgroundColor: 'white',
                                            p: '5px',
                                        }}
                                    />
                                }
                                onClick={() => {
                                    handleChooseWallet('wallet connect');
                                }}
                                fullWidth
                            >
                                Wallet Connect
                            </Button>
                        </Grid>
                    </Grid>
                </Box>

                <Typography
                    variant="caption"
                    display="block"
                    sx={{ color: 'text.secondary' }}
                    gutterBottom
                    align="center"
                >
                    By Connecting, You Accept Neo Films{' '}
                    <span
                        className="cursor-pointer ml-1 font-bold text-blue-600 hover:text-blue-400"
                        onClick={() => {

                        }}
                    >
                        TOS
                    </span>{' '}
                    &
                    <span
                        className="cursor-pointer ml-1 font-bold text-blue-600 hover:text-blue-400"
                        onClick={() => {
                        }}
                    >
                        Privacy Policy
                    </span>
                </Typography>
                <Typography
                    variant="caption"
                    display="block"
                    sx={{ color: 'text.secondary' }}
                    gutterBottom
                    align="center"
                >
                    {strings.connect_dialog_note}
                </Typography>
            </DialogContent>
        </Dialog>
    );
};

export default WalletConnectModal;
