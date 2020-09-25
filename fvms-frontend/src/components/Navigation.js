import React, {Component} from 'react'
import {bindActionCreators} from "redux";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import MenuState from "../constants/MenuState";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SendIcon from '@material-ui/icons/Send';
import FacebookIcon from '@material-ui/icons/Facebook';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import {Drawer} from "@material-ui/core";

import {request} from '../base/HTTP';
import HttpMethod from '../constants/HttpMethod';
import IconButton from "@material-ui/core/IconButton";

class Navigation extends Component {

    constructor(props) {
        super(props);

        this.state = {

            submenu: {
                example: false
            }
        };

        this.test = this.test.bind(this);
    }

    getNavigationClass() {

        if(this.props.menu.state === MenuState.SHORT) {
            return 'navigation-content-container short';
        }
        else {
            return 'navigation-content-container'
        }
    }

    isCurrentPath(path) {
        return this.props.history.location.pathname == path;
    }

    toggleSubmenu(key) {

        let submenu = this.state.submenu;

        submenu[key] = !submenu[key];

        this.setState({
            submenu: submenu
        });
    }

    test() { 
        // request('http://localhost:8081/test/hello',{email: 'fdjlk'}, HttpMethod.POST).then((response) => {
        //     console.log(response);
        // });

        fetch('http://localhost:8081/resource/doc/name/IT_kratak_pregled.pdf')
			.then(response => {
				response.blob().then(blob => {
					let url = window.URL.createObjectURL(blob);
					let a = document.createElement('a');
					a.href = url;
					a.download = 'employees.pdf';
					a.click();
				});
				//window.location.href = response.url;
		});
    }

    render() {

        return (
            <Drawer variant="permanent" id='navigation'>

                <div className={ this.getNavigationClass() }>
                    <div className='logo-container'>
                        <div className='logo'>
                            <Link to={'/'}  >
                                <IconButton>
                                    <FacebookIcon />
                                </IconButton>
                            </Link> 
                        </div>
                        <div className='title'>
                            <h2>Social network</h2>
                        </div>
                    </div>                    

                    <button onClick={this.test}>Test</button>
                    <List component="nav">
                        <Link to={'/profile'} className={ this.isCurrentPath('/profile') ? 'navigation-link active' : 'navigation-link'} >
                            <ListItem className='navigation-item'>

                                <ListItemIcon className='navigation-icon'>
                                    <SendIcon/>
                                </ListItemIcon>

                                <ListItemText inset primary={'Sent mail'} className='navigation-text'/>

                            </ListItem>
                        </Link>
                        <Link to={'/login'} className={ this.isCurrentPath('/login') ? 'navigation-link active' : 'navigation-link'} >
                            <ListItem className='navigation-item'>

                                <ListItemIcon className='navigation-icon'>
                                    <SendIcon/>
                                </ListItemIcon>

                                <ListItemText inset primary='Sent mail' className='navigation-text'/>

                            </ListItem>
                        </Link>
                        <Link to={'/table'} className={ this.isCurrentPath('/table') ? 'navigation-link active' : 'navigation-link'} >
                            <ListItem className='navigation-item'>

                                <ListItemIcon className='navigation-icon'>
                                    <SendIcon/>
                                </ListItemIcon>

                                <ListItemText inset primary='Sent mail' className='navigation-text'/>

                            </ListItem>
                        </Link>
                        <Link to={'/'} className={ this.isCurrentPath('/') ? 'navigation-link active' : 'navigation-link'} >
                            <ListItem className='navigation-item'>

                                <ListItemIcon className='navigation-icon'>
                                    <SendIcon/>
                                </ListItemIcon>

                                <ListItemText inset primary='Sent mail' className='navigation-text'/>

                            </ListItem>
                        </Link>
                        <ListItem className='navigation-item' button onClick={ () => this.toggleSubmenu('example') } >
                            <ListItemIcon className='navigation-icon'>
                                <SendIcon/>
                            </ListItemIcon>

                            <ListItemText inset primary='Sent mail' className='navigation-text'/>
                            { this.state.submenu.example ? <ExpandLess className='navigation-icon'/> : <ExpandMore className='navigation-icon'/> }
                        </ListItem>
                        <Collapse in={ this.state.submenu.example } timeout="auto" unmountOnExit>
                            <List component="div" disablePadding className='submenu'>
                                <Link to={'/'} className={ this.isCurrentPath('/') ? 'navigation-link active' : 'navigation-link'} >
                                    <ListItem className='navigation-item'>

                                        <ListItemIcon className='navigation-icon'>
                                            <SendIcon/>
                                        </ListItemIcon>

                                        <ListItemText inset primary='Sent mail' className='navigation-text'/>

                                    </ListItem>
                                </Link>
                                <Link to={'/'} className={ this.isCurrentPath('/') ? 'navigation-link active' : 'navigation-link'} >
                                    <ListItem className='navigation-item'>

                                        <ListItemIcon className='navigation-icon'>
                                            <SendIcon/>
                                        </ListItemIcon>

                                        <ListItemText inset primary='Sent mail' className='navigation-text'/>

                                    </ListItem>
                                </Link>
                            </List>
                        </Collapse>
                        
                    </List>
                </div>



            </Drawer>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({}, dispatch);
}

function mapStateToProps({ menuReducers, authReducers })
{
    return { menu: menuReducers, auth: authReducers };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navigation));