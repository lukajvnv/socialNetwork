import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';
import PhotoIcon from '@material-ui/icons/Photo';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import FileFormat from '../../../../constants/FileFormat';
import { getError, hasError } from "../../../../functions/Validation";

import strings from '../../../../localization';
import CONFIG from '../../../../config';

import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import MoodIcon from '@material-ui/icons/Mood';
import MoodBadIcon from '@material-ui/icons/MoodBad';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import {Link} from "react-router-dom";

import logo from '../../../../assets/no_image.jpg';
import ImageLoader from '../../../../components/ImageLoader';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
// import Link from '@material-ui/core/Link';

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

const useStyles = makeStyles((theme) => ({
    dialog: {
        backgroundColor: theme.palette.primary,
        width: 600
    },
    avatar: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
    buttonButtomHeader: {
        '& > *': {
            margin: theme.spacing(1),
        },
        border: "2px solid blue"
    },
    image: {
        width: 550
    }
}));

const paletteb = {
    red: '#ff0000',
    blue: '#0000ff',
    yellow: 'yellow',
    cyan: 'cyan',
    lime: 'lime',
    pink: 'pink'
};

const palette = [
    { colorName: 'red', colorValue: '#ff0000' },
    { colorName: 'blue', colorValue: '#0000ff' },
    { colorName: 'yellow', colorValue: 'yellow' },
    { colorName: 'cyan', colorValue: 'cyan' },
    { colorName: 'lime', colorValue: 'lime' },
    { colorName: 'pink', colorValue: 'pink' }
];

const options = [
    strings.post.form.emoji.happy,
    strings.post.form.emoji.exited,
    strings.post.form.emoji.relaxed,
    strings.post.form.emoji.love,
    strings.post.form.emoji.sad,
];

