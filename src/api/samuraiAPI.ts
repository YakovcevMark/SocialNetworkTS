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
type ResponseType<T = {}> = {
    data: T
    resultCode: number
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
const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '8d09abf8-2a50-4564-8e2f-d00a6cf398df'
    }
}
const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    ...settings
})
export const usersAPI = {
    getUsersRequest(pageSize: number, currentPage: number) {
        return instance.get<UsersResponseT>(`users?count=${pageSize}&page=${currentPage}`);
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
        return instance.get<ResponseType<SessionUserType>>(`auth/me`);
    },
    login(data: FormikValues) {
        return instance.post<ResponseType<{ userId: number }>>(`auth/login`, {...data});
    },
    logout() {
        return instance.delete<ResponseType>(`auth/login`);
    },
}
export const securityAPI = {
    getCaptcha() {
        return instance.get<{ url: string }>(`security/get-captcha-url`)
    }
}

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`);
    },
    getStatus(userId: number) {
        return instance.get<ResponseType>(`profile/status/${userId}`);
    },
    updateStatus(status: string) {
        return instance.put(`profile/status`, {status});
    },
    updateProfile(profile: ProfileType) {
        return instance.put<ResponseType>(`profile`, {...profile});
    },
    savePhoto(file: File) {
        const formData = new FormData();
        formData.append("image", file)
        return instance.put<ResponseType<PhotosT>>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}