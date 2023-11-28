import {authAPI, securityAPI} from "../api/samuraiAPI";
import {Dispatch} from "redux";
import {FormikErrors, FormikValues} from "formik";

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
        case "SET_CAPTCHA_URL":
            return {...state, captchaURL: action.captchaURL}
        case "CLEAR_SESSION_USER_DATA":
            return {...state, data: {id: 0, login: "", email: ""}, isAuth: false, captchaURL: ""}
        default:
            return state;
    }
}
type ActionsType =
    ReturnType<typeof setAuthUserData>
    | ReturnType<typeof setCaptchaUrl>
    | ReturnType<typeof clearSessionUserData>
export const setAuthUserData = (data: AuthUserDataT) => ({type: "SET_AUTH_USER_INFO", data} as const);
export const setCaptchaUrl = (captchaURL: string) => ({type: "SET_CAPTCHA_URL", captchaURL} as const);
export const clearSessionUserData = () => ({type: "CLEAR_SESSION_USER_DATA"} as const);

export const getAuthUserData = () => async (dispatch: Dispatch) => {
    const resp = await authAPI.authorization();
    if (resp.data.resultCode === 0) {
        dispatch(setAuthUserData({...resp.data.data}));
    }
}
export const loginRequest = (data: FormikValues, setStatus: (status:string) => void) => async (dispatch: Dispatch) => {
    const resp = await authAPI.login({...data});
    if (resp.data.resultCode !== 0) {
        if (resp.data.resultCode === 10) {
            const respWithCaptcha = await securityAPI.getCaptcha();
            dispatch(setCaptchaUrl(respWithCaptcha.data.url))
        }
        // setErrors({[apiError]: resp.data.messages[0]});
        setStatus( resp.data.messages[0]);
    } else {
        const resp = await authAPI.authorization();
        if (resp.data.resultCode === 0) {
            dispatch(setAuthUserData({...resp.data.data}));
        }
        // dispatch(getAuthUserData());
    }
}
export const logoutRequest = () => async (dispatch: Dispatch) => {
    const resp = await authAPI.logout();
    if (resp.data.resultCode === 0)
        dispatch(clearSessionUserData());
}
export default autReducer;