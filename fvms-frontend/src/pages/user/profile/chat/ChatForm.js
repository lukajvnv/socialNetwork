import React from 'react';

import Grid from '@material-ui/core/Grid';
import CONFIG from '../../../../config';
import strings from '../../../../localization';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import { postMessage } from '../../../../services/ChatService';

const ChatForm = ({
    user,
    friend,
    setNewActiveChat
}) => {

    const profileImageSrc = user.urlProfile ? CONFIG.imageUrlRegistry + user.urlProfile : '';

    const [message, setMessage] = React.useState('');

    const sendMessage = () => {
        const newMessage = {
            receiver: friend,
            text: message,
            sender: user
        }
        postMessage(newMessage).then(response => {
            console.log(response);
            setMessage('');
            // refreshView();
            setNewActiveChat(friend.email);

        }
        ).catch(err => {
            console.log(err);
        });
    }

    const changeMessageText = (event) => {
        const text = event.target.value;
        setMessage(text);
    }

    const keyPress = (event) => {
        if(event.key == 'Enter') {
            sendMessage();
        }
    }

    return (
        <Grid container
        >
            <Grid item md={2} >
                <Box pl={2} pt={1}>
                    <Avatar
                        alt={user.firstName}
                        src={profileImageSrc}
                    />
                </Box>
            </Grid>
            <Grid item md={8} >
                <TextField
                    // helperText={getError(errors, 'text')}
                    onChange={changeMessageText}
                    onKeyPress={keyPress}
                    value={message}
                    fullWidth
                    autoFocus
                    name='text'
                    label={strings.chat.placeholder}
                />
            </Grid>
            <Grid item md={2} >
                
                    <Button
                        size="small"
                        color="primary"
                        startIcon={<SendIcon />}
                        variant="contained"
                        onClick={sendMessage}
                    >
                        {strings.comment.send}
                    </Button>
            </Grid>
        </Grid>
    )
}

export default ChatForm;