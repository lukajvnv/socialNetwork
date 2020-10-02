import { combineReducers } from 'redux';
import authReducers from './AuthReducers';
import siteDataReducers from "./SiteDataReducers";
import menuReducers from "./MenuReducers";
import friendsReducers from "./FriendsReducers";
import chatReducers from "./ChatReducers";

const appReducers = combineReducers({
    authReducers,
    siteDataReducers,
    menuReducers,
    friendsReducers,
    chatReducers
});

export default appReducers;