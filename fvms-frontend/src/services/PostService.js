import { request } from "../base/HTTP";
import HttpMethod from "../constants/HttpMethod";


export async function post(data) {
    return await request('/post', data, HttpMethod.POST);
}

export async function postComment(data) {
    return await request('/post/comment', data, HttpMethod.POST);
}

export async function getPosts(page, perPage) {
    if(page && perPage){
        // return await request(`/post/all?page=${page}&perPage=${perPage}`);
        return await getPostsSearchs(page, perPage);
    }
    return await request('/post/all');
}

export async function getPostsSearch(page, perPage) {
    return await request(`/post/all?page=${page}&perPage=${perPage}`);
}

export async function getPostsSearchs(page, perPage) {
    const params = {
        page: page,
        perPage: perPage
    }
    return await request('/post/all', {}, HttpMethod.GET, {params});
}

export async function getUserPosts(friendEmail = '') {
    if(friendEmail) {
        return await request('/post/user?user=' + friendEmail);
    } else {
        return await request('/post/user');
    }
}