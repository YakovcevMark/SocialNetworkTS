import {v1} from "uuid";


export type PostT = {
    id: number
    postBody: string
    likesCount: number
    dislikesCount: number
}

export type ProfileStateT = {
    postsData: PostT[]
    profileInfo?: { } | null
    status?: string
    isFetching?: boolean
}

const profilePage:ProfileStateT= {
    postsData: [
        {id: 0, postBody: "Hi! I love you", likesCount: 15, dislikesCount: 0},
        {id: 1, postBody: "i really hate u!!!!!!!!!!!", likesCount: 20, dislikesCount: 0},
    ],
    profileInfo: null,
    status: '',
    isFetching: true,
};
export const profilePageReducer = (state: ProfileStateT = profilePage, action: ActionTypesAT):ProfileStateT => {
    switch (action.type) {
        case "ADD_POST":
            const newPost = {
                id: state.postsData.length + 1,
                postBody: action.newPostBody,
                likesCount: 0,
                dislikesCount:0
            };
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
export const setProfileInfo = (profileInfo: {}) => (
    {type: "SET_PROFILE_INFO", profileInfo} as const
)
export const togglePreloader = (isFetching: boolean) => (
    {type: "TOGGLE_PRELOADER", isFetching} as const
);
export const setProfileStatus = (status: string) => (
    {type: "SET_PROFILE_STATUS", status} as const
);
export const setProfilePhoto = (photos: any) => (
    {type: "SET_PROFILE_PHOTO", photos} as const
);
// export const getProfileInfoRequest = (userId) => async (dispatch) => {
//     dispatch(togglePreloader(true));
//     const resp = await profileAPI.getProfile(userId)
//     dispatch(setProfileInfo(resp.data));
//     dispatch(togglePreloader(false));
// };
// export const getProfileStatusRequest = (userId) => async (dispatch) => {
//     const resp = await profileAPI.getStatus(userId)
//     dispatch(setProfileStatus(resp.data));
// };
// export const updateProfileStatusRequest = (status) => async (dispatch) => {
//     await profileAPI.updateStatus(status)
//     dispatch(setProfileStatus(status));
// };
// export const updateProfileRequest = (profile, setErrors) => async (dispatch) => {
//
//     const resp = await profileAPI.updateProfile(profile)
//     if (resp.data.resultCode !== 0) {
//         setErrors({apiError: resp.data.messages});
//     } else {
//         dispatch(getProfileInfoRequest(profile.userId));
//     }
// };
// export const savePhoto = (file) => async (dispatch) => {
//     const resp = await profileAPI.savePhoto(file)
//     dispatch(setProfilePhoto(resp.data.photos));
// };
// export default profilePageReducer;
