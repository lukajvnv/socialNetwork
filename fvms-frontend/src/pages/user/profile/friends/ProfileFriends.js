import React, { Component } from 'react'

import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import { withRouter } from "react-router-dom";


import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import InfoIcon from '@material-ui/icons/Info';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import * as Actions from "../../../../actions/Actions";
import FriendDetail from "./FriendDetail";
import strings from "../../../../localization";
import Avatar from '@material-ui/core/Avatar';
import PageFriendsState from "./PageFriendsState";

import FriendActionTypes from "../../../../constants/FriendActionTypes";

import { friends, allFriendships, suggestions, updateFriendship, makeFriendsList } from "../../../../services/FriendShipService";

class ProfileFriends extends Component {
    _isMounted = false;

    friendDecision = {
        Accept: 'ACCEPTED',
        Decline: 'REJECTED',
        Send: 'PENDING'
    }

    emptyListMessage = {
        Friends: strings.profile.friend.emptyListMessage.Friends,
        New: strings.profile.friend.emptyListMessage.New,
        Request: strings.profile.friend.emptyListMessage.Request
    }

    friendStatusTitle = {
        Friends: strings.profile.friend.view,
        New: strings.profile.friend.new,
        Request: strings.profile.friend.request
    }

    constructor(props) {
        super(props);

        // this.props.changeFullScreen(true);
        this.state = {
            friends: [],
            pageFriendsState: PageFriendsState.Friends
        }

        this.onProfileFriendsStateChanged = this.onProfileFriendsStateChanged.bind(this);
        this.updateFriendship = this.updateFriendship.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        this.fetchData(this.state.pageFriendsState);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    onProfileFriendsStateChanged(newState) {
        // this.setState({ pageFriendsState: newState });
        this.fetchData(newState);
    }

    updateFriendship(action, friendshipId, friend) {
        let friendship;

        if (action == FriendActionTypes.View) {
            this.props.history.push({
                pathname: '/friend',
                search: `email=${friend.email}`
           });
           return;
        }

        if (action == FriendActionTypes.Delete) {
            return;
        }

        if (action == FriendActionTypes.Accept || action == FriendActionTypes.Decline) {
            const decision = this.friendDecision[action];
            friendship = {
                id: friendshipId,
                status: decision
            }
        }

        if (action == FriendActionTypes.Send) {
            const decision = this.friendDecision[action];
            friendship = {
                id: friendshipId,
                status: decision,
                receiver: friend,
                sender: this.props.user
            }
        }

        updateFriendship(friendship).then(response => {
            console.log(response);
            this.fetchData(this.state.pageFriendsState);
        }
        ).catch(err => {
            console.log(err);
        });

    }

    fetchData(friendPageState, mountStatus = true) {
        switch (friendPageState) {
            case PageFriendsState.New:
                suggestions().then(response => {
                    console.log(response);
                    const suggestions = [];
                    for (let friendship of response.data) {
                        suggestions.push({ friend: friendship, id: undefined });
                    }
                    if (mountStatus) {
                        this.setState({ friends: suggestions, pageFriendsState: friendPageState });
                    }
                }
                ).catch(err => {
                    console.log(err);
                });
                break;
            case PageFriendsState.Request:
                allFriendships().then(response => {
                    console.log(response);
                    const friends = [];
                    let user = this.props.user.email;
                    const friendsRequests = response.data.filter(f => f.status == 'PENDING');
                    for (let friendship of friendsRequests) {
                        let friend;
                        // get only friend request for me
                        if (user == friendship.receiver.email) {
                            friend = friendship.sender;
                            friends.push({ friend: friend, id: friendship.id });
                        }
                    }
                    if (mountStatus) {
                        this.setState({ friends, pageFriendsState: friendPageState });
                    }
                }
                ).catch(err => {
                    console.log(err);
                });
                break;
            case PageFriendsState.Friends:
            default:
                const friendEmail = this.props.displayLoggedUser ? '' : this.props.user.email;
                friends(friendEmail).then(response => {
                    console.log(response);
                    let user = this.props.user.email;
                    const refreshUserFriends = this.props.displayLoggedUser ? true : false;
                    const friends = makeFriendsList(response.data, user, refreshUserFriends);
                    if (mountStatus) {
                        this.setState({ friends: friends, pageFriendsState: friendPageState });
                        if(refreshUserFriends){
                            this.getFriends(response.data);
                        }
                    }
                }
                ).catch(err => {
                    console.log(err);
                });
        }
    }

    render() {
        const friendHeaderTitle = this.props.user.firstName + '\'s friends';
        return (
            <div>
                {
                    this.props.displayLoggedUser &&
                    <Box mt={2}>
                        <Card className="mediaContainer">
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    {strings.profile.friends}
                                </Typography>
                            </CardContent>
                                <CardActions>
                                    <IconButton size="small" color="primary"
                                        onClick={() => this.onProfileFriendsStateChanged(PageFriendsState.Friends)}
                                    >
                                        <InfoIcon />{strings.profile.friend.view}
                                    </IconButton>
                                    <IconButton size="small" color="primary"
                                        onClick={() => this.onProfileFriendsStateChanged(PageFriendsState.New)}
                                    >
                                        <SearchIcon />{strings.profile.friend.new}
                                    </IconButton>
                                    <IconButton size="small" color="primary"
                                        onClick={() => this.onProfileFriendsStateChanged(PageFriendsState.Request)}
                                    >
                                        <EmojiPeopleIcon />{strings.profile.friend.request}
                                    </IconButton>
                                </CardActions>
                            </Card>
                    </Box>
                }
                <Box mt={2}>
                    <Card className="mediaContainer">
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                {this.props.displayLoggedUser && this.friendStatusTitle[this.state.pageFriendsState]}
                                {!this.props.displayLoggedUser && friendHeaderTitle}
                            </Typography>
                            <Grid container spacing={1} >
                                {
                                    this.state.friends.length > 0 &&
                                    this.state.friends.map((friendship) => (
                                        <FriendDetail
                                            key={friendship.friend.id}
                                            friendPageState={this.state.pageFriendsState}
                                            friend={friendship.friend}
                                            friendshipId={friendship.id}
                                            updateFriendship={(action) => this.updateFriendship(action, friendship.id, friendship.friend)}
                                            displayLoggedUser={this.props.displayLoggedUser}
                                        />
                                    ))
                                }
                                {
                                    this.state.friends.length == 0 &&
                                    <h5>{this.emptyListMessage[this.state.pageFriendsState]}</h5>
                                }
                            </Grid>
                        </CardContent>
                    </Card>
                </Box>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        changeFullScreen: Actions.changeFullScreen,
        getFriends: Actions.fetchFriends
    }, dispatch);
}

function mapStateToProps({ menuReducers }) {
    return { menu: menuReducers};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileFriends));

// export default ProfileFriends;