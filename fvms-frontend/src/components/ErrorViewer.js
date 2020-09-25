import React, {Component} from 'react';

class ErrorViewer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errors: props.errors,
            type: props.type
        };
    }

    getErrors() {

        let result = [];
        let errors = this.props.errors[this.props.type];

        for (let i = 0; i < errors.length; i++) {
            result.push(
                <li key={ 'error- ' + this.props.type + '-' + i } >{errors[i].message}</li>
            )
        }

        return result;
    }

    render () {

        return this.props.errors[this.props.type] ? this.props.errors[this.props.type].map((error) =>{
            return (

                <ul className='error-container' key={ 'error- container-' + this.props.type }>
                    { this.getErrors() }
                </ul>
            )
        }) : '';
    }
}

export default ErrorViewer;