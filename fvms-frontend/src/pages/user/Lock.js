import React from 'react'
import Page from "../../common/Page";
import Validators from "../../constants/ValidatorTypes";
import {bindActionCreators} from "redux";
import * as Actions from "../../actions/Actions";
import {withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import strings from "../../localization";
import {Paper, Grid} from "@material-ui/core";
import LockForm from "../../components/forms/user/LockForm";
import {login, unlock} from "../../base/OAuth";

class Lock extends Page {

    validationList = {
        password: [ {type: Validators.REQUIRED } ]
    };

    constructor(props) {
        super(props);

        this.props.changeFullScreen(true);
    }

    unlock() {

        if(!this.validate()) {
            return;
        }

        unlock(this.state.data.email, this.state.data.password).then(response => {

            if(!response.ok) {

                this.setError('password', strings.lock.wrongCredentials);
                return;
            }

            this.props.history.push({
                pathname: this.state.redirectUrl
            })
        });
    }

    render() {

        return (
            <div id='lock'>
                <Grid item md={6}>
                    <Paper className='paper'>

                        <h1>{ strings.lock.login }</h1>

                        <LockForm onSubmit={ () => this.unlock() } onChange={ this.changeData }
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
        changeFullScreen: Actions.changeFullScreen
    }, dispatch);
}

function mapStateToProps({ menuReducers, authReducers })
{
    return { menu: menuReducers, auth: authReducers };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Lock));