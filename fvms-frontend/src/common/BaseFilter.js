import React from 'react'

import {Button, Drawer, Grid, IconButton} from "@material-ui/core";
import  ChevronRight from "@material-ui/icons/ChevronRight"
import FormComponent from "./FormComponent";
import strings from "../localization";

class BaseFilter extends FormComponent {

    constructor(props) {
        super(props);

        this.state = {
            open: props.open,
            data: props.searchData ? props.searchData : {}
        }
    }

    componentWillReceiveProps(props) {

        this.state.open = props.open;
    }

    toggleFilter(open) {
        this.setState({
            open: open
        });
    }

    search() {

        if(!this.props.onChange) {
            return;
        }

        this.props.onChange(this.state.data);
    }

    renderContent() {
        return (<div className='filter-content-container'>

        </div>)
    }

    render() {

        return (
            <Drawer id='filter' anchor='right' open={ this.state.open } onClose={ () => this.toggleFilter(false) } >

                <Grid>
                    <div className='filter-header'>
                        <IconButton onClick={ () => this.toggleFilter(false) }>
                            <ChevronRight/>
                        </IconButton>
                    </div>

                    { this.renderContent() }
                    <div className='control-container'>
                        <Button color='primary' variant="contained" onClick={ () => this.search() }>
                            { strings.filter.search }
                        </Button>
                    </div>
                </Grid>

            </Drawer>
        );

    }

}

export default BaseFilter;