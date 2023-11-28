import axios from "axios";
import {AuthUserDataT} from "../redux/authReducer";
import {ProfileInfoT} from "../redux/profilePageReducer";
import {FormikValues} from "formik";
export type SessionUserType = {
    id:number
    email:string
    login:string
}
export type ProfileType = {

}
type ResponseType<T> = {
    data:T
    resultCode:number
    messages:string[]
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
    getUsersRequest(pageSize:number, currentPage:number) {
        return instance.get(`users?count=${pageSize}&page=${currentPage}`);
    },
    makeFollow(userId:number) {
        return instance.post(`follow/${userId}`);
    },
    makeUnFollow(userId:number) {
        return instance.delete(`follow/${userId}`);
    }
}
export const authAPI = {
    authorization() {
        return instance.get(`auth/me`);
    },
    login(data:FormikValues) {
        return instance.post(`auth/login`, {...data});
    },
    logout() {
        return instance.delete(`auth/login`);
    },
}
export const securityAPI = {
    getCaptcha(){
        return instance.get(`security/get-captcha-url`)
    }

}
export const profileAPI = {
    getProfile(userId:number) {
        return instance.get(`profile/${userId}`);
    },
    getStatus(userId:number) {
        return instance.get(`profile/status/${userId}`);
    },
    updateStatus(status:string) {
        return instance.put(`profile/status`, {status});
    },
    updateProfile(profile:ProfileInfoT) {
        return instance.put(`profile`, {...profile});
    },
    savePhoto(file:File) {
        const formData = new FormData();
        formData.append("image", file)
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}