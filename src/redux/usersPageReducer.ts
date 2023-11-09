// import {usersAPI} from "../api/samuraiAPI";
// import {updateObjectInArray} from "../utils/reducer-helpers"
//
// const FOLLOW = 'FOLLOW';
// const UNFOLLOW = 'UNFOLLOW';
// const SET_USERS = 'SET_USERS';
// const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
// const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
// const TOGGLE_PRELOADER = "TOGGLE_PRELOADER";
// const TOGGLE_FOLLOWING_IN_PROGRESS = "TOGGLE_FOLLOWING_IN_PROGRESS";
// const usersPage = {
//     users: [],
//     totalUsersCount: 0,
//     pageSize: 10,
//     currentPage: 1,
//     isFetching: false,
//     followingInProgress: [],
// }
// const usersPageReducer = (state = usersPage, action) => {
//     switch (action.type) {
//         case FOLLOW:
//             return {
//                 ...state,
//                 users: updateObjectInArray(state.users,
//                     action.userId,
//                     "id",
//                     {followed: true})
//             }
//         case UNFOLLOW:
//             return {
//                 ...state,
//
//                 users: updateObjectInArray(state.users,
//                     action.userId,
//                     "id",
//                     {followed: false})
//             }
//         case SET_USERS:
//             return {
//                 ...state,
//                 users: action.users
//             }
//         case SET_TOTAL_USERS_COUNT:
//             return {
//                 ...state,
//                 totalUsersCount: action.count
//             }
//         case SET_CURRENT_PAGE:
//             return {
//                 ...state,
//                 currentPage: action.numberOfPage
//             }
//         case TOGGLE_PRELOADER:
//             return {
//                 ...state,
//                 isFetching: action.isFetching
//             }
//         case TOGGLE_FOLLOWING_IN_PROGRESS:
//             return {
//                 ...state,
//                 followingInProgress: action.isFetching
//                     ? [...state.followingInProgress, action.userId]
//                     : state.followingInProgress.filter(id => id !== action.userId)
//             }
//         default:
//             return state;
//     }
// }
// export const follow = (userId) => ({type: FOLLOW, userId});
// export const unFollow = (userId) => ({type: UNFOLLOW, userId});
// export const setUsers = (users) => ({type: SET_USERS, users});
//
// export const setTotalUsersCount = (count) => ({type: SET_TOTAL_USERS_COUNT, count});
// export const setCurrentPage = (numberOfPage) => ({type: SET_CURRENT_PAGE, numberOfPage});
// export const togglePreloader = (isFetching) => ({type: TOGGLE_PRELOADER, isFetching});
// export const toggleFollowingInProgress = (isFetching, userId) => ({
//     type: TOGGLE_FOLLOWING_IN_PROGRESS,
//     isFetching,
//     userId
// });
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
//
//
// export default usersPageReducer;