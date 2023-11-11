// import profilePageReducer from "./profile_page_reducer";
// import dialogsPageReducer from "./dialogs_page_reducer";
// import sidebarPageReducer from "./sidebar_page_reducer";
import {v1} from "uuid";
import {DialogsStateT} from "./dialogsPageReducer";
import {ProfileStateT} from "./profilePageReducer";


type StateT = {
    dialogsState: DialogsStateT
    profileState: ProfileStateT
}
export type StoreT = {
    _state: StateT
    getState: () => StateT
    addNewPost: (postBody: string) => void
    _callSubscriber: () => void
    subscribe: (observer: any) => void
}

export let store: StoreT = {
    _state: {
        dialogsState: {
            dialogsData: [
                {
                    id:0,
                    name: 'Katya',
                    messages: [
                        {id: 0, message: "I love u!", type: "input"},
                        {id: 2, message: "Can u tell me the same?", type: "input"},
                        {id: 3, message: "No", type: "output"},
                    ]
                },
                {
                    id: 1,
                    name: 'Andrey',
                    messages: [
                        {id: 0, message: "Hello", type: "input"},
                        {id: 2, message: "Wat's up?", type: "input"},
                        {id: 3, message: "Men, wll we have a patty today?", type: "input"},
                        {id: 4, message: "Atata", type: "output"},
                    ]
                },
                {
                    id: 2,
                    name: 'Vasya',
                    messages: [
                        {id: 0, message: "Russian Vasya there", type: "input"},
                        {id: 1, message: "Шо ты, э, ты", type: "input"},
                        {id: 2, message: "Ya tvoi drug", type: "input"},
                        {id: 3, message: "Aahaha", type: "output"},
                    ]
                },
                {
                    id: 3,
                    name: 'Mark',
                    messages: [
                        {id: 0, message: "Hello", type: "input"},
                        {id: 1, message: "Wat's up?", type: "input"},
                        {id: 2, message: "Lol kek cheburek", type: "input"},
                        {id: 3, message: "Atata", type: "output"},
                    ]
                },
                {
                    id: 4,
                    name: 'Artem',
                    messages: [
                        {id: 0, message: "Hello", type: "input"},
                        {id: 1, message: "Wat's up?", type: "input"},
                        {id: 2, message: "Lol kek cheburek", type: "input"},
                        {id: 3, message: "Atata", type: "output"},
                    ]
                },
            ]
        },
        profileState: {
            postsData: [
                {id: 0, postBody: "Hi! I love you", likesCount: 15, dislikesCount: 0},
                {id: 1, postBody: "i really hate u!!!!!!!!!!!", likesCount: 20, dislikesCount: 0},
            ],
            profileInfo: {},
            isFetching: false,
            status: ""
        }
    },
    getState() {
        return this._state;
    },
    addNewPost(postBody: string) {
        this._state.profileState.postsData = [{
            id: this._state.profileState.postsData.length + 1,
            postBody,
            dislikesCount: 0,
            likesCount: 0
        }, ...this._state.profileState.postsData]
        this._callSubscriber()
    },
    subscribe(observer: any) {
        this._callSubscriber = observer;
    },
    _callSubscriber() {
        alert('Subscriber has added!');
    },
}


// _callSubscriber() {
//     alert('Subscriber has added!');
// },
// getState() {
//     return this._state;
// },
// dispatch(action) {
//     this._state.profileState = profilePageReducer(this._state.profileState, action);
//     this._state.dialogsState = dialogsPageReducer(this._state.dialogsState, action);
//     this._state.sidebar = sidebarPageReducer(this._state.sidebar, action);
//     this._callSubscriber(this._state);
// },
// subscribe(observer) {
//     this._callSubscriber = observer;
// }

// export default store;
// window.store = store;