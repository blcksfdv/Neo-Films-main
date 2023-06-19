import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useTheme} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function ConfirmationModal({

                                              openConfirmModal,
                                              handleCloseConfirmModal,
                                              title,
                                              messages,
                                              handleCallback,
                                          }: {   openConfirmModal: boolean, handleCloseConfirmModal: () => void, title: string, messages: string, handleCallback: () => void }) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Dialog
            fullScreen={fullScreen}
            open={openConfirmModal}
            onClose={handleCloseConfirmModal}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{messages}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={handleCloseConfirmModal}>
                    No
                </Button>
                <Button
                    variant="contained"
                    onClick={handleCallback}
                >
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
}
