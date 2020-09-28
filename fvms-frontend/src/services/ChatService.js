import { request } from "../base/HTTP";
import HttpMethod from "../constants/HttpMethod";


export async function post(data) {
    return await request('/message', data, HttpMethod.POST);
}

export async function getMessages(data) {
    return await request('/message/all');
}
