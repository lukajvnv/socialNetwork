import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange } from '@material-ui/core/colors';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import FriendDetailActionDialog from "./FriendDetailActionDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(2)
    },
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    width: theme.spacing(8),
    height: theme.spacing(8)
  },
}));

const FriendDetail = ({ 
    friend, 
    friendPageState, 
    friendshipId, 
    updateFriendship,
    displayLoggedUser }) => {
  const classes = useStyles();

  const onActionClick = (action) => {
    if(action){
      console.log('on action, action:' + action);
      updateFriendship(action, friendshipId, friend);
    }
  }

  return (
    <Grid item xs={3} md={6}>
      <Paper className={classes.root}>
        <Avatar alt="Remy Sharp" src="{logo}" className={classes.orange} />
        <Typography variant="subtitle1" color="textSecondary" component="p">
          {friend.firstName} {friend.lastName}
        </Typography>
        {
          displayLoggedUser &&
            <Box m={5} component="div">
              <FriendDetailActionDialog friendPageState={friendPageState} onActionClick={onActionClick} />
            </Box>
        }
      </Paper>
    </Grid>
  );
}

export default FriendDetail;