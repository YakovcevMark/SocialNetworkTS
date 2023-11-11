import axios from "axios";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {"API-KEY": "8d09abf8-2a50-4564-8e2f-d00a6cf398df"}
})
export const usersAPI = {
    getUsersRequest(pageSize, currentPage) {
        return instance.get(`users?count=${pageSize}&page=${currentPage}`);
    },
    makeFollow(userId) {
        return instance.post(`follow/${userId}`);
    },
    makeUnFollow(userId) {
        return instance.delete(`follow/${userId}`);
    }
}
export const authAPI = {
    authorization() {
        return instance.get(`auth/me`);
    },
    login(data) {
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
    getProfile(userId) {
        return instance.get(`profile/${userId}`);
    },
    getStatus(userId) {
        return instance.get(`profile/status/${userId}`);
    },
    updateStatus(status) {
        return instance.put(`profile/status`, {status});
    },
    updateProfile(profile) {
        return instance.put(`profile`, {...profile});
    },
    savePhoto(file) {
        const formData = new FormData();
        formData.append("image", file)
        return instance.put(`profile/photo`, formData, {
            header: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}