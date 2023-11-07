
import profilePageReducer from "./profile_page_reducer";
import dialogsPageReducer from "./dialogs_page_reducer";
import sidebarPageReducer from "./sidebar_page_reducer";

const store = {
    _state: {
        dialogsState: {
            dialogsData: [
                {id: 1, name: 'Katya'},
                {id: 2, name: 'Andrey'},
                {id: 3, name: 'Vasya'},
                {id: 4, name: 'Mark'},
                {id: 5, name: 'Artem'},
            ],
            messagesData: [
                {id: 1, message: "Hello"},
                {id: 2, message: "Wat's up?"},
                {id: 3, message: "Lol kek cheburek"},
                {id: 4, message: "Atata"},
            ],
            newMessageText: '',
        },
        profileState: {
            postsData: [
                {id: 1, message: "Hi! I love you", likesCount: 15},
                {id: 2, message: "i really hate u!!!!!!!!!!!", likesCount: 20},
            ],
            newPostText: '',
        },
        sidebar: {
            popularFriends: [
                {id: 1, name: 'Katya'},
                {id: 2, name: 'Vasya'},
                {id: 3, name: 'Petya'},
                {id: 4, name: 'Erzhan'},
            ]
        }
    },
    _callSubscriber() {
        alert('Subscriber has added!');
    },
    getState() {
        return this._state;
    },
    dispatch(action) {
        this._state.profileState = profilePageReducer(this._state.profileState, action);
        this._state.dialogsState = dialogsPageReducer(this._state.dialogsState, action);
        this._state.sidebar = sidebarPageReducer(this._state.sidebar, action);
        this._callSubscriber(this._state);
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    }
}
export default store;
window.store = store;