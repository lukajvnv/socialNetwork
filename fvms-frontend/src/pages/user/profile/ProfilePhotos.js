import React, { Component } from 'react'

import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import * as Actions from "../../../actions/Actions";
import Page from "../../../common/Page";
import strings from "../../../localization";

import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import PhotoIcon from '@material-ui/icons/Photo';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import IconButton from '@material-ui/core/IconButton';

import GridListTile from '@material-ui/core/GridListTile';
import GridList from '@material-ui/core/GridList';

import astronomy from '../../../assets/astronomy.jpg'; // with import
import circle from '../../../assets/circle.jpg'; // with import
import color_mix from '../../../assets/color_mix.jpg'; // with import


class ProfilePhotos extends Component {

    constructor(props) {
        super(props);

        // this.props.changeFullScreen(true);
    }

    render() {
        const tileData = [
            {
                img: astronomy,
                title: 'Image',
                author: 'author',
                cols: 2,
            },
            {
                img: circle,
                title: 'Image',
                author: 'author',
            },
            {
                img: color_mix,
                title: 'Image',
                author: 'author',
                cols: 3,
            },
        ];

        return (
            <div>
                <Box mt={2}>
                    <Card className="mediaContainer">
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                {strings.profile.photos}
                            </Typography>
                            <div className="gridListRoot">
                                <GridList cellHeight={160} className="gridList" cols={3}>
                                    {tileData.map((tile) => (
                                        <GridListTile key={tile.img} cols={tile.cols || 1}>
                                            <img src={tile.img} alt={tile.title} />
                                        </GridListTile>
                                    ))}
                                </GridList>
                            </div>
                        </CardContent>
                        <CardActions>
                            <IconButton size="small" color="primary">
                                <AddAPhotoIcon />{strings.profile.newPhoto}
                            </IconButton>
                        </CardActions>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfilePhotos));