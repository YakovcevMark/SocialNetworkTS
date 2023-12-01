import {ResultCodes, usersAPI, UserT, ResponseType} from "../api/samuraiAPI";
import {updateObjectInArray} from "../utils/reducer-helpers"
import {AppThunk} from "./reduxStore";
import {AxiosResponse} from "axios"



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
    isFetching: true,
    followingInProgress: [] as number[],
}
type UsersStateT = typeof usersPage
const usersPageReducer = (state: UsersStateT = usersPage, action: UsersActionsType): UsersStateT => {
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
                users: [...action.users]
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
        case "TOGGLE_PRELOADER_Users":
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
                isFetching: false
            }
        default:
            return state;
    }
}
export type UsersActionsType =
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
    ({type: "TOGGLE_PRELOADER_Users", isFetching} as const);
export const toggleFollowingInProgress = (isFetching: boolean, userId: number) =>
    ({
        type: "TOGGLE_FOLLOWING_IN_PROGRESS",
        isFetching,
        userId
    } as const);
const followUnfollowFlow = (userId: number, apiMethod:(userId: number) => Promise<AxiosResponse<ResponseType>>, action: typeof follow | typeof unFollow): AppThunk =>
    async (dispatch) => {
        dispatch(toggleFollowingInProgress(true, userId));
        const data = await apiMethod(userId)
        if (data.data.resultCode === ResultCodes.Success)
            dispatch(action(userId));
        dispatch(toggleFollowingInProgress(false, userId));
    }
export const getUsersRequest = (pageSize: number, currentPage: number): AppThunk =>
    async (dispatch) => {
        dispatch(togglePreloader(true));
        const usersData = await usersAPI.getUsersRequest(pageSize, currentPage)
        dispatch(togglePreloader(false));
        dispatch(setUsers(usersData.items));
        dispatch(setTotalUsersCount(usersData.totalCount));
    }
export const makeFollow = (userId: number) => followUnfollowFlow(userId, usersAPI.makeFollow.bind(usersAPI), follow)

export const makeUnFollow = (userId: number) => followUnfollowFlow(userId, usersAPI.makeUnFollow.bind(usersAPI), unFollow)


export default usersPageReducer;