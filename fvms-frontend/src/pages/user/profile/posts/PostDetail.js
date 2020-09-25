import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import strings from '../../../../localization';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CONFIG from '../../../../config';

const useStyles = makeStyles((theme) => ({
    dialog: {
        backgroundColor: theme.palette.primary,
        width: 600
    },
    avatar: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
    image: {
        width: 550
    }
}));



const PostDetail = ({
    post,
    user,
    closeAction
}) => {
    const classes = useStyles();

    const [scroll, setScroll] = React.useState('paper');
    const [image, setImage] = React.useState(undefined);
    const [file, setFile] = React.useState(undefined);

    const handleClose = () => {
        // setOpen(false);
        if (closeAction) {
            closeAction();
        }
    };

    
    const [feelingMenuAnchorEl, setFeelingMenuAnchorEl] = React.useState(null);
    const [styleMenuAnchorEl, setStyleMenuAnchorEl] = React.useState(null);

    const handleFeelingMenuClick = (event) => {
        setFeelingMenuAnchorEl(event.currentTarget);
    };

    const handleFeelingMenuClose = () => {
        setFeelingMenuAnchorEl(null);
    };

    const handleFeelingMenuItemClick = (event, index) => {
        setFeelingMenuAnchorEl(null);
    };

    const test = (fileName) => { 
        fetch('http://localhost:8081/resource/doc/name/' + fileName)
			.then(response => {
				response.blob().then(blob => {
					let url = window.URL.createObjectURL(blob);
					let a = document.createElement('a');
					a.href = url;
					a.download = fileName;
					a.click();
				});
				//window.location.href = response.url;
		});
    }

    const imageName = post.imageUri;
    const imageSrc =  imageName ? CONFIG.imageUrlRegistry + imageName : undefined;

    const profileImageSrc =  post.author.urlProfile ? CONFIG.imageUrlRegistry + post.author.urlProfile : undefined;

    return (
        <Box mt={2} key={post.id}>
            <Card className="postContainer">
                <CardContent>
                    <Grid container
                        
                    >
                        <Grid item md={2} >
                            <Avatar 
                                alt={post.author.firstName} 
                                // src={"fd"}
                                src={profileImageSrc} 
                                className={classes.avatar} 
                                />
                        </Grid>
                        <Grid item md={10} >
                            <Paper >
                                <Grid container >
                                    <Grid item md={12} >
                                        <Typography variant="subtitle1" >
                                            {post.author.firstName} {post.author.lastName}
                                            {post.feeling && <b> is feeling {post.feeling}</b>}
                                            {post.place && <i> at place {post.place}</i>}
                                        </Typography>
                                    </Grid>
                                    <Grid item md={12} >
                                        <Typography variant="subtitle2" component="i">
                                            Posted 2h ago                                                                
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid item md={12} >
                        <Paper >
                                <Typography variant="h5" 
                            style={{
                                // backgroundColor: post.style ? post.style : 'white',
                                color:  post.style ? post.style : 'black'
                            }}
                        >
                            {post.text}
                            </Typography>
                        </Paper>
                    </Grid>
                    <img 
                        className="profileImage" 
                        src={imageSrc} alt="" 
                        className={classes.image}
                        style={{
                            display: imageSrc ? 'block': 'none'
                        }}
                    ></img>
                    <Grid 
                        item 
                        md={12} 
                        style={{
                            display: post.fileUri ? 'block': 'none'
                        }}    
                    >
                        <Button 
                            href="#text-buttons" 
                            color="primary" 
                            onClick={() => test(post.fileUri)}>
                            {post.fileUri}
                        </Button>
                    </Grid>
                </CardContent>
                <CardActions>
                    <Button
                        size="small"
                        color="primary"
                        startIcon={<AddIcon />}
                        variant="outlined"
                        // onClick={this.handleToggle}
                    >
                        {strings.comment.new}
                    </Button>
                </CardActions>
            </Card>
        </Box>
    );
}

export default PostDetail;