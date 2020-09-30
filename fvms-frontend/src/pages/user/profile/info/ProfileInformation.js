import React, { Component } from 'react'

import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import ProfileInformationAttributes from "./ProfileInformationAttributes";

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import PhotoIcon from '@material-ui/icons/Photo';
import Button from '@material-ui/core/Button';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import Popper from '@material-ui/core/Popper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import noImage from '../../../../assets/no_image.jpg';
import * as Actions from "../../../../actions/Actions";
import strings from "../../../../localization";
import ImageLoader from '../../../../components/ImageLoader';
import { reformatDate, splitDatePartFromString } from '../../../../util/DateUtil';
import PageProfileState from '../../../../constants/PageProfileState';
import FileFormat from '../../../../constants/FileFormat';
import {uploadImage} from '../../../../services/ResourceSevice';
import {withSnackbar} from "notistack";
import CONFIG from '../../../../config';
import { updateUserData } from "../../../../base/OAuth";
import { updateUser } from "../../../../services/UserService";

import axios, { post } from 'axios';

class ProfileInformation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            imageAnchorEl: undefined,
            imageSrc: this.props.user.urlProfile
        }

        this.viewImage = this.viewImage.bind(this);
        this.onFileUpload = this.onFileUpload.bind(this);

    }

    viewImage(event) {
        const imageAnchorElVar = this.state.imageAnchorEl;
        this.setState({
            imageAnchorEl: imageAnchorElVar ? undefined : event.currentTarget
        });
    }

    onFileUpload(event){
        console.log(event);

        let fileList = event.target.files;
        let file = fileList.item(0);
    
        let formData = new FormData(); 
        formData.append('file', file, file.name); 
        const fileType = file.type;
        if(fileType !== FileFormat.jpg && fileType !== FileFormat.png){
            this.props.enqueueSnackbar(strings.profile.form.imageError, {variant: 'error'});
            return;
        }

        console.log(formData);

        uploadImage(formData).then(response => {
            console.log(response);

            this.props.user.urlProfile = file.name;
            this.setState({imageSrc: this.props.user.urlProfile})

            updateUser(this.props.user).then(response => {
                console.log(response);
    
                updateUserData(response.data);
                this.props.loadUser(response.data);
            }).catch(err => {
                    console.log(err);
            });
        }
        ).catch(err => {
            console.log(err);
        });
    }

    getUserSetting(settingId){
        const setting = this.props.user.usersSettings.filter(uS => uS.setting.id === settingId)[0];
        const settingValue = false;
        if(setting){
            if(setting.value === 'true'){
                return true;
            }
        }
        return settingValue;
    }

    render() {
        const open = Boolean(this.state.imageAnchorEl);
        const id = open ? 'simple-popper' : undefined;

        const imageName = this.state.imageSrc;
        const imageSrc =  imageName ? CONFIG.imageUrlRegistry + imageName : noImage;

        let showBirthday = true;
        let showAddress = true;

        if(!this.props.displayLoggedUser) {
            showBirthday = this.getUserSetting(2);
            showAddress = this.getUserSetting(3);
        }

        return (
            <div >
                <Card className="mediaContainer">
                    <CardActionArea>
                        <CardMedia
                            className="media"
                            image={imageSrc}
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                {this.props.user.firstName} {this.props.user.lastName}
                            </Typography>
                            <Typography gutterBottom variant="subtitle2" component="h2">
                                Active since: {splitDatePartFromString(this.props.user.activeSince)}
                            </Typography>
                            <Typography variant="body1" color="textSecondary" component="h5">
                                {this.props.user.about}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        {
                            this.props.displayLoggedUser && 
                                <Button
                                    size="small"
                                    color="primary"
                                    startIcon={<EditIcon />}
                                    variant="outlined"
                                    onClick={() => this.props.goToTab(PageProfileState.Edit)}
                                >
                                    {strings.profile.edit}
                                </Button>
                        }
                        <Button
                            size="small"
                            color="primary"
                            startIcon={<PhotoIcon />}
                            variant="outlined"
                            onClick={this.viewImage}
                        >
                            {strings.profile.viewProfilePhoto}
                        </Button>
                        {
                            this.props.displayLoggedUser &&
                            <Button
                                size="small"
                                color="primary"
                                startIcon={<AddAPhotoIcon />}
                                component="label"
                                variant="outlined"
                            >
                                {strings.profile.changeProfilePhoto}
                                <input
                                    type="file"
                                    style={{ display: "none" }}
                                    onChange={this.onFileUpload}
                                />
                            </Button>
                        }
                    </CardActions>
                </Card>
                <Popper id={id} open={open} anchorEl={this.state.imageAnchorEl} placement="bottom-start" transition>
                    <ImageLoader logo={imageSrc}></ImageLoader>
                </Popper>
                <Box mt={2}>
                    <Card className="mediaContainer">
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                {strings.profile.basicInfoTitle}
                            </Typography>
                            <Grid container spacing={2} >
                                <Grid item xs={6} md={3}>
                                    <Paper className='paper'>
                                        <Typography variant="body1" color="textSecondary" component="h5">
                                            {strings.profile.birthday}
                                        </Typography>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6} md={3}>
                                    <Paper className='paper'>
                                        <Typography variant="body1" color="textPrimary" component="h5">
                                            {
                                                this.props.user.birthday && showBirthday &&
                                                reformatDate(this.props.user.birthday)
                                            }
                                            {
                                                !this.props.user.birthday &&
                                                "..."
                                            }
                                            {
                                                !showBirthday &&
                                                "..."
                                            }
                                        </Typography>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6} md={3}>
                                    <Paper className='paper'>
                                        <Typography variant="body1" color="textSecondary" component="h5">
                                            {strings.profile.address}
                                        </Typography>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6} md={3}>
                                    <Paper className='paper'>
                                        <Typography variant="body1" color="textPrimary" component="h5">
                                            {
                                                this.props.user.address && showAddress &&
                                                this.props.user.address
                                            }
                                            {
                                                !this.props.user.address &&
                                                "..."
                                            }
                                            {
                                                !showAddress &&
                                                "..."
                                            }
                                        </Typography>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6} md={3}>
                                    <Paper className='paper'>
                                        <Typography variant="body1" color="textSecondary" component="h5">
                                            {strings.profile.occupation}
                                        </Typography>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6} md={3}>
                                    <Paper className='paper'>
                                        <Typography variant="body1" color="textPrimary" component="h5">
                                            {
                                                this.props.user.occupation &&
                                                this.props.user.occupation
                                            }
                                            {
                                                !this.props.user.occupation &&
                                                "..."
                                            }
                                        </Typography>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6} md={3}>
                                    <Paper className='paper'>
                                        <Typography variant="body1" color="textSecondary" component="h5">
                                            {strings.profile.gender}
                                        </Typography>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6} md={3}>
                                    <Paper className='paper'>
                                        <Typography variant="body1" color="textPrimary" component="h5">
                                            {
                                                this.props.user.gender &&
                                                this.props.user.gender
                                            }
                                            {
                                                !this.props.user.gender &&
                                                "..."
                                            }
                                        </Typography>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Box>
                <Box className="mediaContainer">
                    <ProfileInformationAttributes usersAttributes={this.props.user.usersAttributes} />
                </Box>
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
    return { menu: menuReducers };
}

export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileInformation)));
