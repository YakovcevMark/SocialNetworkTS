// import React, {memo, useLayoutEffect, useMemo} from "react";
// import {getUsersRequest, setCurrentPage, UserT} from "../../redux/usersPageReducer";
// import User from "./User/User";
// import Pagination from "../common/Pagination/Pagination";
// import Preloader from "../common/Preloader/Preloader";
// import {useDispatch, useSelector} from "react-redux";
// import {AppStateType} from "../../redux/reduxStore";
//
// const Users: React.FC =
//     () => {
//         const users = useSelector<AppStateType,UserT[]>(state => state.usersPage.users)
//         const currentPage = useSelector<AppStateType,number>(state => state.usersPage.currentPage)
//         const pageSize = useSelector<AppStateType,number>(state => state.usersPage.pageSize)
//         const totalUsersCount = useSelector<AppStateType,number>(state => state.usersPage.totalUsersCount)
//         const isFetching = useSelector<AppStateType,boolean>(state => state.usersPage.isFetching)
//         const dispatch = useDispatch()
//
//         useLayoutEffect(() => {
//             dispatch(getUsersRequest(pageSize,currentPage))
//         },[dispatch, pageSize,currentPage ])
//
//         const renderedUsers = useMemo(() => {
//             return users.map((u: UserT) => <User key={u.id}
//                                                  id={u.id}
//                                                  name={u.name}
//                                                  status={u.status}
//                                                  photos={u.photos}
//                                                  followed={u.followed}/>)
//         }, [users])
//         return (
//             <>
//                 <Pagination
//                     totalItemsCount={totalUsersCount}
//                     pageSize={pageSize}
//                     currentPage={currentPage}
//                     pageChanged={dispatch(setCurrentPage)}
//                 />
//                 {}
//                 {isFetching ? <Preloader/> : renderedUsers}
//             </>
//         )
//     }
// export default memo(Users);
import React, {useMemo} from "react";
import {UserT} from "../../redux/usersPageReducer";
import User from "./User/User";
import {UsersContainerPT} from "./UsersContainer";
import Pagination from "../common/Pagination/Pagination";
import Preloader from "../common/Preloader/Preloader";

type UsersPT = Omit<UsersContainerPT, "setUsers" | "setTotalUsersCount" | "togglePreloader" | "getUsersRequest">
const Users: React.FC<UsersPT> =
    ({
         users,
         makeUnFollow,
         makeFollow,
         followingInProgress,
         toggleFollowingInProgress,
         pageSize,
         currentPage,
         setCurrentPage,
        totalUsersCount,
        isFetching
     }) => {
        const renderedUsers = useMemo(() => {
            return users.map((u: UserT) => <User key={u.id}
                                                 id={u.id}
                                                 name={u.name}
                                                 status={u.status}
                                                 photos={u.photos}
                                                 followed={u.followed}
                                                 makeFollow={makeFollow}
                                                 makeUnFollow={makeUnFollow}
                                                 followingInProgress={followingInProgress}
                                                 toggleFollowingInProgress={toggleFollowingInProgress}
                                                 // pageSize={pageSize}
                                                 // currentPage={currentPage}


            />)
        }, [users,makeFollow,makeUnFollow,followingInProgress,toggleFollowingInProgress])
        return (
            <>
                <Pagination
                    totalItemsCount={totalUsersCount}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    pageChanged={setCurrentPage}
                />
                {}
                {isFetching ? <Preloader/> : renderedUsers}

            </>
        )
    }
export default Users;