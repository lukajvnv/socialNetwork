import React from 'react'

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Page from "../common/Page";
import { bindActionCreators } from "redux";
import * as Actions from "../actions/Actions";
import { withRouter } from "react-router-dom";
import connect from "react-redux/es/connect/connect";
// import {withSnackbar} from "notistack";

import Box from '@material-ui/core/Box';

class Home extends Page {

    constructor(props) {
        super(props);

        this.props.changeFullScreen(false);
        // this.props.enqueueSnackbar('I love snacks.');
        // this.props.enqueueSnackbar('I love snacks.');
        // this.props.enqueueSnackbar('I love snacks.');

        if (!this.props.user) {
            console.log('idi na login');
            this.props.history.push('/login');
        }
    }

    render() {
        return (
            <div>
                <Grid container spacing={24} >
                    <Grid item md={12}>
                        <Paper className='paper'>
                            <Box borderTop={1}>fddf</Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper className='paper'>xs=6</Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper className='paper'>xs=6</Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className='paper'>xs=12</Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className='paper'>xs=6</Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className='paper'>xs=6</Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className='paper'>xs=12</Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className='paper'>xs=6</Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className='paper'>xs=6</Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className='paper'>xs=12</Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className='paper'>xs=6</Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className='paper'>xs=6</Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className='paper'>xs=12</Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className='paper'>xs=6</Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className='paper'>xs=6</Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className='paper'>xs=12</Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className='paper'>xs=6</Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className='paper'>xs=6</Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className='paper'>xs=12</Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className='paper'>xs=6</Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className='paper'>xs=6</Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className='paper'>xs=12</Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className='paper'>xs=6</Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className='paper'>xs=6</Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className='paper'>xs=12</Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className='paper'>xs=6</Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className='paper'>xs=6</Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className='paper'>xs=12</Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className='paper'>xs=6</Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className='paper'>xs=6</Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className='paper'>xs=12</Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className='paper'>xs=6</Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className='paper'>xs=6</Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className='paper'>xs=12</Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className='paper'>xs=6</Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className='paper'>xs=6</Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className='paper'>xs=12</Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className='paper'>xs=6</Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className='paper'>xs=6</Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className='paper'>xs=12</Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className='paper'>xs=6</Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className='paper'>xs=6</Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className='paper'>xs=12</Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className='paper'>xs=6</Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className='paper'>xs=6</Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className='paper'>xs=12</Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className='paper'>xs=6</Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className='paper'>xs=6</Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className='paper'>xs=12</Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className='paper'>xs=6</Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className='paper'>xs=6</Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className='paper'>xs=12</Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className='paper'>xs=6</Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className='paper'>xs=6</Paper>
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

// export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(Home)));
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
