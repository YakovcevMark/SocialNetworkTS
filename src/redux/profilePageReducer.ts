import {profileAPI} from "../api/samuraiAPI";
import {Dispatch} from "redux";

export type PostT = {
    id: number
    postBody: string
    likesCount: number
    dislikesCount: number
}
export type ContactT = {
    [key: string]: string

}
export type PhotosT = {
    small: string
    large: string
}
export type ProfileInfoT = {
    aboutMe: string
    contacts: ContactT

    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    userId: number
    photos: PhotosT
}
export type ProfileStateT = typeof profilePage

const profilePage = {
    postsData: [
        {id: 0, postBody: "Hi! I love you", likesCount: 15, dislikesCount: 0},
        {id: 1, postBody: "i really hate u!!!!!!!!!!!", likesCount: 20, dislikesCount: 0},
    ] as PostT[],
    profileInfo: {} as ProfileInfoT,
    status: '',
    isFetching: true,
}

export const profilePageReducer = (state: ProfileStateT = profilePage, action: ActionTypesAT): ProfileStateT => {
    switch (action.type) {
        case "ADD_POST":
            const newPost = {
                id: state.postsData.length + 1,
                postBody: action.newPostBody,
                likesCount: 0,
                dislikesCount: 0
            }
            return {
                ...state,
                postsData: [...state.postsData, newPost]
            }
        case "DELETE_POST":
            return {
                ...state,
                postsData: state.postsData.filter(p => p.id !== action.postId)
            }
        case "SET_PROFILE_INFO":
            return {
                ...state,
                profileInfo: {
                    ...action.profileInfo
                }
            }
        case "SET_PROFILE_STATUS":
            return {
                ...state,
                status: action.status
            }
        case "TOGGLE_PRELOADER":
            return {
                ...state,
                isFetching: action.isFetching
            }
        case "SET_PROFILE_PHOTO":
            return {
                ...state,
                profileInfo: {...state.profileInfo, photos: action.photos}
            }
        default:
            return state;
    }
}
type ActionTypesAT =
    ReturnType<typeof addPost> | ReturnType<typeof deletePost> |
    ReturnType<typeof setProfileInfo> | ReturnType<typeof togglePreloader> |
    ReturnType<typeof setProfilePhoto> | ReturnType<typeof setProfileStatus>
export const addPost = (newPostBody: string) => (
    {type: "ADD_POST", newPostBody} as const
)
export const deletePost = (postId: number) => (
    {type: "DELETE_POST", postId} as const
)
export const setProfileInfo = (profileInfo: ProfileInfoT) => (
    {type: "SET_PROFILE_INFO", profileInfo} as const
)
export const togglePreloader = (isFetching: boolean) => (
    {type: "TOGGLE_PRELOADER", isFetching} as const
)
export const setProfileStatus = (status: string) => (
    {type: "SET_PROFILE_STATUS", status} as const
)
export const setProfilePhoto = (photos: PhotosT) => (
    {type: "SET_PROFILE_PHOTO", photos} as const
)
export const getProfileInfoRequest = (userId: number) => async (dispatch: Dispatch) => {
    dispatch(togglePreloader(true));
    const resp = await profileAPI.getProfile(userId)
    dispatch(setProfileInfo(resp.data));
    dispatch(togglePreloader(false));
};
export const getProfileStatusRequest = (userId: number) => async (dispatch: Dispatch) => {
    const resp = await profileAPI.getStatus(userId)
    dispatch(setProfileStatus(resp.data));
};
export const updateProfileStatusRequest = (status:string) => async (dispatch: Dispatch) => {
    await profileAPI.updateStatus(status)
    dispatch(setProfileStatus(status));
};
// export const updateProfileRequest = (profile:ProfileInfoT, setErrors:({apiError:string}) => void) => async (dispatch: Dispatch) => {
//
//     const resp = await profileAPI.updateProfile(profile)
//     if (resp.data.resultCode !== 0) {
//         setErrors({apiError: resp.data.messages});
//     } else {
//         dispatch(getProfileInfoRequest(profile.userId));
//     }
// };
export const savePhoto = (file:File) => async (dispatch: Dispatch) => {
    const resp = await profileAPI.savePhoto(file)
    dispatch(setProfilePhoto(resp.data.photos));
};
