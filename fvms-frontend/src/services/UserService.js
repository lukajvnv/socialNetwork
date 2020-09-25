import { request } from "../base/HTTP";
import HttpMethod from "../constants/HttpMethod";

export async function signUp(data) {
    return await request('/auth/signUp', data, HttpMethod.POST);
}

export async function updateUser(data) {
    return await request('/user', data, HttpMethod.POST);
}

export async function resetPasswordRequest(data) {
    return await request('/api/users/password/reset', data, HttpMethod.POST);
}

export async function resetPassword(data) {
    return await request('/api/users/password/reset_form', data, HttpMethod.POST);
}

export async function getUserAttributeDataSource() {
    return await request('/user/attributeDatasource');
}

export async function getUserSettingDataSource() {
    return await request('/user/settingDatasource');
}