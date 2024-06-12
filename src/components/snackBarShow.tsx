import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { SyntheticEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { setOpen } from '../redux/slices/snackBarSlice';


const SnackBarShow = () => {

    const action = (
        <React.Fragment>
            <Button />
            <IconButton
                size="small"
                aria-label="close"
                color="inherit">
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    const snackBarState = useAppSelector(state => state.snack);
    const dispatch = useAppDispatch();

    const handleClose = (event: Event | SyntheticEvent<any, Event>, reason: SnackbarCloseReason) => {

        dispatch(setOpen(false));

    }
    return (<>
        <Snackbar
            open={snackBarState.open}
            autoHideDuration={6000}
            onClose={handleClose}
            message={snackBarState.message}
            action={action}
        />
    </>)

}

export default SnackBarShow;