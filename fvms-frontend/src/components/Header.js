import React, { Component } from 'react'
import { Link, withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as Actions from "../actions/Actions";

import connect from "react-redux/es/connect/connect";
import IconButton from '@material-ui/core/IconButton';

import MoreVert from '@material-ui/icons/MoreVert';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LockIcon from '@material-ui/icons/Lock';

import MenuState from "../constants/MenuState";
import { ListItemIcon, ListItemText, Menu, MenuItem } from "@material-ui/core";
import strings from "../localization";
import { lock, logout } from "../base/OAuth";

import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import Badge from '@material-ui/core/Badge';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import SettingsIcon from '@material-ui/icons/Settings';
import HomeIcon from '@material-ui/icons/Home';
import SockJsClient from 'react-stomp';

class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            anchorEl: null,
        }
    }

    /** HANDLERS **/

    handleMenuClick(event) {
        this.setState({ anchorEl: event.currentTarget });
    }

    handleMenuClose() {
        this.setState({ anchorEl: null });
    }

    logout() {
        logout();
        this.props.logout();
        this.props.history.push('/login');
    }

    lock() {
        lock();
        this.props.history.push('/');
    }

    getHeaderClass() {

        if (this.props.menu.state === MenuState.SHORT) {
            return 'short';
        }
        else {
            return '';
        }
    }

    messageReceiver(msg){
        const senderEmail = msg.sender.email;
        const receiverEmail = msg.receiver.email;
        if( receiverEmail === this.props.user.email){
            console.log(msg);
            if(!this.props.chat.chatOpened){
                const chatCounter = this.props.chat.counter + 1;
                // this.setState({chatCounter: chatCounter});
                this.props.chatSetNewCounterValue(chatCounter);
            }
        }
    }

    render() {

        return (
            <div id='header' className={this.getHeaderClass()}>
                <div className='left'>
                    {
                        this.props.menu.state === MenuState.FULL &&
                        <IconButton size='small' onClick={() => this.props.changeMenuState(MenuState.SHORT)}>
                            <MoreVert />
                        </IconButton>
                    }
                    {
                        this.props.menu.state === MenuState.SHORT &&
                        <IconButton size='small' onClick={() => this.props.changeMenuState(MenuState.FULL)}>
                            <MenuIcon />
                        </IconButton>
                    }
                </div>
                <div className='right'>
                    <Link to={"/"} >
                        <Tooltip title={strings.menu.Home} aria-label="add" arrow>
                            <IconButton color="primary">
                                <HomeIcon />
                            </IconButton>
                        </Tooltip>
                    </Link>
                    <Tooltip title="Add" aria-label="add" arrow>
                        <IconButton color="primary">
                            <AddIcon />
                        </IconButton>
                    </Tooltip>
                    <Link to={"/profile"} >
                        <IconButton color="primary">
                            {strings.profile.profile}<PersonIcon />
                        </IconButton>
                    </Link>
                    <Link to={"/chat"} >
                        <Badge badgeContent={this.props.chat.counter} color="primary">
                            <IconButton color="primary">
                                <ChatBubbleIcon />
                            </IconButton>
                        </Badge>
                    </Link>
                    <Link to={"/settings"} >
                        <Tooltip title={strings.profile.settings.title} aria-label="add" arrow>
                            <IconButton color="primary">
                                <SettingsIcon />
                            </IconButton>
                        </Tooltip>
                    </Link>

                    {/* <Badge badgeContent={4} color="primary" variant="dot">
                        <IconButton color="primary">
                            <NotificationsIcon />
                        </IconButton>
                    </Badge> */}

                    <IconButton
                        size="small"
                        color="primary"
                        aria-owns={this.state.anchorEl ? 'person-menu' : undefined}
                        aria-haspopup="true"
                        onClick={(event) => this.handleMenuClick(event)}
                    >
                        <ArrowDropDownIcon />
                    </IconButton>
                    <Menu
                        id='person-menu'
                        anchorEl={this.state.anchorEl}
                        open={Boolean(this.state.anchorEl)}
                        onClose={() => this.handleMenuClose()}
                    >

                        {/* <MenuItem onClick={() => this.lock()}>
                            <ListItemIcon>
                                <LockIcon />
                            </ListItemIcon>
                            <ListItemText inset primary={strings.header.lock} />
                        </MenuItem> */}
                        <MenuItem onClick={() => this.logout()}>
                            <ListItemIcon>
                                <ExitToAppIcon />
                            </ListItemIcon>
                            <ListItemText inset primary={strings.header.logout} />
                        </MenuItem>
                    </Menu>
                    <SockJsClient url='http://localhost:8081/websocket-chat/'
                              topics={['/topic/user']}
                              onConnect={() => {
                                  console.log("connected");
                              }}
                              onDisconnect={() => {
                                  console.log("Disconnected");
                              }}
                            //   onMessage={(msg) => {
                            //       var jobs = this.state.messages;
                            //       jobs.push(msg);
                            //       this.setState({messages: jobs});
                            //       console.log(this.state);
                            //   }}
                            onMessage={(msg) => this.messageReceiver(msg)}
                              ref={(client) => {
                                  this.clientRef = client
                              }}/>
                </div>
            </div>

        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        changeMenuState: Actions.changeMenuState,
        logout: Actions.logout,
        chatSetNewCounterValue: Actions.chatSetNewCounterValue
    }, dispatch);
}

function mapStateToProps({ menuReducers, authReducers, chatReducers }) {
    return { menu: menuReducers, user: authReducers.user, chat: chatReducers };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));