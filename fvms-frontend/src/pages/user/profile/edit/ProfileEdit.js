import React from 'react'

import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import connect from "react-redux/es/connect/connect";

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import * as Actions from "../../../../actions/Actions";
import Page from "../../../../common/Page";
import { updateUser } from "../../../../services/UserService";
import EditProfileForm from "../../../../components/forms/user/EditProfileForm";
import strings from "../../../../localization";
import Validators from "../../../../constants/ValidatorTypes";
import { updateUserData } from "../../../../base/OAuth";

import PageProfileState from '../../../../constants/PageProfileState';
import {getUserAttributeDataSource} from '../../../../services/UserService';

class ProfileEdit extends Page {
    _isMounted = false;

    validationList = {
        firstName: [{ type: Validators.REQUIRED }],
        lastName: [{ type: Validators.REQUIRED }],
    };

    constructor(props) {
        super(props);

        // this.props.changeFullScreen(true);

        this.state = {
            data: props.user,
            errors: {},
            redirectUrl: '',
            attributeDataSource: []
        }

        this.keyPress = this.keyPress.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        this.fetchAttributeDataSource();
    }

    fetchAttributeDataSource(mountStatus = true) {
        getUserAttributeDataSource().then(response => {
            console.log(response);
            if(mountStatus){
                this.setState({attributeDataSource: response.data});
            }
        }
        ).catch(err => {
            console.log(err);
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    keyPress(event) {

        if (event.key == 'Enter') {
            this.profileEditSubmit()
        }
    }

    profileEditSubmit() {
        if (!this.validate()) {
            return;
        }

        updateUser(this.state.data).then(response => {
            console.log(response);

            // this.props.history.push({
            //     pathname: this.state.redirectUrl
            // });

            updateUserData(response.data);
            this.props.loadUser(response.data);
            this.props.goToTab(PageProfileState.Info);
        })
        .catch(err => {
                console.log(err);
        });
    }

    render() {

        return (
            <div id='editProfile'>
                <Grid item md={6}>
                    <Paper className='paper'>

                        <h1>{strings.profile.edit}</h1>

                        <EditProfileForm
                            onSubmit={() => this.profileEditSubmit()}
                            onChange={this.changeData}
                            onChangeButtonGroup={this.changeButtonGroup}
                            keyPress={this.keyPress}
                            data={this.state.data}
                            errors={this.state.errors}
                            usersAttributesDataSource={this.state.attributeDataSource}
                        />
                    </Paper>
                </Grid>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        changeFullScreen: Actions.changeFullScreen,
        loadUser: Actions.loadUser
    }, dispatch);
}

function mapStateToProps({ menuReducers, authReducers }) {
    return { menu: menuReducers, user: authReducers.user };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileEdit));