const PostDialog = ({
    shouldOpen,
    closeAction,
    user,
    snackbar,

    onSubmit,
    onChange,
    errors,
    data,
    imageFile,
    docFile,
}) => {
    const classes = useStyles();

    const open = shouldOpen;
    const [scroll, setScroll] = React.useState('paper');
    const [image, setImage] = React.useState(undefined);
    const [file, setFile] = React.useState(undefined);

    const handleClose = () => {
        if (closeAction) {
            setImage(undefined);
            setFile(undefined);
            closeAction();
        }
    };

    const placeTagClick = () => {
        snackbar('Place tagging ' + strings.post.form.toBeImplemented, { variant: 'info' });
    }

    const [feelingMenuAnchorEl, setFeelingMenuAnchorEl] = React.useState(null);
    const [styleMenuAnchorEl, setStyleMenuAnchorEl] = React.useState(null);

    const handleFeelingMenuClick = (event) => {
        setFeelingMenuAnchorEl(event.currentTarget);
    };

    const handleFeelingMenuClose = () => {
        setFeelingMenuAnchorEl(null);
    };

    const handleFeelingMenuItemClick = (event, index) => {
        const emojiValue = options[index];
        data['feeling'] = emojiValue;
        setFeelingMenuAnchorEl(null);
    };

    const handleStyleMenuClick = (event) => {
        setStyleMenuAnchorEl(event.currentTarget);
    };

    const handleStyleMenuClose = () => {
        setStyleMenuAnchorEl(null);
    };

    const handleStyleMenuItemClick = (event, index) => {
        // setSelectedIndex(index);
        const styleValue = palette[index];
        data['style'] = styleValue.colorName;
        setStyleMenuAnchorEl(null);
    };

    const imageUpload = (event) => {
        console.log(event);

        let fileList = event.target.files;
        let file = fileList.item(0);

        let formData = new FormData();
        formData.append('file', file, file.name);
        const fileType = file.type;
        if (fileType !== FileFormat.jpg && fileType !== FileFormat.png) {
            snackbar(strings.profile.form.imageError, { variant: 'error' });
            return;
        }

        imageFile['name'] = file.name;
        imageFile['value'] = file;
        data['imageUri'] = file.name;

        setImage(URL.createObjectURL(file));

    }

    const fileUpload = (event) => {
        console.log(event);

        let fileList = event.target.files;
        let file = fileList.item(0);

        let formData = new FormData();
        formData.append('file', file, file.name);
        const fileType = file.type;
        if (fileType !== FileFormat.pdf) {
            snackbar(strings.post.form.fileError, { variant: 'error' });
            return;
        }

        data['fileUri'] = file.name;

        docFile['name'] = file.name;
        docFile['value'] = file;

        // setFile(URL.createObjectURL(file));
        setFile(file);
    }

    const imageName = user ? user.urlProfile : undefined;
    const imageSrc = imageName ? CONFIG.imageUrlRegistry + imageName : 'noImage';
    const [value, setValue] = React.useState(0);

    const descriptionElementRef = React.useRef(null);
    //   React.useEffect(() => {
    //     if (open) {
    //       const { current: descriptionElement } = descriptionElementRef;
    //       if (descriptionElement !== null) {
    //         descriptionElement.focus();
    //       }
    //     }
    //   }, [open]);

    return (
        <div >
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">{strings.post.form.title}</DialogTitle>
                <DialogContent
                    className={classes.dialog}
                    dividers>
                    <Grid container
                        style={{
                            backgroundColor: data.style ? data.style : 'white',
                        }}
                    >
                        <Grid item md={3} >
                            <Avatar alt={user.firstName} src={imageSrc} className={classes.avatar} />
                        </Grid>
                        <Grid item md={9} >
                            <Paper >
                                <Grid container >
                                    <Grid item md={12} >
                                        <Typography variant="subtitle1" >
                                            {user.firstName} {user.lastName}
                                            {data.feeling && <b> is feeling {data.feeling}</b>}
                                            {data.place && <i> at place {data.place}</i>}
                                        </Typography>
                                    </Grid>
                                    <Grid item md={12} >

                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                    <TextField
                        label={strings.post.form.text}
                        error={hasError(errors, 'text')}
                        helperText={getError(errors, 'text')}
                        onChange={onChange}
                        // onKeyPress={keyPress}
                        value={data.text}
                        fullWidth
                        autoFocus
                        name='text'
                        margin="normal"
                        multiline
                        rows='2'

                    />
                    {/* <Link 
                        href={file} 
                        onClick={(event) => event.preventDefault()}
                        target="_blank" 
                        download
                        >
                        {data.fileUri}
                    </Link> */}
                    {/* <Link to={pdf} target="_blank" download>Download</Link> */}
                    <img className="profileImage" src={image} alt="" className={classes.image}></img>
                    {
                        file && <Grid
                            item
                            md={12}
                        >
                            <Button
                                href="#text-buttons"
                                color="primary"
                                // onClick={() => docUpdate(post.fileUri)}
                                >
                                {file.name}
                            </Button>
                        </Grid>
                    }
                    <Paper className={classes.buttonButtomHeader}>
                        <Button
                            size="small"
                            color="primary"
                            startIcon={<AddAPhotoIcon />}
                            variant="outlined"
                            component="label"
                        >
                            {strings.post.form.photo}
                            <input
                                type="file"
                                style={{ display: "none" }}
                                onChange={imageUpload}
                            />
                        </Button>
                        <Button
                            size="small"
                            color="primary"
                            startIcon={<EmojiEmotionsIcon />}
                            variant="outlined"

                            aria-controls="customized-menu"
                            aria-haspopup="true"
                            onClick={handleFeelingMenuClick}
                        >
                            {strings.post.form.emoji.title}
                        </Button>
                        <Button
                            size="small"
                            color="primary"
                            startIcon={<LocationOnIcon />}
                            variant="outlined"
                            onClick={placeTagClick}
                        >
                            {strings.post.form.place}
                        </Button>
                        <Button
                            size="small"
                            color="primary"
                            startIcon={<ColorLensIcon />}
                            variant="outlined"
                            component="label"
                            onClick={handleStyleMenuClick}
                        >
                            {strings.post.form.style}
                        </Button>
                        <Button
                            size="small"
                            color="primary"
                            startIcon={<AttachFileIcon />}
                            variant="outlined"
                            component="label"
                        >
                            {strings.post.form.file}
                            <input
                                type="file"
                                style={{ display: "none" }}
                                onChange={fileUpload}
                            />
                        </Button>
                        <StyledMenu
                            id="customized-menu"
                            anchorEl={feelingMenuAnchorEl}
                            keepMounted
                            open={Boolean(feelingMenuAnchorEl)}
                            onClose={handleFeelingMenuClose}
                        >
                            <StyledMenuItem onClick={(event) => handleFeelingMenuItemClick(event, 0)}>
                                <ListItemIcon>
                                    <MoodIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText primary={strings.post.form.emoji.happy} />
                            </StyledMenuItem>
                            <StyledMenuItem onClick={(event) => handleFeelingMenuItemClick(event, 1)} >
                                <ListItemIcon>
                                    <SentimentSatisfiedIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText primary={strings.post.form.emoji.exited} />
                            </StyledMenuItem>
                            <StyledMenuItem onClick={(event) => handleFeelingMenuItemClick(event, 2)}>
                                <ListItemIcon>
                                    <SentimentDissatisfiedIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText primary={strings.post.form.emoji.relaxed} />
                            </StyledMenuItem>
                            <StyledMenuItem onClick={(event) => handleFeelingMenuItemClick(event, 3)}>
                                <ListItemIcon>
                                    <FavoriteBorderIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText primary={strings.post.form.emoji.love} />
                            </StyledMenuItem>
                            <StyledMenuItem onClick={(event) => handleFeelingMenuItemClick(event, 4)}>
                                <ListItemIcon>
                                    <MoodBadIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText primary={strings.post.form.emoji.sad} />
                            </StyledMenuItem>
                        </StyledMenu>
                        <StyledMenu
                            id="customized-menu"
                            anchorEl={styleMenuAnchorEl}
                            keepMounted
                            open={Boolean(styleMenuAnchorEl)}
                            onClose={handleStyleMenuClose}
                        >
                            {
                                palette.map((color, index) => {
                                    const backgroundColor = color.colorValue;
                                    return (
                                        <StyledMenuItem key={index} onClick={(event) => handleStyleMenuItemClick(event, index)}>
                                            <ListItemIcon>
                                                <CheckBoxOutlineBlankIcon
                                                    fontSize="small"
                                                    style={{
                                                        backgroundColor: backgroundColor,
                                                    }}
                                                />
                                            </ListItemIcon>
                                            <ListItemText primary={color.colorName} />
                                        </StyledMenuItem>
                                    )
                                })
                            }
                        </StyledMenu>
                    </Paper>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        {strings.post.form.cancel}
                    </Button>
                    <Button onClick={onSubmit} color="primary">
                        {strings.post.form.submit}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default PostDialog;