import React from 'react'
import {Router} from "react-router-dom";
import { createStore } from "redux";
import appReducers from "./reducers/Reducers";
import {loadUser} from "./actions/AuthActions";
import {fetchFriendsStorage} from "./actions/FriendsActions";
import history from "./history";
import AuthWrapper from "./base/AuthWrapper";
import {getRoutes} from "./route";
import Provider from "react-redux/es/components/Provider";
import BaseLayout from "./base/BaseLayout";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { SnackbarProvider, withSnackbar } from 'notistack';

const theme = createMuiTheme({typography: {
        useNextVariants: true,
    },"palette":{"common":{"black":"#000","white":"#fff"},"background":{"paper":"#fff","default":"#fafafa"},"primary":{"light":"rgba(106, 114, 133, 1)","main":"rgba(55, 66, 88, 1)","dark":"rgba(40, 47, 64, 1)","contrastText":"#fff"},"secondary":{"light":"rgba(245, 84, 112, 1)","main":"rgba(247, 68, 100, 1)","dark":"rgba(245, 39, 76, 1)","contrastText":"#fff"},"error":{"light":"#e57373","main":"#f44336","dark":"#d32f2f","contrastText":"#fff"},"text":{"primary":"rgba(0, 0, 0, 0.87)","secondary":"rgba(0, 0, 0, 0.54)","disabled":"rgba(0, 0, 0, 0.38)","hint":"rgba(0, 0, 0, 0.38)"}}});

console.log(theme);
console.log("theme");

const store = createStore(appReducers);
store.dispatch(loadUser());
store.dispatch(fetchFriendsStorage());

if ('ontouchstart' in document.documentElement) {
    document.body.style.cursor = 'pointer';
}

load();

const App = () => (

    <Provider store={ store }>
        <Router history={history}>
             <SnackbarProvider maxSnack={3}>
                <AuthWrapper>
                    <MuiThemeProvider theme={theme}>
                        <CssBaseline>
                            <BaseLayout>
                                {
                                    getRoutes()
                                }
                            </BaseLayout>
                        </CssBaseline>

                    </MuiThemeProvider>
                </AuthWrapper>
             </SnackbarProvider>
        </Router>
    </Provider>
);

function load() {

}

export default App;
