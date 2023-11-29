// // import {
// //     setUsers,
// //     follow,
// //     unFollow,
// //     setCurrentPage,
// //     toggleFollowingInProgress,
// // } from "../../redux/users_page_reducer";
// import Users from "./Users";
// import React, {useEffect} from "react"
// import {connect} from "react-redux";
// import {compose} from "redux";
// import {RootState} from "../../redux/reduxStore";
// import {
//     getUsersRequest,
//     makeFollow, makeUnFollow, setCurrentPage, setTotalUsersCount,
//     setUsers,
//     toggleFollowingInProgress, togglePreloader
// } from "../../redux/usersPageReducer";
// import {UserT} from "../../api/samuraiAPI";
// export type UsersContainerPT = MapStateToPropsT & MapDispatchToPropsT
// const UsersContainer: React.FC<UsersContainerPT> =
//     ({
//          users,
//          makeUnFollow,
//          makeFollow,
//          followingInProgress,
//          getUsersRequest,
//          pageSize,
//          currentPage,
//          setCurrentPage,
//          isFetching,
//          totalUsersCount,
//          toggleFollowingInProgress,
//          setUsers,
//         setTotalUsersCount,
//         togglePreloader
//      }) => {
//         useEffect(() => {
//             getUsersRequest(pageSize, currentPage);
//         }, [currentPage, getUsersRequest, pageSize])
//         // useEffect(() => {
//         //     togglePreloader(true)
//         //    usersAPI.getUsersRequest(pageSize,currentPage)
//         //         .then(resp => {
//         //             setUsers(resp.data.items)
//         //             setTotalUsersCount(resp.data.totalCount)
//         //             togglePreloader(false)
//         //         })
//         // },[pageSize,currentPage,togglePreloader,setUsers,setTotalUsersCount])
//
//         function onPageChanged(numberOfPage:number) {
//             setCurrentPage(numberOfPage);
//         }
//
//
//         return <>
//             <Users*
//                 currentPage={currentPage}
//                 totalUsersCount={totalUsersCount}
//                 pageSize={pageSize}
//                 users={users}
//                 followingInProgress={followingInProgress}
//                 toggleFollowingInProgress={toggleFollowingInProgress}
//                 makeFollow={makeFollow}
//                 makeUnFollow={makeUnFollow}
//                 setCurrentPage={onPageChanged}
//                 isFetching={isFetching}
//             />
//         </>
//
//     }
// type MapStateToPropsT = {
//     users: UserT[]
//     followingInProgress: number[]
//     pageSize:number
//     currentPage:number
//     totalUsersCount:number
//     isFetching:boolean
// }
// type MapDispatchToPropsT =  {
//     makeFollow: (userId: number) => void
//     makeUnFollow: (userId: number) => void
//     toggleFollowingInProgress: (isFetching:boolean, userId:number) => void
//     setUsers:(users: UserT[]) => void
//     setCurrentPage:(p:number)=> void
//     setTotalUsersCount:(count:number) => void
//     togglePreloader:(v:boolean) => void
//     getUsersRequest:(p:number, c: number) => void
//     // getUsersRequest:(p:number,c:number) => void
// }
// const mapStateToProps = (state: RootState): MapStateToPropsT => ({
//     users: state.usersPage.users,
//     followingInProgress: state.usersPage.followingInProgress,
//     pageSize: state.usersPage.pageSize,
//     currentPage: state.usersPage.currentPage,
//     totalUsersCount:state.usersPage.totalUsersCount,
//     isFetching: state.usersPage.isFetching
// })
//
// export default compose(
//     connect(mapStateToProps,
//         {makeFollow,makeUnFollow,toggleFollowingInProgress,setUsers,getUsersRequest,setCurrentPage,setTotalUsersCount,togglePreloader })
// )(UsersContainer)
