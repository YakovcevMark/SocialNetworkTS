// import {authAPI, securityAPI} from "../api/samuraiAPI";
//
// const SET_AUTH_USER_INFO = "auth_reducer/SET_AUTH_USER_INFO"
// const SET_CAPTCHA_URL = "auth_reducer/CLOSE_USER_SESSION";
// const initialState = {
//     email: null,
//     id: null,
//     login: null,
//     isAuth: false,
//     captchaURL: null
// }
// const autReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case SET_AUTH_USER_INFO:
//             return {...state, isAuth: true, ...action.data}
//         case SET_CAPTCHA_URL:
//             return {...state, captchaURL: action.captchaURL}
//         default:
//             return state;
//     }
// }
// export const setAuthUserData = (data) => ({type: SET_AUTH_USER_INFO, data});
// export const setCaptchaUrl = (captchaURL) => ({type: SET_CAPTCHA_URL, captchaURL});
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
//             captchaURL: null}));
// }
// export default autReducer;