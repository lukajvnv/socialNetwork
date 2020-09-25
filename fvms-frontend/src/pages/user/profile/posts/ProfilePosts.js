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
import {uploadPdfFile, uploadImage} from '../../../../services/ResourceSevice';
import {getUserPosts, getPosts} from '../../../../services/PostService';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import strings from '../../../../localization';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import PostDetail from './PostDetail';

class ProfilePosts extends Page {
    _isMounted = false;

    validationList = {
        text: [{ type: Validators.REQUIRED }],
    };

    constructor(props) {
        super(props);

        this.state = {
            data: {
                text: '',
                feeling: '',
                place: '',
                style: '',
                imageUri: '',
                fileUri: '',
                author: props.user
            },
            errors: {},
            image: { name: '', value: undefined },
            docFile: { name: '', value: undefined },
            dialogOpen: false,
            posts: []
        }

        this.handleClose = this.handleClose.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        this.fetchData(this.state.pageFriendsState);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    fetchData(mountStatus = true) {
        if(mountStatus){
            getPosts().then(response => {
                console.log(response);
               
                if (mountStatus) {
                    this.setState({posts: response.data})
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

            // this.props.history.push({
            //     pathname: this.state.redirectUrl
            // });

            if(this.state.image.value){
                let formData = new FormData();
                const file = this.state.image.value;
                formData.append('file', file, file.name);

                uploadImage(formData).then(response => {
                    console.log(response);
                }
                ).catch(err => {
                    console.log(err);
                });

                // formData.append('resourceType', 'IMAGE');
                // formData.append('post', response.data.id);
                // uploadPostImage(formData).then(response => {
                //     console.log(response);
                // }
                // ).catch(err => {
                //     console.log(err);
                // });
            }

            if(this.state.docFile.value){
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
        })
        .catch(err => {
            console.log(err);
        });
    }

    handleClose() {
        this.setState({ dialogOpen: false });
    };

    handleToggle() {
        const prevValue = this.state.dialogOpen;
        this.setState({ dialogOpen: !prevValue });
    };

    render() {

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
                            {strings.profile.posts}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button
                            // size="small"
                            color="primary"
                            startIcon={<AddIcon />}
                            variant="outlined"
                            onClick={this.handleToggle}
                        >
                            {strings.post.form.title}
                        </Button>
                        <Button
                            // size="small"
                            color="primary"
                            startIcon={<SearchIcon />}
                            variant="outlined"
                            // onClick={this.viewImage}
                        >
                            {strings.post.form.search}
                        </Button>
                    </CardActions>
                </Card>

                {
                    this.state.posts.map(post => {

                        return(
                            <PostDetail key={post.id} post={post} user={this.props.user}  />
                            // <Box mt={2} key={post.id}>
                            //     <Card className="postContainer">
                            //         <CardContent>
                            //             <Grid container
                            //                 style={{
                            //                     backgroundColor: post.style ? post.style : 'white',
                            //                 }}
                            //             >
                            //                 <Grid item md={3} >
                            //                     <Avatar 
                            //                         alt={post.author.firstName} 
                            //                         src={"imageSrc"} 
                            //                         // className={classes.avatar} 
                            //                         />
                            //                 </Grid>
                            //                 <Grid item md={9} >
                            //                     <Paper >
                            //                         <Grid container >
                            //                             <Grid item md={12} >
                            //                                 <Typography variant="subtitle1" >
                            //                                     {post.author.firstName} {post.author.lastName}
                            //                                     {post.feeling && <b> is feeling {post.feeling}</b>}
                            //                                     {post.place && <i> at place {post.place}</i>}
                            //                                 </Typography>
                            //                             </Grid>
                            //                             <Grid item md={12} >
                            //                                 <Typography variant="subtitle2" >
                            //                                     Posted 2h ago                                                                
                            //                                 </Typography>
                            //                             </Grid>
                            //                         </Grid>
                            //                     </Paper>
                            //                 </Grid>
                            //             </Grid>
                            //             <Typography variant="h5" component="h2">
                            //                 {strings.profile.posts}
                            //             </Typography>
                            //         </CardContent>
                            //         <CardActions>
                            //             <Button
                            //                 // size="small"
                            //                 color="primary"
                            //                 startIcon={<AddIcon />}
                            //                 variant="outlined"
                            //                 onClick={this.handleToggle}
                            //             >
                            //                 {strings.post.form.title}
                            //             </Button>
                            //         </CardActions>
                            //     </Card>
                            // </Box>
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
    return { menu: menuReducers, user: authReducers.user };
}

export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfilePosts)));