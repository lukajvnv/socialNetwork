import React, {useRef} from 'react';
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
import { reformatDate, farFromNow } from '../../../../util/DateUtil';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import { postComment } from '../../../../services/PostService';

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
    },
    paper: {
        padding: 10
    }
}));



const PostDetail = ({
    post,
    user,
    closeAction,
    refreshView
}) => {
    const classes = useStyles();

    const [scroll, setScroll] = React.useState('paper');
    const [image, setImage] = React.useState(undefined);
    const [file, setFile] = React.useState(undefined);
    const [commentFormDisp, setCommentFormDisp] = React.useState(false);
    const [commentsDisp, setCommentsDisp] = React.useState(false);
    const [comment, setComment] = React.useState('');

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

    const toggleCommentFormDisp = () => {
        setCommentFormDisp(!commentFormDisp);
    };

    const toggleCommentsDisp = () => {
        setCommentsDisp(!commentsDisp);
    };

    const docUpdate = (fileName) => {
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

    const keyPress = (event) => {
        if(event.key == 'Enter') {
            sendComment();
        }
    }

    const sendComment = () => {
        if(comment){
            const newComment = {
                post: post.id,
                text: comment,
                author: user
            }
            postComment(newComment).then(response => {
                console.log(response);
                setComment('');
                setCommentFormDisp(false);
                refreshView();
            }
            ).catch(err => {
                console.log(err);
            });
        }
    }

    const changeCommentText = (event) => {
        const text = event.target.value;
        setComment(text);
    }

    const imageName = post.imageUri;
    const imageSrc = imageName ? CONFIG.imageUrlRegistry + imageName : undefined;

    const profileImageSrc = post.author.urlProfile ? CONFIG.imageUrlRegistry + post.author.urlProfile : undefined;
    const commentAuthorImageSrc = user.urlProfile ? CONFIG.imageUrlRegistry + user.urlProfile : undefined;

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
                                            Posted {farFromNow(post.postTime)} ago
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
                                    color: post.style ? post.style : 'black'
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
                            display: imageSrc ? 'block' : 'none'
                        }}
                    ></img>
                    {
                        post.fileUri && <Grid
                            item
                            md={12}

                        >
                            <Button
                                href="#text-buttons"
                                color="primary"
                                onClick={() => docUpdate(post.fileUri)}>
                                {post.fileUri}
                            </Button>
                        </Grid>
                    }
                </CardContent>
                <CardActions>
                    <Button
                        size="small"
                        color="primary"
                        startIcon={<ThumbUpAltIcon />}
                        variant="outlined"
                    >
                        {strings.post.like}
                    </Button>
                    <Button
                        size="small"
                        color="primary"
                        startIcon={<AddIcon />}
                        variant="outlined"
                        onClick={toggleCommentFormDisp}
                    >
                        {strings.comment.title}
                    </Button>
                    {
                        post.comments.length > 0 &&
                        <Button
                            size="small"
                            color="primary"
                            startIcon={<ExpandMoreIcon />}
                            variant="outlined"
                            onClick={toggleCommentsDisp}
                        >
                            {post.comments.length} {strings.comment.plural}
                        </Button>
                    }

                </CardActions>
                {
                    commentFormDisp && <Grid container

                    >
                        <Grid item md={2} >
                            <Box p={2}>
                                <Avatar
                                    alt={user.firstName}
                                    src={commentAuthorImageSrc}
                                />
                            </Box>
                        </Grid>
                        <Grid item md={8} >
                            <TextField
                                onChange={changeCommentText}
                                onKeyPress={keyPress}
                                value={comment}
                                fullWidth
                                autoFocus
                                name='text'
                                margin="normal"
                                label={strings.comment.placeholder}
                            />
                        </Grid>
                        <Grid item md={2} >
                            <Box p={2}>
                                <Button
                                    size="small"
                                    color="primary"
                                    startIcon={<SendIcon />}
                                    variant="contained"
                                    onClick={sendComment}
                                >
                                    {strings.comment.send}
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                }
                {
                    commentsDisp && post.comments.map(comment => {
                        const profileAuthorImageSrc = comment.author.urlProfile ? CONFIG.imageUrlRegistry + comment.author.urlProfile : undefined;

                        return (
                            <Grid container key={comment.id}>
                                <Grid item md={2} >
                                    <Box p={2}>
                                        <Avatar
                                            alt={comment.author.firstName}
                                            src={profileAuthorImageSrc}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item md={10} >
                                    <Paper className={classes.paper}>
                                        <Typography variant="subtitle1">
                                            <b>{comment.author.firstName} {comment.author.lastName}, <i>{farFromNow(comment.commentTime)} ago</i></b>
                                        </Typography>
                                        <Divider />
                                        <Box pl={1}>
                                            <Typography variant="body1">
                                                {comment.text}
                                            </Typography>
                                        </Box>
                                    </Paper>
                                </Grid>
                            </Grid>
                        )
                    })
                }

            </Card>
        </Box>
    );
}

export default PostDetail;