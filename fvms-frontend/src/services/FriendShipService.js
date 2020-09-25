import { request } from "../base/HTTP";
import HttpMethod from "../constants/HttpMethod";

export async function friends() {
    return await request('/friendship/active');
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