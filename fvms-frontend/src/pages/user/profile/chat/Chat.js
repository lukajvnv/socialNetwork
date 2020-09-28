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
import {getMessages} from "../../../../services/ChatService";
import Grid from '@material-ui/core/Grid';

class Chat extends Page {
    _isMounted = false;

    validationList = {
        text: [{ type: Validators.REQUIRED }],
    };

    constructor(props) {
        super(props);

        this.state = {
            
        }
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

    render() {

        return (
            <div className="chat">
                chat
                <ChatList />
                <ChatDetail/>
            
                <Grid container spacing={2} className="chatBottomHeader">
                    <Grid item md={6} className="chatTest">
                        <ChatNew />
                    </Grid>
                    <Grid item md={6} className="chatTest">
                        <ChatForm/>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        changeFullScreen: Actions.changeFullScreen
    }, dispatch);
}

function mapStateToProps({ menuReducers, authReducers }) {
    return { menu: menuReducers, user: authReducers.user };
}

export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(Chat)));