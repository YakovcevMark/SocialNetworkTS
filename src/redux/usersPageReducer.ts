// import {usersAPI} from "../api/samuraiAPI";
import {updateObjectInArray} from "../utils/reducer-helpers"

export type UserT = {
    id: number
    name: string
    status: string
    photos: {
        small: string
        large: string
    }
    followed: boolean
}

const usersPage = {
    users: [
        // {id: 0, name: "Andry", status: "Love dogs", photos: {small: "", large: ""}, followed: true},
        // {id: 1, name: "Vasya", status: "Love cats", photos: {small: "", large: ""}, followed: false},
        // {id: 2, name: "Katya", status: "Love ur mom", photos: {small: "", large: ""}, followed: true},
        // {id: 3, name: "Petya", status: "Love ur dad", photos: {small: "", large: ""}, followed: false},
        // {id: 4, name: "Kolya", status: "Love myself", photos: {small: "", large: ""}, followed: true},
        // {id: 5, name: "Dima", status: "Love tea", photos: {small: "", large: ""}, followed: false},
        // {id: 6, name: "Artem", status: "Love fruits", photos: {small: "", large: ""}, followed: true},
        // {id: 7, name: "Vanya", status: "Love food", photos: {small: "", large: ""}, followed: false},
        // {id: 8, name: "Roma", status: "Love foots", photos: {small: "", large: ""}, followed: true},
        // {id: 9, name: "Julia", status: "Love cows", photos: {small: "", large: ""}, followed: false}
    ] as UserT[],
    totalUsersCount: 0,
    pageSize: 10,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as number[],
}
type UsersStateT = typeof usersPage
const usersPageReducer = (state: UsersStateT = usersPage, action: ActionsType): UsersStateT => {
    switch (action.type) {
        case "FOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users,
                    action.userId,
                    "id",
                    {followed: true})
            }
        case "UNFOLLOW":
            return {
                ...state,

                users: updateObjectInArray(state.users,
                    action.userId,
                    "id",
                    {followed: false})
            }
        case "SET_USERS":
            return {
                ...state,
                users: action.users
            }
        case "SET_TOTAL_USERS_COUNT":
            return {
                ...state,
                totalUsersCount: action.count
            }
        case "SET_CURRENT_PAGE":
            return {
                ...state,
                currentPage: action.numberOfPage
            }
        case "TOGGLE_PRELOADER":
            return {
                ...state,
                isFetching: action.isFetching
            }
        case "TOGGLE_FOLLOWING_IN_PROGRESS":
            return {
                ...state,
                followingInProgress:
                    action.isFetching
                        ? [...state.followingInProgress, action.userId]
                        : state.followingInProgress.filter(id => id !== action.userId),
                // isFetching: false
            }
        default:
            return state;
    }
}
type ActionsType =
    ReturnType<typeof follow> | ReturnType<typeof unFollow> |
    ReturnType<typeof setUsers> | ReturnType<typeof setTotalUsersCount> |
    ReturnType<typeof setCurrentPage> | ReturnType<typeof togglePreloader> |
    ReturnType<typeof toggleFollowingInProgress>
export const follow = (userId: number) =>
    ({type: "FOLLOW", userId} as const);
export const unFollow = (userId: number) =>
    ({type: "UNFOLLOW", userId} as const);
export const setUsers = (users: UserT[]) =>
    ({type: "SET_USERS", users} as const);
export const setTotalUsersCount = (count: number) =>
    ({type: "SET_TOTAL_USERS_COUNT", count} as const);
export const setCurrentPage = (numberOfPage: number) =>
    ({type: "SET_CURRENT_PAGE", numberOfPage} as const);
export const togglePreloader = (isFetching: boolean) =>
    ({type: "TOGGLE_PRELOADER", isFetching} as const);
export const toggleFollowingInProgress = (isFetching:boolean, userId:number) =>
    ({
    type: "TOGGLE_FOLLOWING_IN_PROGRESS",
    isFetching,
    userId
} as const);
// const followUnfollowFlow = async (userId, apiMethod, action, dispatch) => {
//     const resp = await apiMethod(userId)
//     if (resp.data.resultCode === 0)
//         dispatch(action(userId));
//     dispatch(toggleFollowingInProgress(false, userId));
// }
// export const getUsersRequest = (pageSize, currentPage) => async (dispatch) => {
//     dispatch(togglePreloader(true));
//     const resp = await usersAPI.getUsersRequest(pageSize, currentPage)
//     dispatch(togglePreloader(false));
//     dispatch(setUsers(resp.data.items));
//     dispatch(setTotalUsersCount(resp.data.totalCount));
//
// }
// export const makeFollow = (userId) => async (dispatch) => {
//     await followUnfollowFlow(userId, usersAPI.makeFollow.bind(usersAPI), follow, dispatch)
// }
// export const makeUnFollow = (userId) => async (dispatch) => {
//     await followUnfollowFlow(userId, usersAPI.makeUnFollow.bind(usersAPI), unFollow, dispatch)
// }


export default usersPageReducer;