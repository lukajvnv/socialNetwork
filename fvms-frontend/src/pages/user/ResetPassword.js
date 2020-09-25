import React from 'react'

import {bindActionCreators} from "redux";
import * as Actions from "../../actions/Actions";
import {withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import strings from "../../localization";
import Page from "../../common/Page";

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Validators from "../../constants/ValidatorTypes";
import ResetPasswordRequestForm from "../../components/forms/user/ResetPasswordRequestForm";
import {resetPassword, resetPasswordRequest} from "../../services/UserService";
import ResetPasswordForm from "../../components/forms/user/ResetPasswordForm";


class ResetPassword extends Page {

    validationList = {
        password: [ {type: Validators.REQUIRED } ],
        passwordRepeat: [ {type: Validators.REQUIRED } ],
        token: [ {type: Validators.REQUIRED } ]
    };

    params = [{ name: 'token', default: '' }];

    constructor(props) {
        super(props);

        this.state = {
            data: {},
            errors: {},
        };

        this.props.changeFullScreen(true);

        this.keyPress = this.keyPress.bind(this);
    }

    componentDidMount() {

        if(this.props.auth.user) {
            this.props.history.push('/');
        }
    }

    keyPress(event) {

        if(event.key == 'Enter') {
            this.resetPassword()
        }
    }

    passwordMach() {

        return this.state.data.password === this.state.data.passwordRepeat;
    }

    resetPassword() {

        let data = this.state.data;
        data.token = this.state.searchData.token;

        if(!this.validate()) {
            return;
        }

        if(!this.passwordMach()) {

            this.setError('password', strings.registration.passwordDoNotMatch);
            return;
        }

        resetPassword(data).then(response => {

            if(!response.ok) {
                return;
            }

            this.props.history.push('/login');
        });
    }

    render() {

        return (

            <div id='login'>
                <Grid item md={6}>
                    <Paper className='paper'>

                        <h1>{ strings.resetPassword.resetPassword }</h1>

                        <ResetPasswordForm onSubmit={ () => this.resetPassword() } onChange={ this.changeData }
                                                  keyPress={ this.keyPress }
                                                  data={ this.state.data } errors={ this.state.errors }/>
                    </Paper>
                </Grid>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        changeFullScreen: Actions.changeFullScreen,
        login: Actions.login
    }, dispatch);
}

function mapStateToProps({ menuReducers, authReducers })
{
    return { menu: menuReducers, auth: authReducers };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ResetPassword));