import {getAuthUserData} from "./authReducer";
import {AppThunk} from "./reduxStore";


const initialState = {
    initialized: false,
}
type AppReducerInitStateType = typeof initialState
export type AppReducerActionsType = ReturnType<typeof setInitialized>
const appReducer = (state:AppReducerInitStateType = initialState, action:AppReducerActionsType):AppReducerInitStateType => {
    switch (action.type) {
        case "SET_INITIALIZED":
            return {...state, initialized: true}
        default:
            return state;
    }
}
export const setInitialized = () => ({type: "SET_INITIALIZED"} as const )

export const initializeApp = ():AppThunk => async (dispatch) => {
    await dispatch(getAuthUserData())
    dispatch(setInitialized())

}
export default appReducer;