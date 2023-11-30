import {authAPI, ResultCodes, securityAPI, SessionUserType} from "../api/samuraiAPI";
import {FormikValues} from "formik";
import {AppThunk} from "./reduxStore";


const initialState = {
    data: {} as SessionUserType,
    isAuth: false,
    captchaURL: ""
}
export type AuthStateT = typeof initialState
const autReducer = (state: AuthStateT = initialState, action: AuthActionsType): AuthStateT => {
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
export type AuthActionsType =
    ReturnType<typeof setAuthUserData>
    | ReturnType<typeof setCaptchaUrl>
    | ReturnType<typeof clearSessionUserData>
export const setAuthUserData = (data: SessionUserType) => ({type: "SET_AUTH_USER_INFO", data} as const);
export const setCaptchaUrl = (captchaURL: string) => ({type: "SET_CAPTCHA_URL", captchaURL} as const);
export const clearSessionUserData = () => ({type: "CLEAR_SESSION_USER_DATA"} as const);

export const getAuthUserData = (): AppThunk => async (dispatch) => {
    const data = await authAPI.authorization();
    if (data.resultCode === 0) {
        dispatch(setAuthUserData({...data.data}));
    }
}
export const loginRequest = (data: FormikValues, setStatus: (status: string) => void): AppThunk =>
    async (dispatch) => {
        const respData = await authAPI.login({...data});
        if (respData.resultCode !== ResultCodes.Success) {
            if (respData.resultCode === ResultCodes.CaptchaIsRequired) {
                const respWithCaptcha = await securityAPI.getCaptcha();
                dispatch(setCaptchaUrl(respWithCaptcha.data.url))
            }
            setStatus(respData.messages[0]);
        } else {
                dispatch(getAuthUserData());
        }
    }
export const logoutRequest = (): AppThunk => async (dispatch) => {
    const data = await authAPI.logout();
    if (data.resultCode ===  ResultCodes.Success)
        dispatch(clearSessionUserData());
}
export default autReducer;