import { request } from "../base/HTTP";
import HttpMethod from "../constants/HttpMethod";


export async function post(data) {
    return await request('/post', data, HttpMethod.POST);
}

export async function getPosts(data) {
    return await request('/post/all');
}

export async function getUserPosts(data) {
    return await request('/post/user');
}