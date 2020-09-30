import React from 'react'

import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import * as Actions from "../../../../actions/Actions";
import Page from "../../../../common/Page";
import { withSnackbar } from "notistack";
import Validators from "../../../../constants/ValidatorTypes";
import ChatList from "./ChatList";
import ChatNew from "./ChatNew";
import ChatForm from "./ChatForm";
import ChatDetail from "./ChatDetail";
import { getMessages, getMessagesWithUser } from "../../../../services/ChatService";
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import MenuState from "../../../../constants/MenuState";

class Chat extends Page {
    _isMounted = false;

    validationList = {
        text: [{ type: Validators.REQUIRED }],
    };

    constructor(props) {
        super(props);

        this.state = {
            messages: [],
            activeChatEmail: undefined,
            activeFriend: undefined,
            userMessages: []
        }

        this.props.changeFullScreen(false);
    }

    componentDidMount() {
        this._isMounted = true;
        this.fetchData(this._isMounted);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    // refreshView() {
    //     this.setState(this.getInitialState());
    //     this.fetchData(this._isMounted);
    // }

    fetchData(mountStatus = true) {
        if (mountStatus) {
            getMessages().then(response => {
                console.log(response);
                this.setState({ messages: response.data })
            }
            ).catch(err => {
                console.log(err);
            });
        }
    }

    postSubmit() {
        if (!this.validate()) {
            return;
        }

    }

    getNavigationClass() {
        if (this.props.menu.state === MenuState.SHORT) {
            return 'navigation-content-container short';
        }
        else {
            return 'navigation-content-container'
        }
    }

    setActiveChat(tab) {
        const friendShip = this.props.friends.filter(f => f.friend.email === tab)[0];
        if (friendShip) {
            getMessagesWithUser(tab).then(response => {
                this.setState({
                    activeChatEmail: tab,
                    activeFriend: friendShip.friend,
                    userMessages: response.data
                });
            });
            this.fetchData();
        }
    }

    render() {
        const friendsList = this.props.friends.map(f => { return f.friend; }
        );

        return (
            <div className="chat">
                <Grid container spacing={2} >
                    <Grid item md={3} className="chatList" id='chatList-navigation'>
                        <ChatList
                            menu={this.props.menu}
                            messages={this.state.messages}
                            user={this.props.user}
                            setNewActiveChat={(val) => this.setActiveChat(val)}
                        />
                    </Grid>
                    <Divider orientation="vertical" flexItem variant="fullWidth" />
                    <Grid
                        item md={8}
                    >
                        <ChatDetail
                            friendEmail={this.state.activeChatEmail}
                            messages={this.state.userMessages}
                            friend={this.state.activeFriend}
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={2} className="chatBottomHeader">
                    <Grid item md={3} >
                        <ChatNew
                            friendsList={friendsList}
                            setNewActiveChat={(val) => this.setActiveChat(val)}
                        />
                    </Grid>
                    <Divider orientation="vertical" flexItem variant="fullWidth" />
                    <Grid item md={8} >
                        <ChatForm
                            user={this.props.user}
                            friend={this.state.activeFriend}
                            setNewActiveChat={(val) => this.setActiveChat(val)}
                        />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        changeFullScreen: Actions.changeFullScreen,
    }, dispatch);
}

function mapStateToProps({ menuReducers, authReducers, friendsReducers }) {
    return { menu: menuReducers, user: authReducers.user, friends: friendsReducers.friends };
}

export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(Chat)));