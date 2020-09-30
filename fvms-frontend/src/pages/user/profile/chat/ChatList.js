import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import SendIcon from '@material-ui/icons/Send';
import Avatar from '@material-ui/core/Avatar';
import MenuState from "../../../../constants/MenuState";
import CONFIG from '../../../../config';

const ChatList = ({
    menu,
    messages,
    user,
    setNewActiveChat
}) => {

    const [activeChat, setActiveChat] = React.useState('');

    const getNavigationClass = () => {

        if (menu.state === MenuState.SHORT) {
            return 'navigation-content-container short';
        }
        else {
            return 'navigation-content-container';
        }
    }

    const setNewChat = (val) => {
        setActiveChat(val);
        setNewActiveChat(val);
    }

    const isCurrentPath = (tab) => {
        return activeChat == tab;
    }

    return (
        <div
            className={getNavigationClass()}
        >
            <List component="nav" >
                {
                    messages.map(userMessage => {
                        let friend;
                        if (user.id === userMessage.sender.id) {
                            friend = userMessage.receiver;
                        } else {
                            friend = userMessage.sender;
                        }
                        const friendName = friend.firstName + ' ' + friend.lastName;

                        const profileImageName = friend.urlProfile;
                        const profileImageSrc = profileImageName ? CONFIG.imageUrlRegistry + profileImageName : '...';

                        return (
                            <ListItem
                                key={userMessage.id}
                                className='navigation-item'
                                onClick={() => setNewChat(friend.email)}
                                className={isCurrentPath(friend.email) ? 'navigation-link active navigation-item' : 'navigation-link navigation-item'}
                            >
                                <ListItemAvatar className='navigation-icon'>
                                    <Avatar alt={friendName} src={profileImageSrc} />
                                </ListItemAvatar>
                                <ListItemText primary={friendName} secondary={userMessage.text} className='navigation-text' />
                            </ListItem>
                        )
                    })
                }
            </List>
        </div>

    )
}

export default ChatList;