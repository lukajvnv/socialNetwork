import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import { makeStyles } from '@material-ui/core/styles';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import Chip from '@material-ui/core/Chip';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import MovieIcon from '@material-ui/icons/Movie';
import SportsBaseballIcon from '@material-ui/icons/SportsBaseball';
import PersonIcon from '@material-ui/icons/Person';

import strings from "../../../../localization";
import UserAttributeType from '../../../../constants/UserAttributeType';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 0,
      },
    chip: {
      margin: theme.spacing(0.5),
    }
  }));

const printUserAttributes = (usersAttributes, attributeType, classes) => {
    let chipIcon;
    switch (attributeType) {
        case UserAttributeType.Personality: 
            chipIcon = <PersonIcon />; 
            break;
        case UserAttributeType.Lifestyle: 
            chipIcon = <TagFacesIcon />; 
            break;
        case UserAttributeType.Sport: 
            chipIcon = <SportsBaseballIcon />; 
            break;
        case UserAttributeType.Music: 
            chipIcon = <MusicNoteIcon />; 
            break;
        case UserAttributeType.Film: 
            chipIcon = <MovieIcon />; 
            break;
        default:
            chipIcon = <PersonIcon />;
    }
    
    return (
        <Grid item  md={12}>
            <Typography gutterBottom variant="subtitle2" align="center" component="h2">
                {strings.profile.attributes[attributeType]}
            </Typography>
            <Paper className={classes.root}>                    
                    {
                        usersAttributes.length > 0 && 
                        usersAttributes.map((data) => {
                            return (
                                <li key={data.id}>
                                    <Chip
                                        icon={chipIcon}
                                        label={data.value}
                                        className={classes.chip}
                                    />
                                </li>
                            );
                    })}
                    {
                        usersAttributes.length == 0 && 
                        "..."
                    }  
            </Paper>
        </Grid>
    )
}

const ProfileInformationAttributes = ({
    usersAttributes
}) => {
    const classes = useStyles();

    return (
        <Card >
            <CardContent>
                <Typography  variant="h5" component="h2">
                    {strings.profile.additionalInfoTitle}
                </Typography>
                <Grid container spacing={2} >
                    {
                        printUserAttributes(usersAttributes
                            .filter(uA => uA.type == UserAttributeType.Personality), UserAttributeType.Personality, classes)
                    }
                    {
                        printUserAttributes(usersAttributes
                            .filter(uA => uA.type == UserAttributeType.Lifestyle), UserAttributeType.Lifestyle, classes)
                    }
                    {
                        printUserAttributes(usersAttributes
                            .filter(uA => uA.type == UserAttributeType.Music), UserAttributeType.Music, classes)
                    }
                    {
                        printUserAttributes(usersAttributes
                            .filter(uA => uA.type == UserAttributeType.Sport), UserAttributeType.Sport, classes)
                    }
                    {
                        printUserAttributes(usersAttributes
                            .filter(uA => uA.type == UserAttributeType.Film), UserAttributeType.Film, classes)
                    }
                </Grid>
            </CardContent>
        </Card>
    )
};

export default ProfileInformationAttributes;