import React from 'react'

import {bindActionCreators} from "redux";
import * as Actions from "../../actions/Actions";
import {withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import strings from "../../localization";
import Page from "../../common/Page";

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import SignUpForm from "../../components/forms/user/SignUpForm";
import Validators from "../../constants/ValidatorTypes";
import {login} from "../../base/OAuth";
import {signUp} from "../../services/UserService";
import {stringToDate} from '../../util/DateUtil';

class SignUp extends Page {

    validationList = {
        email: [ {type: Validators.EMAIL } ],
        password: [ {type: Validators.REQUIRED } ],
        firstName: [ {type: Validators.REQUIRED } ],
        lastName: [ {type: Validators.REQUIRED } ],
    };

    constructor(props) {
        super(props);

        this.state = {
            data: {},
            errors: {},
            redirectUrl: props.location.state ? props.location.state.redirectUrl : '/login'
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

        if(event.key === 'Enter') {
            this.signUp()
        }
    }

    signUp() {
        if(!this.validate()) {
            return;
        }

        signUp(this.state.data).then(response => {
            console.log(response);

            this.props.history.push({
                pathname: this.state.redirectUrl
            });
        })
        .catch(err => {
            console.log(err);
        });
    }

    render() {

        return (

            <div id='login'>
                <Grid item md={6}>
                    <Paper className='paper'>

                        <h1>{ strings.signUp.signUp }</h1>

                        <SignUpForm 
                          onSubmit={ () => this.signUp() } 
                          onChange={ this.changeData }
                          onChangeButtonGroup={ this.changeButtonGroup }
                          keyPress={ this.keyPress }
                          data={ this.state.data } 
                          errors={ this.state.errors } 
                        />
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
    }, dispatch);
}

function mapStateToProps({ menuReducers, authReducers })
{
    return { menu: menuReducers, auth: authReducers };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp));