import React, { useState } from 'react';
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

const printUserAttributes = (datasource, attributeType, classes, usersAttributes, doUpdate) => {

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

    const handleDelete = (attribute) => {
        console.info('You clicked the delete chip icon, id:' + attribute.id);

        let containedElement = usersAttributes.filter(uA => uA.id === attribute.id)[0];
        if (containedElement) {
            console.log('contains');
            const index = usersAttributes.indexOf(containedElement);
            usersAttributes.splice(index, 1);
            const opFlag = -1;
            doUpdate(attribute.id * opFlag);
        }
    };

    const handleClick = (attribute) => {
        console.info('You clicked the Chip, id:' + attribute.id);
        console.info(datasource);
        console.info(usersAttributes);

        let containedElement = usersAttributes.filter(uA => uA.id === attribute.id)[0];
        let opFlag;
        if (containedElement) {
            console.log('contains');
            const index = usersAttributes.indexOf(containedElement);
            usersAttributes.splice(index, 1);
            opFlag = -1;
        } else {
            console.log('does not contain');
            usersAttributes.push(attribute);
            opFlag = 1;
        }
        doUpdate(attribute.id * opFlag);
    };

    const chipColor = (id) => {
        return usersAttributes.filter(uA => uA.id === id)[0];
    };

    return (
        <Grid item md={12}>
            <Typography gutterBottom variant="subtitle2" align="center" component="h2">
                {strings.profile.attributes[attributeType]}
            </Typography>
            <Paper className={classes.root}>
                {
                    datasource.length > 0 &&
                    datasource.map((data) => {
                        return (
                            <li key={data.id}>
                                <Chip
                                    icon={chipIcon}
                                    label={data.value}
                                    onClick={() => handleClick(data)}
                                    onDelete={() => handleDelete(data)}
                                    className={classes.chip}
                                    color={chipColor(data.id) ? "secondary" : "primary"}
                                />
                            </li>
                        );
                    })}
                {
                    datasource.length == 0 &&
                    "..."
                }
            </Paper>
        </Grid>
    )
}

const ProfileEditAttributes = ({
    usersAttributes,
    attributesDataSource
}) => {
    const classes = useStyles();

    const [update, setUpdate] = useState(0);

    const doUpdate = (value) => {
        setUpdate(value);
    }

    return (
        <Card >
            <CardContent>
                <Typography variant="h5" component="h2">
                    {strings.profile.additionalInfoTitle}
                </Typography>
                <Grid container spacing={2} >
                    {
                        printUserAttributes(attributesDataSource
                            .filter(uA => uA.type == UserAttributeType.Personality), UserAttributeType.Personality, classes, usersAttributes, doUpdate)
                    }
                    {
                        printUserAttributes(attributesDataSource
                            .filter(uA => uA.type == UserAttributeType.Lifestyle), UserAttributeType.Lifestyle, classes, usersAttributes, doUpdate)
                    }
                    {
                        printUserAttributes(attributesDataSource
                            .filter(uA => uA.type == UserAttributeType.Music), UserAttributeType.Music, classes, usersAttributes, doUpdate)
                    }
                    {
                        printUserAttributes(attributesDataSource
                            .filter(uA => uA.type == UserAttributeType.Sport), UserAttributeType.Sport, classes, usersAttributes, doUpdate)
                    }
                    {
                        printUserAttributes(attributesDataSource
                            .filter(uA => uA.type == UserAttributeType.Film), UserAttributeType.Film, classes, usersAttributes, doUpdate)
                    }
                </Grid>
            </CardContent>
        </Card>
    )
};

export default ProfileEditAttributes;