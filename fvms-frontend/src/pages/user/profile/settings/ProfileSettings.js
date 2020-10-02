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
import { getUserSettingDataSource } from '../../../../services/UserService';
import Switch from '@material-ui/core/Switch';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';


class ProfileSettings extends Page {
    _isMounted = false;

    validationList = {

    };

    constructor(props) {
        super(props);

        this.props.changeFullScreen(false);

        this.state = {
            data: props.user,
            errors: {},
            redirectUrl: '',
            settingDataSource: [],
            usersSettings: []
        }

        this.keyPress = this.keyPress.bind(this);
        this.onChangeValue = this.onChangeValue.bind(this);
        this.onSwitchChangeValue = this.onSwitchChangeValue.bind(this);
        this.settingsSubmit = this.settingsSubmit.bind(this);

    }

    componentDidMount() {
        this._isMounted = true;
        this.fetchSettingDataSource();
    }

    fetchSettingDataSource(mountStatus = true) {
        if (this.state.data.usersSettings.length > 0) {
            let userSettings = this.state.data.usersSettings;
            this.setState({ usersSettings: userSettings });
            return;
        }

        getUserSettingDataSource().then(response => {
            console.log(response);
            if (mountStatus) {
                let userSettings = response.data.map((s, index) => {
                    let val = '';
                    if(s.type === 'string' && s.values.length > 0){
                        val = s.values[0].value;
                    }
                    if(s.type === 'boolean'){
                        val = 'false';
                    }
                    return {
                        setting: s,
                        value: val,
                        id: index
                    }
                })
                this.setState({
                    settingDataSource: response.data,
                    usersSettings: userSettings
                });
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
            this.settingsSubmit()
        }
    }

    onChangeValue(event) {
        console.log('usao');
        const settingIndex = event.target.name;
        const settingValue = event.target.value;
        const settings = this.state.usersSettings;
        settings[settingIndex].value = settingValue;
        this.setState({ usersSettings: settings });
    }

    onSwitchChangeValue(event) {
        const settingIndex = event.target.name;
        const settingValue = event.target.checked;
        const settings = this.state.usersSettings;
        settings[settingIndex].value = settingValue ? 'true' : 'false';
        this.setState({ usersSettings: settings });
    }

    settingsSubmit() {
        if (!this.validate()) {
            return;
        }

        this.state.data.usersSettings = this.state.usersSettings;

        updateUser(this.state.data).then(response => {
            console.log(response);

            updateUserData(response.data);
            this.props.loadUser(response.data);
            this.props.history.goBack();

        }).catch(err => {
                console.log(err);
        });
    }

    render() {

        return (
            <div className="mediaContainer">
                <Paper className='paper'>
                    <h1>{strings.profile.settings.title}</h1>
                    <Grid container spacing={2}>

                        {
                            this.state.usersSettings
                                .map((userSetting, index) => {
                                    const setting = userSetting.setting;
                                    let field;
                                    if (setting.type === 'boolean') {
                                        field = <Switch
                                                    checked={userSetting.value === 'true' ? true : false}
                                                    onChange={this.onSwitchChangeValue}
                                                    color="primary"
                                                    name={index}
                                                />
                                    } else if (setting.type === 'string') {
                                        if (setting.values.length > 0) {
                                            field =
                                                <FormControl className="formControl">
                                                    <InputLabel id={setting.name}>{setting.name}</InputLabel>
                                                    <Select
                                                        labelId={setting.name}
                                                        onChange={this.onChangeValue}
                                                        value={userSetting.value}
                                                        native
                                                        inputProps={{
                                                            name: index,
                                                        }}
                                                    >
                                                        <option aria-label="None" value="" />
                                                        {
                                                            setting.values.map((settingValue, index) => (
                                                                <option key={index} value={settingValue.value}>{settingValue.value}</option>
                                                            ))
                                                        }
                                                    </Select>
                                                </FormControl>
                                        } else {
                                            field = <TextField
                                                fullWidth
                                                value={userSetting.value}
                                                autoFocus
                                                name={index}
                                                onChange={this.onChangeValue}
                                                onKeyPress={this.keyPress}
                                                margin="normal"
                                            />
                                        }
                                    } else {
                                        field = <TextField
                                                fullWidth
                                                value={userSetting.value}
                                                autoFocus
                                                name={index}
                                                onChange={this.onChangeValue}
                                                onKeyPress={this.keyPress}
                                                margin="normal"
                                            />
                                    }

                                    return (
                                        <Grid item xs={12} md={12} key={setting.id}>
                                            <Paper className='paper'>
                                                <Grid container>
                                                    <Grid item xs={12} md={6}>
                                                        {setting.name}
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        {field}
                                                    </Grid>
                                                </Grid>
                                            </Paper>
                                        </Grid>
                                    )
                                })
                        }

                        <Grid item xs={12} md={12}>
                            <Paper className='paper'>
                                <Grid container>
                                    <Grid item xs={12} md={6}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={this.settingsSubmit}
                                            onKeyPress={this.keyPress}
                                        >
                                            {strings.profile.settings.submit}
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12} md={6}>

                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>

                    </Grid>
                </Paper>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileSettings));
