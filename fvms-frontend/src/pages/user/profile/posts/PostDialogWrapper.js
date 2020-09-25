import React, { useRef } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import PostDialog from './PostDialog';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const PostDialogWrapper = ({
        user, 
        snackbar,
        data,
        image,
        docFile,
        onSubmit,
        onChange,
        errors,
        closeAction,
        open
    }) => {
        const classes = useStyles();
        // const [open, setOpen] = React.useState(true);

        // const handleClose = () => {
        //     setOpen(false);
        // };
        // const handleToggle = () => {
        //     setOpen(!open);
        // };

        const handleClose = () => {
            if(closeAction){
                closeAction();
            }
        };

    return (
        <div>
            {/* <Button variant="outlined" color="primary" onClick={handleToggle}>
                Show backdrop
            </Button> */}
            <Backdrop 
                className={classes.backdrop} 
                open={open}
            >
                <PostDialog 
                    shouldOpen={open} 
                    closeAction={() => handleClose()} 
                    user={user} 
                    snackbar={snackbar}
                    data={data}
                    imageFile={image}
                    docFile={docFile}
                    onSubmit={onSubmit}
                    onChange={onChange}
                    errors={errors}
                />
            </Backdrop>
        </div>
    );
}

export default PostDialogWrapper;