import { combineReducers } from 'redux';
import authReducers from './AuthReducers';
import siteDataReducers from "./SiteDataReducers";
import menuReducers from "./MenuReducers";

const appReducers = combineReducers({
    authReducers,
    siteDataReducers,
    menuReducers
});

export default appReducers;