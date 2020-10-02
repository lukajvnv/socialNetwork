import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { blue } from '@material-ui/core/colors';

import FriendActionTypes from "../../../../constants/FriendActionTypes";
import strings from "../../../../localization";


import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import InfoIcon from '@material-ui/icons/Info';
import CancelIcon from '@material-ui/icons/Cancel';
import SendIcon from '@material-ui/icons/Send';
import CheckIcon from '@material-ui/icons/Check';

import PageFriendsState from "./PageFriendsState";

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open, friendPageState } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };
  let friendActions;
  switch (friendPageState) {
    case PageFriendsState.Friends:
      friendActions = [FriendActionTypes.View, FriendActionTypes.Delete];
      break;
    case PageFriendsState.Request:
      friendActions = [FriendActionTypes.Accept, FriendActionTypes.Decline];
      break;
    case PageFriendsState.New:
      friendActions = [FriendActionTypes.Send, FriendActionTypes.View];
      break;
    default:
      friendActions = [FriendActionTypes.View, FriendActionTypes.Delete];
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">{strings.profile.friend.actionDialogTile}</DialogTitle>
      <List>
        {friendActions.map((friendAction) => {
          let actionIcon;
          switch (friendAction) {
            case FriendActionTypes.View:
              actionIcon = <InfoIcon />;
              break;
            case FriendActionTypes.Send:
              actionIcon = <SendIcon />;
              break;
            case FriendActionTypes.Decline:
              actionIcon = <CancelIcon />;
              break;
            case FriendActionTypes.Delete:
              actionIcon = <DeleteForeverIcon />;
              break;
            case FriendActionTypes.Accept:
              actionIcon = <CheckIcon />;
              break;
            default:
              actionIcon = <InfoIcon />;
          }
          return (
            <ListItem button onClick={() => handleListItemClick(friendAction)} key={friendAction}>
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  {actionIcon}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={friendAction} />
            </ListItem>
          )
        })
        }
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

const FriendDetailActionDialog = ({ friendPageState, onActionClick }) => {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
    onActionClick(value);
  };

  return (
    <div>
      <Button variant="contained" color="primary" size="large" onClick={handleClickOpen}>
        {friendPageState}
      </Button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        friendPageState={friendPageState} />
    </div>
  );
}

export default FriendDetailActionDialog;