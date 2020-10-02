import { request } from "../base/HTTP";
import HttpMethod from "../constants/HttpMethod";
import { setUserFriendsToLocalStorage } from "../base/OAuth";

export async function friends(friendEmail = '') {
    if (friendEmail) {
        return await request('/friendship/active?user=' + friendEmail);
    } else {
        return await request('/friendship/active');
    }
}

export async function allFriendships() {
    return await request('/friendship/all');
}

export async function suggestions() {
    return await request('/friendship/suggestions');
}

export async function updateFriendship(data) {
    return await request('/friendship', data, HttpMethod.POST);
}

export function makeFriendsList(friendships, userEmail, shouldSetToStorage = false) {
    const friends = [];
    for (let friendship of friendships) {
        let friend;
        if (userEmail == friendship.receiver.email) {
            friend = friendship.sender;
        } else {
            friend = friendship.receiver;
        }
        friends.push({ friend: friend, id: friendship.id });
    }
    if (shouldSetToStorage) {
        setUserFriendsToLocalStorage(friends);
    }
    return friends;
}