import React from 'react';
import Button from '@material-ui/core/Button';
import strings from "../../../../localization";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const ChatNew = ({
    friendsList,
    setNewActiveChat
}) => {

    const chatNewClick = () => {
        handleClose();
        setNewActiveChat(friend);
    }

    const [open, setOpen] = React.useState(false);
    const [friend, setFriend] = React.useState(undefined);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onChangeValue = (event) => {
        const friend = event.target.value;
        setFriend(friend);
    }

    return (
        <div>
            <Button
                size="large"
                color="primary"
                startIcon={<AddCircleIcon />}
                variant="contained"
                onClick={handleClickOpen}
            >
                {strings.chat.new}
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{strings.chat.new}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {strings.chat.dialogText}
                    </DialogContentText>
                    <FormControl className="formControl">
                        <InputLabel id="dl">{strings.chat.selectPlaceholder}</InputLabel>
                        <Select
                            labelId="dl"
                            onChange={onChangeValue}
                            value={friend}
                            native
                            inputProps={{
                                name: "bla",
                            }}
                        >
                            <option aria-label="None" value="" />
                            {
                                friendsList.map((friend) => (
                                    <option key={friend.id} value={friend.email}>{friend.email}</option>
                                ))
                            }
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        {strings.chat.backAction}
                    </Button>
                    <Button onClick={chatNewClick} color="primary">
                        {strings.chat.newAction}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ChatNew;