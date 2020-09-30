import { combineReducers } from 'redux';
import authReducers from './AuthReducers';
import siteDataReducers from "./SiteDataReducers";
import menuReducers from "./MenuReducers";
import friendsReducers from "./FriendsReducers";

const appReducers = combineReducers({
    authReducers,
    siteDataReducers,
    menuReducers,
    friendsReducers
});

export default appReducers;