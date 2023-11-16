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
import {
    makeFollow, makeUnFollow, setCurrentPage, setTotalUsersCount,
    setUsers,
    toggleFollowingInProgress, togglePreloader,
    UserT
} from "../../redux/usersPageReducer";
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
         pageSize,
         currentPage,
         setCurrentPage,
         isFetching,
         totalUsersCount,
         toggleFollowingInProgress,
         setUsers,
        setTotalUsersCount,
        togglePreloader
     }) => {
        // useEffect(() => {
        //     getUsersRequest(pageSize, currentPage);
        //
        // }, [currentPage, getUsersRequest, pageSize])

        function onPageChanged(numberOfPage:number) {
            setCurrentPage(numberOfPage);
            getUsers(pageSize, numberOfPage)
        }
        function getUsers(pageSize:number,currentPage:number ){
            togglePreloader(true)
            axios
                .get(`https://social-network.samuraijs.com/api/1.0/users?count=${pageSize}&page=${currentPage}`)
                .then(resp => {
                    setUsers(resp.data.items)
                    setTotalUsersCount(resp.data.totalCount)
                    togglePreloader(false)

                })
        }
        if(users.length === 0) {
            getUsers(pageSize,currentPage)
        }
        // useLayoutEffect(() => {
        //
        // },[])
        return <>
            <Users
                currentPage={currentPage}
                totalUsersCount={totalUsersCount}
                pageSize={pageSize}
                users={users}
                followingInProgress={followingInProgress}
                toggleFollowingInProgress={toggleFollowingInProgress}
                makeFollow={makeFollow}
                makeUnFollow={makeUnFollow}
                setCurrentPage={onPageChanged}
                isFetching={isFetching}
            />
        </>

    }
type MapStateToPropsT = {
    users: UserT[]
    followingInProgress: number[]
    pageSize:number
    currentPage:number
    totalUsersCount:number
    isFetching:boolean
}
type MapDispatchToPropsT =  {
    makeFollow: (userId: number) => void
    makeUnFollow: (userId: number) => void
    toggleFollowingInProgress: (isFetching:boolean, userId:number) => void
    setUsers:(users: UserT[]) => void
    setCurrentPage:(p:number)=> void
    setTotalUsersCount:(count:number) => void
    togglePreloader:(v:boolean) => void
    // getUsersRequest:(p:number,c:number) => void
}
const mapStateToProps = (state: AppStateType): MapStateToPropsT => ({
    users: state.usersPage.users,
    followingInProgress: state.usersPage.followingInProgress,
    pageSize: state.usersPage.pageSize,
    currentPage: state.usersPage.currentPage,
    totalUsersCount:state.usersPage.totalUsersCount,
    isFetching: state.usersPage.isFetching
})
// const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsT => ({
//     makeFollow: (userId: number) => dispatch(follow(userId)),
//     makeUnFollow: (userId: number) => dispatch(unFollow(userId)),
//     toggleFollowingInProgress: (isFetching:boolean, userId:number) =>
//          dispatch(toggleFollowingInProgress(isFetching,userId)),
//     setUsers:(users: UserT[]) => dispatch(setUsers(users)),
//     setCurrentPage:(p:number) => dispatch(setCurrentPage(p)),
//     setTotalUsersCount:(c:number) => dispatch(setTotalUsersCount(c)),
//     togglePreloader:(v:boolean)=>dispatch(togglePreloader(v))
//     // getUsersRequest:(p:number,c:number) => dispatch(getUsersRequest(p,c))
// })
export default compose(
    connect(mapStateToProps,
        {makeFollow,makeUnFollow,toggleFollowingInProgress,setUsers,setCurrentPage,setTotalUsersCount,togglePreloader })
)(UsersContainer)
