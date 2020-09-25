import React, {Component} from 'react'
import strings from "../../localization";
import BaseControl from './BaseControl';
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";

class DatePickerControl extends BaseControl {

    constructor(props) {
        super(props);

        this.state = {
            date: props.date,
            name: props.name ? props.name: '',
            hasError: props.hasError,
            error: props.error ? props.error : '',
            placeholder: props.placeholder ? props.placeholder : '',
            dateFormat: props.dateFormat ? props.dateFormat : 'MM/dd/yyyy',
            showTimeSelect: props.showTimeSelect ? props.showTimeSelect : false
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            date: props.date,
            hasError: props.hasError,
            error: props.error ? props.error : '',
            placeholder: props.placeholder ? props.placeholder : ''
        });
    }

    handleChange(date) {

        this.onChange({
            target: {
                name: this.state.name,
                value: date
            }
        });
    }

    render() {

        return (
            <div className={'datepicker-control-container' + (this.state.hasError ? ' error' : '')}>
                <label>{ this.props.label }</label>
                <DatePicker
                    placeholderText={ this.state.placeholder }
                    selected={this.state.date}
                    onChange={(date) => this.handleChange(date)}
                    dateFormat={this.state.dateFormat}
                    showTimeSelect={this.state.showTimeSelect}
                    isClearable={ true }
                />

                {
                    this.state.hasError &&
                    <p className='error'>{ this.state.error }</p>
                }
            </div>
        )
    }
}

export default DatePickerControl;