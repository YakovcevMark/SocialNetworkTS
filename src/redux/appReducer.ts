// import {getAuthUserData} from "./auth_reducer";
//
// const SET_INITIALIZED = "SET_INITIALIZED"
//
// const initialState = {
//     initialized: false,
// }
// const app_reducer = (state = initialState, action) => {
//     switch (action.type) {
//         case SET_INITIALIZED:
//             return {...state, initialized: true}
//         default:
//             return state;
//     }
// }
// export const setInitialized = () => ({type: SET_INITIALIZED})
//
// export const initializeApp = () => async (dispatch) => {
//     await dispatch(getAuthUserData())
//     dispatch(setInitialized())
//
// }
// export default app_reducer;