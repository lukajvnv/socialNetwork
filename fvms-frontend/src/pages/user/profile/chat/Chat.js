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
import SockJsClient from 'react-stomp';

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
        this.sendMessage = this.sendMessage.bind(this);

        this.props.chatSetNewCounterValue(0);
    }

    componentDidMount() {
        this._isMounted = true;
        this.fetchData(this._isMounted);
    }

    componentWillUnmount() {
        this._isMounted = false;
        this.props.chatSetChatOpenedValue(false);
    }

    sendMessage = () => {
        this.clientRef.sendMessage('/app/user-all', JSON.stringify({
            name: this.props.user.firstName,
            message: 'New message'
        }));
    };

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

    messageReceiver(msg){
        const senderEmail = msg.sender.email;
        const receiverEmail = msg.receiver.email;
        if(this.state.activeFriend){
            if(senderEmail === this.state.activeFriend.email && receiverEmail === this.props.user.email){
                // console.log(msg);
    
                // let messages = this.state.userMessages;
                // messages.push(msg);
                // this.setState({userMessages: messages});

                this.setActiveChat(this.state.activeFriend.email);
            }
        }
        
    }

    compo

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
                            websocketClient={this.clientRef}
                        />
                    </Grid>
                </Grid>
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
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        changeFullScreen: Actions.changeFullScreen,
        chatSetNewCounterValue: Actions.chatSetNewCounterValue,
        chatSetChatOpenedValue: Actions.chatSetChatOpenedValue
    }, dispatch);
}

function mapStateToProps({ menuReducers, authReducers, friendsReducers }) {
    return { menu: menuReducers, user: authReducers.user, friends: friendsReducers.friends };
}

export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(Chat)));