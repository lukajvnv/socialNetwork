import React from 'react'
import Select from 'react-select'
import {getDropdownOptions} from '../../util/DropdownUtil';
import BaseControl from './BaseControl';
import CreatableSelect from 'react-select/creatable';

class CreatableSelectControl extends BaseControl {

    constructor(props) {
        super(props);

        this.state = {
            options: getDropdownOptions(props.options ? props.options : [], props.name, props.nameKey ),
            selected: props.selected ? props.selected : undefined,
            valueKey:  props.valueKey ? props.valueKey : '',
            nameKey: props.nameKey ? props.nameKey : '',
            name: props.name ? props.name: '',
            hasError: props.hasError,
            error: props.error ? props.error : '',
            placeholder: props.placeholder ? props.placeholder : 'Select...',
            isLoading: props.isLoading ? props.isLoading : false,
            disabled: props.disabled,
            useLocalization: props.useLocalization,
            localizationData: props.localizationData ? props.localizationData : {}
        }
    }

    componentWillReceiveProps(props) {

        this.setState({
            options: getDropdownOptions(props.options ? props.options : [], props.name, props.nameKey, undefined, props.useLocalization, props.localizationData),
            hasError: props.hasError,
            error: props.error ? props.error : '',
            selected: props.selected ? props.selected : undefined,
            placeholder: props.placeholder ? props.placeholder : 'Select...',
            isLoading: props.isLoading ? props.isLoading : false,
            disabled: props.disabled,
            useLocalization: props.useLocalization,
            localizationData: props.localizationData ? props.localizationData : {}
        })

    }

    getValue() {

        if(!this.state.selected) {
            return null;
        }

        if(this.state.valueKey) {
            const result = this.state.options.find(option => option.value[this.state.valueKey] == this.state.selected[this.state.valueKey]);
            if(result) {
                return result;
            }
        }

        return this.state.options.find(option => option.value[this.state.valueKey] == this.state.selected)
    }

    render() {

        return (
            <div className={'select-control-container' + (this.state.hasError ? ' error' : '')}>
                {
                    this.props.label &&
                    <label>{ this.props.label }</label>
                }

                <CreatableSelect
                    label={ this.props.label }
                    placeholder={ this.state.placeholder }
                    onChange={ (event) => this.onChange(event) }
                    options={ this.state.options }
                    value={this.getValue()}
                    isClearable={ this.props.isClearable }
                    isLoading={this.state.isLoading}
                    isDisabled={this.state.disabled}
                    style={this.props.style}
                    ref={this.props.inputRef}
                />

                {
                    this.state.hasError &&
                    <p className='error'>{ this.state.error }</p>
                }
            </div>
        )
    }
}

export default CreatableSelectControl;