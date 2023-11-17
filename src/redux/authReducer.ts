import {authAPI, securityAPI} from "../api/samuraiAPI";

export type AuthUserDataT = {
    email: string
    id: number
    login: string
}
const initialState = {
    data: {} as AuthUserDataT,
    isAuth: false,
    captchaURL: ""
}
export type AuthStateT = typeof initialState
const autReducer = (state: AuthStateT = initialState, action: ActionsType): AuthStateT => {
    switch (action.type) {
        case "SET_AUTH_USER_INFO":
            return {...state, isAuth: true, data: {...action.data}}
        // case "SET_CAPTCHA_URL":
        //     return {...state, captchaURL: action.captchaURL}
        default:
            return state;
    }
}
type ActionsType =
    ReturnType<typeof setAuthUserData>
    //| ReturnType<typeof setCaptchaUrl>
export const setAuthUserData = (data:AuthUserDataT) => ({type: "SET_AUTH_USER_INFO", data} as const);
// export const setCaptchaUrl = (captchaURL) => ({type: "SET_CAPTCHA_URL", captchaURL} as const);
//
// export const getAuthUserData = () => async (dispatch) => {
//     const resp = await authAPI.authorization();
//     if (resp.data.resultCode === 0) {
//         dispatch(setAuthUserData({...resp.data.data}));
//     }
// }
// export const login = (data, setErrors) => async (dispatch) => {
//     const resp = await authAPI.login({...data});
//     if (resp.data.resultCode !== 0) {
//         if (resp.data.resultCode === 10) {
//             const respWithCaptcha = await securityAPI.getCaptcha();
//             dispatch(setCaptchaUrl(respWithCaptcha.data.url))
//         }
//         setErrors({apiError: resp.data.messages[0]});
//     } else {
//         dispatch(getAuthUserData());
//     }
// }
// export const logout = () => async (dispatch) => {
//     const resp = await authAPI.logout();
//     if (resp.data.resultCode === 0)
//         dispatch(setAuthUserData({
//             email: null,
//             id: null,
//             login: null,
//             isAuth: false,
//             captchaURL: null
//         }));
// }
export default autReducer;