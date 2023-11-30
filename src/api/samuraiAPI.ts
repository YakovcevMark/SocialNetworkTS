import axios from "axios";
import {FormikValues} from "formik";

export type SessionUserType = {
    id: number
    email: string
    login: string
}
export type ContactT = {
    [key: string]: string
}
export type PhotosT = {
    small: string
    large: string
}
export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactT
    aboutMe?: string
    photos: PhotosT
}
export enum ResultCodes{
    Success,
    Error,
    CaptchaIsRequired = 10
}

export type ResponseType<T = {}> = {
    data: T
    resultCode: ResultCodes
    messages: string[]
}
export type UserT = {
    id: number
    name: string
    status: string
    photos: PhotosT
    followed: boolean
}
type UsersResponseT = {
    items: UserT[]
    totalCount: number
    error: string
}

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "8d09abf8-2a50-4564-8e2f-d00a6cf398df",
    }
})
export const usersAPI = {
    getUsersRequest(pageSize: number, currentPage: number) {
        return instance.get<UsersResponseT>(`users?count=${pageSize}&page=${currentPage}`).then(res => res.data);
    },
    makeFollow(userId: number) {
        return instance.post<ResponseType>(`follow/${userId}`);
    },
    makeUnFollow(userId: number) {
        return instance.delete<ResponseType>(`follow/${userId}`);
    }
}
export const authAPI = {
    authorization() {
        return instance.get<ResponseType<SessionUserType>>(`auth/me`).then(res => res.data);
    },
    login(data: FormikValues) {
        return instance.post<ResponseType<{ userId: number }>>(`auth/login`, {...data}).then(res => res.data);
    },
    logout() {
        return instance.delete<ResponseType>(`auth/login`).then(res => res.data);
    },
}
export const securityAPI = {
    getCaptcha() {
        return instance.get<{ url: string }>(`security/get-captcha-url`)
    }
}

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`).then(res => res.data);
    },
    getStatus(userId: number) {
        return instance.get<ResponseType>(`profile/status/${userId}`).then(res => res.data);
    },
    updateStatus(status: string) {
        return instance.put(`profile/status`, {status});
    },
    updateProfile(profile: ProfileType) {
        return instance.put<ResponseType>(`profile`, {...profile}).then(res => res.data);
    },
    savePhoto(file: File) {
        const formData = new FormData();
        formData.append("image", file)
        return instance.put<ResponseType<PhotosT>>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.data)
    }
}