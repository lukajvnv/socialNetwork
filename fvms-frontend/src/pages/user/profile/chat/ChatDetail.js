import React, { useEffect } from 'react';
import { getMessagesWithUser } from '../../../../services/ChatService';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { farFromNow } from '../../../../util/DateUtil';
import Autocomplete from '../../../../components/Autocomplete';

const useStyles = makeStyles((theme) => ({
    paper: {
        pading: 2,
    },
}));

const ChatDetail = ({
    friendEmail,
    friend,
    messages,
}) => {
    const classes = useStyles();

    // const [messages, setMessages] = React.useState([]);
    // const [currentFriend, setCurrentFriend] = React.useState(undefined);
    // const [refresh, setRefresh] = React.useState(false);

    // if(friendEmail != currentFriend){
    //     setCurrentFriend(friendEmail);
    // } else if (shouldRefresh){
    //     if(!refresh){
    //         setRefresh(true);
    //     }
    // }

    // useEffect(() => {
    //     if(friendEmail){
    //         getMessagesWithUser(friendEmail).then(response => {
    //             setMessages(response.data);
    //         });
    //     }
    //     }, [currentFriend]
    // )

    // useEffect(() => {
    //     getMessagesWithUser(friendEmail).then(response => {
    //         setMessages(response.data);
    //     });
    //     }, [refresh]
    // )

    useEffect(() => {
        const chatDetailContainer = document.getElementById("chatDetail");
        if (chatDetailContainer) chatDetailContainer.scrollTo(0, chatDetailContainer.scrollHeight);
    })

    return (
        <div
            className="chatDetail"
            id="chatDetail"
        >
            {
                friendEmail && <Box bgcolor="info.main" borderRadius={10}>
                    <Typography variant="h4" align="center" color="textPrimary">
                        {friend.firstName} {friend.lastName}
                    </Typography>
                </Box>}
            {
                friendEmail && messages.map(message => {
                    const senderName = message.sender.firstName + ' ' + message.sender.lastName;
                    const color = message.sender.email === friendEmail ? 'red' : 'blue';
                    const messageContainer = <Box
                        p={1}
                        borderRadius={10}
                        border={3}
                        borderColor={color}
                    >
                        <Paper
                            variant="outlined"
                            className={classes.paper}
                        >
                            <Typography>
                                <b>{senderName}, <i>{farFromNow(message.sendTime)} ago</i></b>
                            </Typography>
                            <Box pt={1}>
                                <Typography variant="caption">
                                    {message.text}
                                </Typography>
                            </Box>
                        </Paper>
                    </Box>;

                    return (
                        <Box mt={1} key={message.id}>
                            <Grid container >
                                <Grid item md={6} >
                                    {
                                        message.sender.email === friendEmail && messageContainer
                                    }
                                </Grid>
                                <Grid item md={6} >
                                    {
                                        message.receiver.email === friendEmail && messageContainer
                                    }
                                </Grid>
                            </Grid>
                        </Box>
                    );
                })
            }
        </div>
    )
}

export default ChatDetail;