import React from 'react'

import Page from "../common/Page";
import { bindActionCreators } from "redux";
import * as Actions from "../actions/Actions";
import { withRouter } from "react-router-dom";
import connect from "react-redux/es/connect/connect";

import Button from '@material-ui/core/Button';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Box from '@material-ui/core/Box';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import Collapse from '@material-ui/core/Collapse';

import PostDetail from '../pages/user/profile/posts/PostDetail';
import PostDialogWrapper from '../pages/user/profile/posts/PostDialogWrapper';
import Validators from "../constants/ValidatorTypes";
import { post } from '../services/PostService';
import { uploadPdfFile, uploadImage } from '../services/ResourceSevice';
import { getPosts } from '../services/PostService';
import strings from '../localization';
import Pagination from '@material-ui/lab/Pagination';
import CONFIG from "../config";

class Home extends Page {
    _isMounted = false;

    validationList = {
        text: [{ type: Validators.REQUIRED }],
    };

    constructor(props) {
        super(props);

        this.props.changeFullScreen(false);

        this.state = this.getInitialState();

        this.handleClose = this.handleClose.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.paginSelect = this.paginSelect.bind(this)
    }

    paginSelect(event, page) {
        console.log(event);
        this.setState({page});
        this.fetchData(true, page);
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
        posts: [],
        pages: CONFIG.pages,
        page: 1,
        submenu: {
            searchForm: false
        }
    })

    componentDidMount() {
        this._isMounted = true;
        this.fetchData(this._isMounted);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    refreshView() {
        const page = this.state.page;
        this.setState(this.getInitialState());
        this.fetchData(this._isMounted, page);
    }

    fetchData(mountStatus = true, page = 1) {
        if (mountStatus) {
            getPosts(page, CONFIG.perPage).then(response => {
                console.log(response);

                if (mountStatus) {
                    this.setState({ posts: response.data.posts, pages: response.data.pages });
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

    toggleSubmenu(key) {

        let submenu = this.state.submenu;

        submenu[key] = !submenu[key];

        this.setState({
            submenu: submenu
        });
    }

    render() {

        return (
            <div >
                
               {
                   this.props.user && <PostDialogWrapper
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
               }
                <Card className="postContainer">
                    <CardActions>
                        <Button
                            size="small"
                            color="primary"
                            startIcon={<AddIcon />}
                            variant="outlined"
                            onClick={this.handleToggle}
                        >
                            {strings.post.form.title}
                        </Button>
                        <Button
                            size="small"
                            color="primary"
                            startIcon={<SearchIcon />}
                            variant="outlined"
                            onClick={() => this.toggleSubmenu('searchForm')}
                        >
                            {strings.post.form.search}
                        </Button>
                    </CardActions>
                </Card>
                <Collapse
                    in={this.state.submenu.searchForm}
                    timeout="auto"
                    unmountOnExit
                    className="postContainer"
                >
                    Search form
                </Collapse>

                {
                    this.state.posts.map(post => {

                        return (
                            <PostDetail
                                key={post.id}
                                post={post}
                                user={this.props.user}
                                refreshView={() => this.refreshView()} />
                        )
                    })
                }
                <Box m={2}>
                    <Card className="postContainer">
                        <Pagination count={this.state.pages} color="primary" showFirstButton showLastButton size="large" onChange={this.paginSelect} />
                    </Card>
                </Box>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
