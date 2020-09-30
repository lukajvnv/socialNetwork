import CONFIG from '../config';
import HttpMethod from '../constants/HttpMethod';
import { request, requestFile } from './HTTP';
import history from '../history';
import { isUserOneOfRoles, isUserRole } from "../util/UserUtil";

import qs from 'qs';

/** OAUTH **/

export async function login(username, password) {

    clearUserData();

    let data = {
        client_id: CONFIG.clientId,
        client_secret: CONFIG.clientSecret,
        grant_type: 'password',
        username: username,
        password: password
    };

    return await requestFile('oauth/token', qs.stringify(data), HttpMethod.POST).then((response) => {

        if (!response.ok) {
            return response;
        }

        setTokenToLocalStorage(response.data.access_token, response.data.refresh_token);

        return request('/user/current').then((response) => {

            if (response.data) {

                if (isUserOneOfRoles(response.data, CONFIG.rolesAllowed)) {
                    setUserToLocalStorage(response.data)
                }
                else {

                    clearUserData();
                    response.ok = false;

                }
            }

            return response;
        });
    }
    );
}

export async function unlock(username, password) {

    clearUserDataLock();

    let data = {
        client_id: CONFIG.clientId,
        client_secret: CONFIG.clientSecret,
        grant_type: 'password',
        username: username,
        password: password
    };

    return await request('/oauth/token', data, HttpMethod.GET).then((response) => {

        if (!response.ok) {
            return response;
        }

        setTokenToLocalStorage(response.data.access_token, response.data.refresh_token);

        return response;
    }
    );
}

export async function socialLogin(provider, email, firstName, lastName, socialId, accessToken, expiresAt) {

    let data = {
        provider: provider,
        email: email,
        firstName: firstName ? firstName : '',
        lastName: lastName ? lastName : '',
        socialId: socialId,
        accessToken: accessToken,
        expiresAt: expiresAt
    };

    return await request('/social/authenticate', data, HttpMethod.POST).then((response) => {

        if (!response.ok) {
            return;
        }

        setSocialTokenToLocalStorage(response.data.access_token);

        return request('/user/current').then((response) => {

            if (response.data.user) {

                if (isUserOneOfRoles(response.data.user, CONFIG.rolesAllowed)) {
                    setUserToLocalStorage(response.data.user)
                }
                else {

                    clearUserData();
                    response.ok = false;

                }
            }

            return response;
        });
    });
}

export async function refreshToken(refreshToken) {

    let data = {
        client_id: CONFIG.clientId,
        client_secret: CONFIG.clientSecret,
        grant_type: 'refresh_token',
        refresh_token: refreshToken
    };

    return await request('/oauth/token', data, HttpMethod.GET).then((response) => {

        if (response.data && response.data.access_token && response.data.refresh_token) {
            setTokenToLocalStorage(response.data.access_token, response.data.refresh_token);
        }

        return true;
    }
    );
}

export function logout() {
    clearUserData();
    history.push("/");
}

export function lock() {
    clearUserDataLock();
    history.push("/");
}

/** LOCAL STORAGE  **/

export function setUserToLocalStorage(user) {
    localStorage.setItem('user', JSON.stringify(user));
}

export function setUserFriendsToLocalStorage(friends) {
    localStorage.setItem('friends', JSON.stringify(friends));
}

export function getUserFromLocalStorage() {
    let user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

export function getUserFriendsFromLocalStorage() {
    let friends = localStorage.getItem('friends');
    return friends ? JSON.parse(friends) : [];
}

export function setTokenToLocalStorage(access_token, refresh_token) {
    localStorage.setItem(CONFIG.tokenKey, access_token);
    localStorage.setItem(CONFIG.refreshTokenKey, refresh_token);
}

export function getRefreshToken() {
    return localStorage.getItem(CONFIG.refreshTokenKey);
}

export function getToken() {
    return localStorage.getItem(CONFIG.tokenKey);
}

export function setSocialTokenToLocalStorage(access_token) {
    localStorage.setItem(CONFIG.socialTokenKey, access_token);
}

export function clearUserData() {
    localStorage.removeItem('user');
    localStorage.removeItem('friends');
    clearUserDataLock();
}

export function updateUserData(user) {
    localStorage.removeItem('user');
    setUserToLocalStorage(user);
}

function clearUserDataLock() {
    localStorage.removeItem(CONFIG.tokenKey);
    localStorage.removeItem(CONFIG.refreshTokenKey);
}

export function isUserLoggedIn() {
    return getUserFromLocalStorage() != null && getToken();
}

export function isUserLocked() {
    return getUserFromLocalStorage() && !getToken();
}