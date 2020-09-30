import React from 'react'

import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import * as Actions from "../../../actions/Actions";
import Page from "../../../common/Page";

import MenuState from "../../../constants/MenuState";

import ProfileNavigation from "./ProfileNavigation";
import Header from "../../../components/Header";
import ProfilePhotos from './ProfilePhotos';
import ProfilePosts from './posts/ProfilePosts';

import ProfileFriends from './friends/ProfileFriends';
import PageProfileState from '../../../constants/PageProfileState';
import ProfileInformation from './info/ProfileInformation';
import ProfileEdit from './edit/ProfileEdit';
import { getUser } from '../../../services/UserService';

class FriendProfile extends Page {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.props.changeFullScreen(true);

        this.state = {
            currentTab: PageProfileState.Info,
            friend: undefined
        };

        this.selectTab = this.selectTab.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;

        const queryParam = this.props.location.search;
        const email = queryParam.slice(7, queryParam.length);

        const friendShip = this.props.friends.filter(f => f.friend.email === email)[0];
        getUser(friendShip.friend.id).then(response => {
            console.log(response);
            this.setState({friend: response.data})
        }
        ).catch(err => {
            console.log(err);
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    selectTab(newTabValue) {
        console.log(newTabValue);
        if (this._isMounted) {
            this.setState({
                currentTab: newTabValue
            });
        }
    }

    isCurrentPath(tab) {
        return this.state.currentTab == tab;
    }

    getContentClass() {

        if (this.props.menu.state === MenuState.SHORT) {
            return 'profile-container short';
        }
        else {
            return 'profile-container';
        }
    }

    render() {

        return (
            <div id='profile-container'>
                <div className='navigation-container'>
                {
                    this.state.friend && 
                        <ProfileNavigation
                            onItemClick={this.selectTab}
                            currentTab={this.state.currentTab}
                            user={this.state.friend}
                            displayLoggedUser={false}
                        />
                }
                </div>
                <div className={this.getContentClass()}>
                {
                    this.state.friend && <Header />
                }
                {
                    this.state.friend && this.state.currentTab === PageProfileState.Info &&
                    <ProfileInformation
                        goToTab={(newTabState) => this.selectTab(newTabState)}
                        user={this.state.friend}
                        displayLoggedUser={false}
                    />
                }
                {
                    this._isMounted && this.state.currentTab === PageProfileState.Friends &&
                    <ProfileFriends 
                        user={this.state.friend} 
                        displayLoggedUser={false}
                    />
                }
                {
                    this.state.currentTab === PageProfileState.Photos && <ProfilePhotos />
                }
                {
                    this.state.currentTab === PageProfileState.Posts && 
                        <ProfilePosts 
                            user={this.state.friend}
                            displayLoggedUser={false}
                        />
                }
                {
                    this._isMounted && this.state.currentTab === PageProfileState.Edit && <ProfileEdit goToTab={(newTabState) => this.selectTab(newTabState)} />
                }
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        changeFullScreen: Actions.changeFullScreen
    }, dispatch);
}

function mapStateToProps({ menuReducers, authReducers, friendsReducers }) {
    return { menu: menuReducers, user: authReducers.user, friends: friendsReducers.friends };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FriendProfile));
