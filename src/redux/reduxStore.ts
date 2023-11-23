import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {profilePageReducer} from "./profilePageReducer";
import {dialogsPageReducer} from "./dialogsPageReducer";
// import sidebarPageReducer from "./sidebarPageReducer";
// import usersPageReducer from "./usersPageReducer";
// import autReducer from "./authReducer";
import thunk from 'redux-thunk';
import usersPageReducer from "./usersPageReducer";
import autReducer from "./authReducer";
// import app_reducer from "./appReducer";

const rootReducer = combineReducers({
    profilePage: profilePageReducer,
    dialogsPage: dialogsPageReducer,
    usersPage: usersPageReducer,
    // sidebar: sidebarPageReducer,
    auth: autReducer,
    // app: app_reducer,

});

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// let store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
export const store = createStore(rootReducer,applyMiddleware(thunk))
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
// @ts-ignore
window.store = store //for dev
