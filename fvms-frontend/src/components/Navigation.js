import React, { Component } from 'react'
import { bindActionCreators } from "redux";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import MenuState from "../constants/MenuState";
import HomeIcon from '@material-ui/icons/Home';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SendIcon from '@material-ui/icons/Send';
import FacebookIcon from '@material-ui/icons/Facebook';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import { Drawer } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from '@material-ui/icons/Settings';
import PersonIcon from '@material-ui/icons/Person';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

import strings from "../localization";

class Navigation extends Component {

    constructor(props) {
        super(props);

        this.state = {

            submenu: {
                example: false
            }
        };
    }

    getNavigationClass() {

        if (this.props.menu.state === MenuState.SHORT) {
            return 'navigation-content-container short';
        }
        else {
            return 'navigation-content-container'
        }
    }

    isCurrentPath(path) {
        return this.props.history.location.pathname == path;
    }

    toggleSubmenu(key) {

        let submenu = this.state.submenu;

        submenu[key] = !submenu[key];

        this.setState({
            submenu: submenu
        });
    }

    render() {

        return (
            <Drawer variant="permanent" id='navigation'>

                <div className={this.getNavigationClass()}>
                    <div className='logo-container'>
                        <div className='logo'>
                            <Link to={'/'}  >
                                <IconButton>
                                    <FacebookIcon />
                                </IconButton>
                            </Link>
                        </div>
                        <div className='title'>
                            <h2>Social network</h2>
                        </div>
                    </div>
                    <List component="nav">
                        <Link to={'/'} className={this.isCurrentPath('/') ? 'navigation-link active' : 'navigation-link'} >
                            <ListItem className='navigation-item'>

                                <ListItemIcon className='navigation-icon'>
                                    <HomeIcon />
                                </ListItemIcon>

                                <ListItemText inset primary={strings.menu.Home} className='navigation-text' />

                            </ListItem>
                        </Link>
                        <Link to={'/profile'} className={this.isCurrentPath('/profile') ? 'navigation-link active' : 'navigation-link'} >
                            <ListItem className='navigation-item'>

                                <ListItemIcon className='navigation-icon'>
                                    <PersonIcon />
                                </ListItemIcon>

                                <ListItemText inset primary={strings.profile.profile} className='navigation-text' />

                            </ListItem>
                        </Link>
                        <Link to={'/settings'} className={this.isCurrentPath('/settings') ? 'navigation-link active' : 'navigation-link'} >
                            <ListItem className='navigation-item'>

                                <ListItemIcon className='navigation-icon'>
                                    <SettingsIcon />
                                </ListItemIcon>

                                <ListItemText inset primary={strings.profile.settings.title} className='navigation-text' />

                            </ListItem>
                        </Link>
                        <Link to={'/chat'} className={this.isCurrentPath('/chat') ? 'navigation-link active' : 'navigation-link'} >
                            <ListItem className='navigation-item'>

                                <ListItemIcon className='navigation-icon'>
                                    <ChatBubbleIcon />
                                </ListItemIcon>

                                <ListItemText inset primary={strings.chat.title} className='navigation-text' />

                            </ListItem>
                        </Link>
                        <ListItem className='navigation-item' button onClick={() => this.toggleSubmenu('example')} >

                            <ListItemIcon className='navigation-icon'>
                                <AccountBoxIcon />
                            </ListItemIcon>

                            <ListItemText inset primary={strings.profile.other} className='navigation-text' />
                            {this.state.submenu.example ? <ExpandLess className='navigation-icon' /> : <ExpandMore className='navigation-icon' />}
                        </ListItem>
                        <Collapse in={this.state.submenu.example} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding className='submenu'>
                                <Link to={'/'} className={this.isCurrentPath('/') ? 'navigation-link active' : 'navigation-link'} >
                                    <ListItem className='navigation-item'>
                                        <ListItemIcon className='navigation-icon'>
                                            <SendIcon />
                                        </ListItemIcon>
                                        <ListItemText inset primary='Sent mail' className='navigation-text' />
                                    </ListItem>
                                </Link>
                                
                            </List>
                        </Collapse>

                    </List>
                </div>



            </Drawer>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

function mapStateToProps({ menuReducers, authReducers }) {
    return { menu: menuReducers, auth: authReducers };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navigation));