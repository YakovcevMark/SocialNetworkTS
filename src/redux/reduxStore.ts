import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {ProfileActionTypes, profilePageReducer} from "./profilePageReducer";
import {DialogsActionsTypes, dialogsPageReducer} from "./dialogsPageReducer";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk"
import autReducer, {AuthActionsType} from "./authReducer";
import usersPageReducer, {UsersActionsType} from "./usersPageReducer";
import appReducer, {AppReducerActionsType} from "./appReducer";

const rootReducer = combineReducers({
    profilePage: profilePageReducer,
    dialogsPage: dialogsPageReducer,
    usersPage: usersPageReducer,
    // sidebar: sidebarPageReducer,
    auth: autReducer,
    app: appReducer,

});

export const store = createStore(rootReducer,applyMiddleware(thunk))

type AppActionsType =
    ProfileActionTypes |
    DialogsActionsTypes |
    UsersActionsType |
    AuthActionsType |
    AppReducerActionsType

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppActionsType>
// @ts-ignore
window.store = store //for dev
