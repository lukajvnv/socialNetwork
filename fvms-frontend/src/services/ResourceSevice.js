import { uploadFile } from "../base/HTTP";
import HttpMethod from "../constants/HttpMethod";

export async function uploadImage(data) {
    return await uploadFile('resource/image/upload', data, HttpMethod.POST);
}

export async function uploadPostImage(data) {
    return await uploadFile('resource/post/image/upload', data, HttpMethod.POST);
}

export async function uploadPdfFile(data) {
    return await uploadFile('resource/doc/upload', data, HttpMethod.POST);
}