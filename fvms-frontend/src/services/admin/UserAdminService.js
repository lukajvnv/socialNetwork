import {request} from "../../base/HTTP";
import HttpMethod from "../../constants/HttpMethod";

export async function getUsers(data) {
    return await request('/api/admin/users/', data);
}

export async function getUser(id) {
    return await request('/api/admin/users/' + id);
}

export async function addUser(data) {
    return await request('/api/admin/users', data, HttpMethod.POST);
}

export async function deleteUser(id) {
    return await request('/api/admin/users/' + id, {} , HttpMethod.DELETE);
}

export async function restoreUser(id) {
    return await request('/api/admin/users/restore/' + id, {} , HttpMethod.PUT);
}