import React from 'react';
import Home from './pages/Home';
import Error from "./pages/Error";
import Forbidden from "./pages/Forbidden";
import NotFound from "./pages/NotFound";

import { Route } from 'react-router-dom';
import { isUserLoggedIn } from "./base/OAuth";
import Login from "./pages/user/Login";
import Lock from "./pages/user/Lock";
import UserList from "./pages/admin/users/UserList";
import SignUp from "./pages/user/SignUp";
import Profile from "./pages/user/profile/Profile";
import Chat from "./pages/user/profile/chat/Chat";
import TablePage from "./common/TablePage";
import ProfileSettings from './pages/user/profile/settings/ProfileSettings';

let ROUTES = {
    Home: {
        path: '/',
        component: <Home />,
        auth: false
    },
    Error: {
        path: '/error',
        component: <Error />,
        auth: false
    },
    Forbidden: {
        path: '/forbidden',
        component: <Forbidden />,
        auth: false
    },
    NotFound: {
        path: '/not-found',
        component: <NotFound />,
        auth: false
    },
    Login: {
        path: '/login',
        component: <Login />,
        auth: false
    },
    SignUp: {
        path: '/sign-up',
        component: <SignUp />,
        auth: false
    },
    Lock: {
        path: '/lock',
        component: <Lock />,
        auth: false
    },
    UserList: {
        path: '/users',
        component: <UserList showFilter={false} />,
        auth: true
    },
    Profile: {
        path: '/profile',
        component: <Profile />,
        auth: true
    },
    Chat: {
        path: '/chat',
        component: <Chat />,
        auth: true
    },
    Settings: {
        path: '/settings',
        component: <ProfileSettings />,
        auth: true
    },
    Table: {
        path: '/table',
        component: <TablePage />,
        auth: true
    }
};

export default ROUTES;

function getRoute(path) {

    for (const [key, value] of Object.entries(ROUTES)) {

        if (value.path === path) {
            return value;
        }
    }

    return null;
}

export function checkPath(path) {

    let pathObject = getRoute(path);

    if (!pathObject) {
        return true;
    }

    if (pathObject.auth) {
        return !isUserLoggedIn();
    }

    return false;
}

export function getRoutes() {

    let result = [];

    for (const [key, value] of Object.entries(ROUTES)) {

        result.push(
            <Route key={'route-' + result.length} exact path={value.path} render={() => (
                value.component
            )} />
        )
    }

    return result;
}