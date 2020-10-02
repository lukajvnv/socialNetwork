import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import { checkPath } from '../route';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {isUserLocked, isUserLoggedIn} from "./OAuth";

class AuthWrapper extends Component {

    constructor(props) {
        super(props);
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            window.scrollTo(0, 0);
        }
    }

    checkPermission() {

        let needAuth = checkPath(this.props.location.pathname);

        if(needAuth && isUserLocked()) {

            this.props.history.push({
                pathname: '/lock',
                state   : { redirectUrl: this.props.location.pathname }
            });

            return false;
        }
        else if(needAuth && !isUserLoggedIn()) {

            this.props.history.push({
                pathname: '/login',
                state   : { redirectUrl: this.props.location.pathname }
            });

            return false;
        }

        return true;
    }

    render() {

        if(!this.checkPermission()) {
            return '';
        }

        const {children} = this.props;

        return (
            <React.Fragment>
                { children }
            </React.Fragment>
        )
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({}, dispatch);
}

function mapStateToProps({ authReducers })
{
    return {
        auth: authReducers,
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthWrapper));
