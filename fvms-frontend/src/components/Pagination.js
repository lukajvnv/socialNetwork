import React, { Component } from 'react'
import CONFIG from "../config";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { IconButton } from "@material-ui/core";

class Pagination extends Component {


    constructor(props) {
        super(props);

        this.state = {
            page: props.page ? props.page : 1,
            perPage: props.perPage ? props.perPage : CONFIG.perPage,
            total: props.total ? props.total : 0,
        };

        this.state.pageNumber = this.getPageNumber(this.state.total, this.state.perPage);
    }

    getPageNumber(total, perPage) {
        return Math.ceil(total / perPage);
    }

    componentWillReceiveProps(props) {
        this.state.total = props.total;
        this.state.page = props.page;
        this.state.pageNumber = this.getPageNumber(props.total, this.state.perPage);
    }

    renderPages() {

        let pageNumber = this.getPageNumber(this.state.total, this.state.perPage);
        let start, end;

        if (pageNumber < 6 || this.state.page - 2 < 1) {
            start = 1;
            end = pageNumber
        }
        else {
            start = this.state.page - 2;
            end = this.state.page + 2;
        }

        let result = [];

        for (let i = start; i <= end; i++) {

            result.push(
                <a onClick={() => this.props.setPage(i)} key={'page-' + i} className={i === this.state.page && 'active'} >{i}</a>
            )
        }

        return result;
    }

    render() {

        if (this.state.total < this.state.perPage || this.state.pageNumber === 1) {
            return '';
        }

        return (
            <div className='pagination'>

                <div className={this.state.page === 1 ? 'controls left disabled' : 'controls left'}>
                    {/* <a onClick={ () => this.props.setPage(1) }><img src={'images/icons/left-arrow.png'}/></a> */}
                    <IconButton onClick={() => this.props.setPage(1)}><ChevronLeftIcon></ChevronLeftIcon></IconButton>
                </div>
                <div className='pages'>
                    {this.renderPages()}
                </div>
                <div className={this.state.page === this.state.pageNumber ? 'controls right disabled' : 'controls right'}>
                    {/* <div className={ this.state.page === this.state.pageNumber ? 'controls right disabled' : 'controls right' }> */}
                    {/* <a onClick={ () => this.props.setPage(this.state.pageNumber) }><img src={'images/icons/right-arrow.png'}/></a> */}
                    <IconButton onClick={() => this.props.setPage(1)}><ChevronRightIcon></ChevronRightIcon></IconButton>
                </div>
            </div>
        );
    }
}

export default Pagination;