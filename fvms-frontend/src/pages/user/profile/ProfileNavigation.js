import React, { Component } from 'react'
import { bindActionCreators } from "redux";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import MenuState from "../../../constants/MenuState";

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
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';

import IconButton from "@material-ui/core/IconButton";
import strings from "../../../localization";

import InfoIcon from '@material-ui/icons/Info';
import PeopleIcon from '@material-ui/icons/People';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import NoteIcon from '@material-ui/icons/Note';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import EditIcon from '@material-ui/icons/Edit';
import PageProfileState from '../../../constants/PageProfileState';
import SettingsIcon from '@material-ui/icons/Settings';

class ProfileNavigation extends Component {

    simpleUserNavItems = [
        PageProfileState.Info,
        PageProfileState.Friends,
        // PageProfileState.Photos,
        PageProfileState.Posts,
        PageProfileState.Edit
    ];

    simpleFriendNavItems = [
        PageProfileState.Info,
        PageProfileState.Friends,
        PageProfileState.Posts,
    ];

    constructor(props) {
        super(props);

        this.state = {

            submenu: {
                example: false
            },
            currentTab: ''
        };

        // this.selectTab = this.selectTab.bind(this);
    }

    getNavigationClass() {

        if (this.props.menu.state === MenuState.SHORT) {
            return 'navigation-content-container short';
        }
        else {
            return 'navigation-content-container'
        }
    }

    isCurrentPath(tab) {
        return this.props.currentTab == tab;
    }

    toggleSubmenu(key) {

        let submenu = this.state.submenu;

        submenu[key] = !submenu[key];

        this.setState({
            submenu: submenu
        });
    }

    renderSimpleNavItem(profileAction) {
        let actionIcon;
        switch (profileAction) {
            case PageProfileState.Info:
                actionIcon = <InfoIcon />;
                break;
            case PageProfileState.Friends:
                actionIcon = <PeopleIcon />;
                break;
            case PageProfileState.Photos:
                actionIcon = <PhotoLibraryIcon />;
                break;
            case PageProfileState.Posts:
                actionIcon = <NoteIcon />;
                break;
            case PageProfileState.Edit:
                actionIcon = <EditIcon />;
                break;
            default:
                actionIcon = <InfoIcon />;
        }
        return (
            <ListItem key={profileAction} button onClick={() => this.props.onItemClick(profileAction)}
                className={this.isCurrentPath(profileAction) ? 'navigation-link active navigation-item' : 'navigation-link navigation-item'}

            >
                <ListItemIcon className='navigation-icon'>
                    {actionIcon}
                </ListItemIcon>

                <ListItemText inset primary={strings.profile.navigation.text[profileAction]} className='navigation-text' />
            </ListItem>
        )
            ;
    }

    render() {
        const simpleNavItems = this.props.displayLoggedUser? this.simpleUserNavItems : this.simpleFriendNavItems;

        return (
            <Drawer variant="permanent" id='profile-navigation'>
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
                            <h2>{this.props.user.firstName} {this.props.user.lastName}</h2>
                        </div>
                    </div>
                    <List component="nav">
                        {
                            simpleNavItems
                                .map((data) => {
                                    return (
                                        this.renderSimpleNavItem(data)
                                    );
                                }
                        )} 
                        {
                            this.props.displayLoggedUser && 
                            <ListItem className='navigation-item' button onClick={() => this.toggleSubmenu('example')} >
                                <ListItemIcon className='navigation-icon'>
                                    <AccountBoxIcon />
                                </ListItemIcon>

                                <ListItemText inset primary={strings.profile.other} className='navigation-text' />
                                {this.state.submenu.example ? <ExpandLess className='navigation-icon' /> : <ExpandMore className='navigation-icon' />}
                            </ListItem>
                        }
                        <Collapse in={this.state.submenu.example} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding className='submenu'>
                                <Link to={'/settings'} >
                                    <ListItem className='navigation-item'>
                                        <ListItemIcon className='navigation-icon'>
                                            <SettingsIcon />
                                        </ListItemIcon>
                                        <ListItemText inset primary={strings.profile.settings.title} className='navigation-text' />
                                    </ListItem>
                                </Link>
                                <Link to={'/chat'}>
                                    <ListItem className='navigation-item'>
                                        <ListItemIcon className='navigation-icon'>
                                            <ChatBubbleIcon />
                                        </ListItemIcon>
                                        <ListItemText inset primary={strings.chat.title} className='navigation-text' />
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
    return { menu: menuReducers };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileNavigation));