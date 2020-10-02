import {getUserFriendsFromLocalStorage} from "../base/OAuth";

export const FETCH_FRIENDS = '[FRIENDS] FETCH';
export const FETCH_FRIENDS_STORAGE = '[FRIENDS] FETCH STORAGE';

export function fetchFriends(friends) {
    return {
        type: FETCH_FRIENDS,
        friends
    }
}

export function fetchFriendsStorage() {
    return {
        type: FETCH_FRIENDS_STORAGE,
        friends: getUserFriendsFromLocalStorage()
    }
}