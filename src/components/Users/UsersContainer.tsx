// import {
//     setUsers,
//     follow,
//     unFollow,
//     setCurrentPage,
//     toggleFollowingInProgress,
// } from "../../redux/users_page_reducer";
import Users from "./Users";
import React, {useEffect, useLayoutEffect} from "react"
import {connect} from "react-redux";
import {compose, Dispatch} from "redux";
import {AppStateType} from "../../redux/reduxStore";
import {follow, setUsers, toggleFollowingInProgress, unFollow, UserT} from "../../redux/usersPageReducer";
import axios from "axios";
// import {
//     getCurrentPage,
//     getFollowingInProgress,
//     getIsFetching,
//     getPageSize,
//     getTotalUsersCount,
//     getUsers
// } from "../../redux/users_selectors";
export type UsersContainerPT = MapStateToPropsT & MapDispatchToPropsT
const UsersContainer: React.FC<UsersContainerPT> =
    ({
         users,
         makeUnFollow,
         makeFollow,
         followingInProgress,
         // getUsersRequest,
         // pageSize,
         // currentPage,
         // setCurrentPage,
         // isFetching,
         // totalUsersCount,
         // users,
         // followingInProgress,
         toggleFollowingInProgress,
         // makeFollow,
         // makeUnFollow
        setUsers
     }) => {
        // useEffect(() => {
        //     getUsersRequest(pageSize, currentPage);
        //
        // }, [currentPage, getUsersRequest, pageSize])

        // function onPageChanged(numberOfPage) {
        //     setCurrentPage(numberOfPage);
        //     getUsersRequest(pageSize, numberOfPage)
        // }
        if(users.length === 0) {
            axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=10&page=1`)
                .then(resp => setUsers(resp.data.items));
        }
        // useLayoutEffect(() => {
        //
        // },[])
        return <>
            <Users
                // currentPage={currentPage}
                // totalUsersCount={totalUsersCount}
                // pageSize={pageSize}
                users={users}
                followingInProgress={followingInProgress}
                toggleFollowingInProgress={toggleFollowingInProgress}
                makeFollow={makeFollow}
                makeUnFollow={makeUnFollow}
                // pageChanged={onPageChanged}
                // isFetching={isFetching}
            />
        </>

    }
type MapStateToPropsT = {
    users: UserT[]
    followingInProgress: number[]
}
type MapDispatchToPropsT = {
    makeFollow: (userId: number) => void
    makeUnFollow: (userId: number) => void
    toggleFollowingInProgress: (isFetching:boolean, userId:number) => void
    setUsers:(users: UserT[]) => void
}
const mapStateToProps = (state: AppStateType): MapStateToPropsT => ({
    users: state.usersPage.users,
    followingInProgress: state.usersPage.followingInProgress
})
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsT => ({
    makeFollow: (userId: number) => dispatch(follow(userId)),
    makeUnFollow: (userId: number) => dispatch(unFollow(userId)),
    toggleFollowingInProgress: (isFetching:boolean, userId:number) =>
         dispatch(toggleFollowingInProgress(isFetching,userId)),
    setUsers:(users: UserT[]) => dispatch(setUsers(users))
})
export default compose(
    connect(mapStateToProps,
        mapDispatchToProps)
)(UsersContainer)
