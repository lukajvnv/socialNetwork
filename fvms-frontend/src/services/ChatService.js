import { request } from "../base/HTTP";
import HttpMethod from "../constants/HttpMethod";


export async function postMessage(data) {
    return await request('/message', data, HttpMethod.POST);
}

export async function getMessages() {
    return await request('/message/all');
}

export async function getMessagesWithUser(friend) {
    return await request('/message/all/by/' + friend);
}
