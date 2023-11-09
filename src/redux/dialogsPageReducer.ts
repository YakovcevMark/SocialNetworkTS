import {v1} from "uuid";


export type MessageT = {
    id: number
    message: string
    type: "input" | "output"
}
export type DialogT = {
    id: number,
    name: string
    messages: MessageT[]
}
export type DialogsStateT = {
    dialogsData: DialogT[]
}
const dialogsPage: DialogsStateT = {
    dialogsData: [
        {
            id: 0,
            name: 'Katya',
            messages: [
                {id: 0, message: "I love u!", type: "input"},
                {id: 1, message: "Can u tell me the same?", type: "input"},
                {id: 2, message: "No", type: "output"},
            ]
        },
        {
            id: 1,
            name: 'Andrey',
            messages: [
                {id: 0, message: "Hello", type: "input"},
                {id: 1, message: "Wat's up?", type: "input"},
                {id: 2, message: "Men, wll we have a patty today?", type: "input"},
                {id: 3, message: "Atata", type: "output"},
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
};

// type AddMessageAT = ReturnType<typeof addMessage>
type ActionsTypes = ReturnType<typeof addMessage>
export const dialogsPageReducer = (state: DialogsStateT = dialogsPage, action: ActionsTypes):DialogsStateT => {
    switch (action.type) {
        case "ADD_MESSAGE":
            const newMessage: MessageT = {
                id: state.dialogsData.length + 1,
                message: action.newMessageBody,
                type: "output"
            };
            return {
                ...state,
                dialogsData:
                    state.dialogsData.map(d => {
                        return d.id === action.dialogId
                            ? {
                                ...d,
                                messages: [...d.messages, newMessage]
                            }
                            : d
                    })
            }
        default:
            return state;
    }
}

export const addMessage = (newMessageBody: string, dialogId: number) => (
    {
        type: "ADD_MESSAGE",
        newMessageBody,
        dialogId
    } as const)

