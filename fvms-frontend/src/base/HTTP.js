import CONFIG from '../config';
import AuthenticationTypes from "../constants/AuthenticationTypes";
import HttpMethod from '../constants/HttpMethod';
import history from '../history';
import { clearUserData, getRefreshToken, refreshToken, setTokenToLocalStorage } from './OAuth';
import axios from 'axios';

const Axios = (function () {

    let instance;

    function createInstance() {
        return axios.create({
            baseURL: CONFIG.baseUrl
        });
    }

    return {
        getInstance: function () {

            if (!instance) {
                instance = createInstance();
            }

            if (getTokenType()) {
                instance.defaults.headers.common['Authorization'] = getToken();
            }
            instance.all = axios.all;

            return instance;
        }
    }
})();

Axios.getInstance().interceptors.response.use(response => {

    response.ok = response.status >= 200 && response.status < 300;

    return response;
}, async error => {

    const { response: { status } } = error;

    if (status === 404) {

        history.push('/not-found');
    }
    else if (status === 500) {

        history.push('/error');
    }
    else if (status === 401) {

        history.push('/forbidden');
    }
    else if (status === 403) {

        clearUserData();
        history.push('/');
        return error;
    }

    return error;
});

export async function request(url, data = [], method = HttpMethod.GET, options = {}) {

    return await connect(url, data, method, options);
}

export async function requestFile(url, data = [], method = HttpMethod.GET) {

    try {

        let tokenType = getTokenType();

        let headers = {
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Authorization',
            'Accept': 'application/json'
        };

        if (tokenType) {
            headers['Authorization'] = getToken();
            // if (tokenType === AuthenticationTypes.Basic) {
            //     headers['Content-type'] = 'application/x-www-form-urlencoded';
            // }
        }

        return await connect(CONFIG.baseUrl + url, data, method, { headers }, false);
    } catch (error) {
        history.push("/error");
    }
}

export async function uploadFile(url, data = [], method = HttpMethod.GET) {

    try {

        let tokenType = getTokenType();

        let headers = {
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Authorization',
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        };

        if (tokenType) {
            headers['Authorization'] = getToken();
        }

        return await connect(CONFIG.baseUrl + url, data, method, { headers }, false);
    } catch (error) {
        history.push("/error");
    }
}

export async function connect(url, data, method, options) {

    switch (method) {
        case HttpMethod.GET: {
            return await Axios.getInstance().get(url + makeParametersList(data), options);
        }
        case HttpMethod.POST: return Axios.getInstance().post(url, data, options);
        case HttpMethod.PUT: return Axios.getInstance().put(url, data, options);
        case HttpMethod.DELETE: return Axios.getInstance().delete(url, options);
    }
}

export function makeParametersList(parameters) {
    let parametersList = `?`;

    Object.keys(parameters).map((key, index) => (
        parametersList += parameters[key] ? `${key}=${parameters[key]}&` : ''
    ));

    parametersList = parametersList.slice(0, -1);

    return parametersList === '?' ? '' : parametersList;
}

export function getToken() {

    if (getTokenType() === AuthenticationTypes.BearerToken) {
        return 'Bearer ' + localStorage.getItem(CONFIG.tokenKey);
    }
    else if (getTokenType() === AuthenticationTypes.SocialToken) {
        return 'Social ' + localStorage.getItem(CONFIG.socialTokenKey);
    } else {
        const clientId = CONFIG.clientId;
        let clientSecret = CONFIG.clientSecret;
        clientSecret = 'spring-security-oauth2-read-write-client-password1234';


        const a = btoa(clientId + ':' + clientSecret);
        const g = btoa(`{clientId}:{clientSecret}`);
        return 'Basic ' + a;
        // const headers = new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded', Authorization: 'Basic ' + btoa('polovniautomobili:secret')});
    }

    return '';
}

export function getUserFromLocalStorage() {

    let user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

function getTokenType() {

    if (localStorage.getItem(CONFIG.tokenKey)) {
        return AuthenticationTypes.BearerToken;
    }
    else if (localStorage.getItem(CONFIG.socialTokenKey)) {
        return AuthenticationTypes.SocialToken
    } else {
        return AuthenticationTypes.Basic;
    }

    return null;
}