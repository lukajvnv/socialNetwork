import React, { Component } from 'react'

import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import * as Actions from "../../../../actions/Actions";
import Page from "../../../../common/Page";
import Button from '@material-ui/core/Button';
import PostDialogWrapper from './PostDialogWrapper';
import { withSnackbar } from "notistack";
import Validators from "../../../../constants/ValidatorTypes";
import { post } from '../../../../services/PostService';
import { uploadPdfFile, uploadImage } from '../../../../services/ResourceSevice';
import { getUserPosts } from '../../../../services/PostService';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import strings from '../../../../localization';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import PostDetail from './PostDetail';

class ProfilePosts extends Page {
    _isMounted = false;

    validationList = {
        text: [{ type: Validators.REQUIRED }],
    };

    constructor(props) {
        super(props);

        this.state = this.getInitialState();

        this.handleClose = this.handleClose.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
    }

    getInitialState = () => ({
        data: {
            text: '',
            feeling: '',
            place: '',
            style: '',
            imageUri: '',
            fileUri: '',
            author: this.props.user
        },
        errors: {},
        image: { name: '', value: undefined },
        docFile: { name: '', value: undefined },
        dialogOpen: false,
        posts: []
    })

    componentDidMount() {
        this._isMounted = true;
        this.fetchData(this._isMounted);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    refreshView() {
        this.setState(this.getInitialState());
        this.fetchData(this._isMounted);
    }

    fetchData(mountStatus = true) {
        const friendEmail = this.props.displayLoggedUser ? '' : this.props.user.email;
        if (mountStatus) {
            getUserPosts(friendEmail).then(response => {
                console.log(response);

                if (mountStatus) {
                    this.setState({ posts: response.data});
                }
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

        post(this.state.data).then(response => {
            console.log(response);

            if (this.state.image.value) {
                let formData = new FormData();
                const file = this.state.image.value;
                formData.append('file', file, file.name);

                uploadImage(formData).then(response => {
                    console.log(response);
                }
                ).catch(err => {
                    console.log(err);
                });
            }

            if (this.state.docFile.value) {
                let formDocData = new FormData();
                const docFile = this.state.docFile.value;
                formDocData.append('file', docFile, docFile.name);

                uploadPdfFile(formDocData).then(response => {
                    console.log(response);
                }
                ).catch(err => {
                    console.log(err);
                });
            }

            this.refreshView();
        })
            .catch(err => {
                console.log(err);
            });
    }

    handleClose() {
        this.refreshView();
    };

    handleToggle() {
        const prevValue = this.state.dialogOpen;
        this.setState({ dialogOpen: !prevValue });
    };

    render() {
        const friendHeaderTitle = this.props.user.firstName + '\'s posts';

        return (
            <div>
                <PostDialogWrapper
                    user={this.props.user}
                    snackbar={this.props.enqueueSnackbar}
                    data={this.state.data}
                    image={this.state.image}
                    docFile={this.state.docFile}
                    onChange={this.changeData}
                    onSubmit={() => this.postSubmit()}
                    errors={this.state.errors}
                    open={this.state.dialogOpen}
                    closeAction={() => this.handleClose()}
                />
                <Card className="postContainer">
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            {this.props.displayLoggedUser && strings.profile.posts}
                            {!this.props.displayLoggedUser && friendHeaderTitle}
                        </Typography>
                    </CardContent>
                    {
                        this.props.displayLoggedUser && 
                        <CardActions>
                            <Button
                                color="primary"
                                startIcon={<AddIcon />}
                                variant="outlined"
                                onClick={this.handleToggle}
                            >
                                {strings.post.form.title}
                            </Button>
                        </CardActions>
                    }
                    
                </Card>

                {
                    this.state.posts.map(post => {

                        return (
                            <PostDetail
                                key={post.id}
                                post={post}
                                user={this.props.loggedUser}
                                refreshView={() => this.refreshView()} />
                        )
                    })
                }
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
    return { menu: menuReducers, loggedUser: authReducers.user };
}

export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfilePosts)));