import React, {Component} from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { emphasize } from '@material-ui/core/styles/colorManipulator';

import Select from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import {FormControl, InputLabel, MenuItem, NoSsr, Paper, TextField, Typography} from "@material-ui/core";
import BaseControl from "./controls/BaseControl";

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: 250,
    },
    input: {
        display: 'flex',
        padding: 0,
    },
    valueContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: 1,
        alignItems: 'center',
        overflow: 'hidden',
    },
    chip: {
        margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
    },
    chipFocused: {
        backgroundColor: emphasize(
            theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
            0.08,
        ),
    },
    noOptionsMessage: {
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
    singleValue: {
        fontSize: 16,
    },
    placeholder: {
        position: 'absolute',
        left: 2,
        fontSize: 16,
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
    },
    divider: {
        height: theme.spacing.unit * 2,
    },
});

function NoOptionsMessage(props) {
    return (
        <Typography
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

function inputComponent({ inputRef, ...props }) {

    return <div ref={inputRef} {...props}/>;
}

function Control(props) {

    return (
        <TextField
            error={ props.selectProps.error }
            helperText={ props.selectProps.helperText }
            fullWidth
            InputProps={{
                inputComponent,
                inputProps: {
                    className: props.selectProps.classes.input,
                    inputRef: props.innerRef,
                    children: props.children,
                    ...props.innerProps,
                },
            }}
            {...props.selectProps.textFieldProps}
        />
    );
}

function Option(props) {
    return (
        <MenuItem
            buttonRef={props.innerRef}
            selected={props.isFocused}
            component="div"
            style={{
                fontWeight: props.isSelected ? 500 : 400,
            }}
            {...props.innerProps}
        >
            {props.children}
        </MenuItem>
    );
}

function Placeholder(props) {

    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.placeholder}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

function SingleValue(props) {

    return (
        <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
            {props.children}
        </Typography>
    );
}

function ValueContainer(props) {
    return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function Menu(props) {

    return (
        <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
            {props.children}
        </Paper>
    );
}

const components = {
    Control,
    Menu,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer,
};

class Autocomplete extends BaseControl {

    constructor(props) {
        super(props);

        this.state = {
            items: props.items ?  this.transformItems(props.items) : [],
            selectedItem: undefined
        };

        this.handleChange = this.handleChange.bind(this)
    }

    componentWillReceiveProps(nextProps) {

        this.state.items = nextProps.items ?  this.transformItems(nextProps.items) : [];
        this.state.selectedItem = nextProps.selectedItem
    }

    transformItems(items) {
        return items.map(item => (this.transformItem(item)));
    }

    transformItem(item) {

        if(!item) {
            return item;
        }

        if(item.value && item.label) {
            return item;
        }

        return {
            value: this.props.valueKey ? item[this.props.valueKey] : item,
            label: item[this.props.displayKey]
        }
    }

    handleChange(event) {

        this.setState({ selectedItem: event }, () => {

            this.createEvent(event)
        });
    }

    render() {

        const { classes, theme } = this.props;

        const selectStyles = {
            input: base => ({
                ...base,
                color: theme.palette.text.primary,
                '& input': {
                    font: 'inherit',
                },
            }),
        };

        return (
            <FormControl className='autocomplete'>
                <NoSsr>
                    <Select
                        error={ this.props.error }
                        helperText={ this.props.helperText }
                        classes={classes}
                        styles={selectStyles}
                        options={ this.state.items }
                        components={ components }
                        value={ this.transformItem(this.state.selectedItem) }
                        placeholder={ this.props.placeholder ? this.props.placeholder : '' }
                        onChange={ this.handleChange }
                        isClearable
                        margin="normal"
                        inputProps={{
                            name: this.props.name,
                            id: this.props.name + 'autocomplete',
                        }}
                        autoWidth
                    />
                </NoSsr>
            </FormControl>

        );
    }
}

export default withStyles(styles, { withTheme: true })(Autocomplete);