import React, {memo, useLayoutEffect, useMemo} from "react";
import {getUsersRequest, setCurrentPage} from "../../redux/usersPageReducer";
import User from "./User/User";
import Pagination from "../common/Pagination/Pagination";
import Preloader from "../common/Preloader/Preloader";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {UserT} from "../../api/samuraiAPI";

const Users: React.FC = () => {
        const users = useAppSelector(state => state.usersPage.users)
        const currentPage = useAppSelector(state => state.usersPage.currentPage)
        const pageSize = useAppSelector(state => state.usersPage.pageSize)
        const totalUsersCount = useAppSelector(state => state.usersPage.totalUsersCount)
        const isFetching = useAppSelector(state => state.usersPage.isFetching)
        const dispatch = useAppDispatch()

        useLayoutEffect(() => {
            dispatch(getUsersRequest(pageSize,currentPage))
        },[dispatch, pageSize,currentPage ])
        const pageChanger = (page:number) => {
            dispatch(setCurrentPage(page))
        }
        const renderedUsers = useMemo(() => {
            return users.map((u: UserT) => <User key={u.id}
                                                 id={u.id}
                                                 name={u.name}
                                                 status={u.status}
                                                 photos={u.photos}
                                                 followed={u.followed}/>)
        }, [users])
        return (
            <>
                <Pagination
                    totalItemsCount={totalUsersCount}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    pageChanged={pageChanger}
                />
                {}
                {isFetching ? <Preloader/> : renderedUsers}
            </>
        )
    }
export default memo(Users);
// import React, {useMemo} from "react";
// import {UserT} from "../../redux/usersPageReducer";
// import User from "./User/User";
// import {UsersContainerPT} from "./UsersContainer";
// import Pagination from "../common/Pagination/Pagination";
// import Preloader from "../common/Preloader/Preloader";
//
// type UsersPT = Omit<UsersContainerPT, "setUsers" | "setTotalUsersCount" | "togglePreloader" | "getUsersRequest">
// const Users: React.FC<UsersPT> =
//     ({
//          users,
//          makeUnFollow,
//          makeFollow,
//          followingInProgress,
//          toggleFollowingInProgress,
//          pageSize,
//          currentPage,
//          setCurrentPage,
//         totalUsersCount,
//         isFetching
//      }) => {
//         const renderedUsers = useMemo(() => {
//             return users.map((u: UserT) => <User key={u.id}
//                                                  id={u.id}
//                                                  name={u.name}
//                                                  status={u.status}
//                                                  photos={u.photos}
//                                                  followed={u.followed}
//                                                  makeFollow={makeFollow}
//                                                  makeUnFollow={makeUnFollow}
//                                                  followingInProgress={followingInProgress}
//                                                  toggleFollowingInProgress={toggleFollowingInProgress}
//                                                  // pageSize={pageSize}
//                                                  // currentPage={currentPage}
//
//
//             />)
//         }, [users,makeFollow,makeUnFollow,followingInProgress,toggleFollowingInProgress])
//         return (
//             <>
//                 <Pagination
//                     totalItemsCount={totalUsersCount}
//                     pageSize={pageSize}
//                     currentPage={currentPage}
//                     pageChanged={setCurrentPage}
//                 />
//                 {}
//                 {isFetching ? <Preloader/> : renderedUsers}
//
//             </>
//         )
//     }
// export default Users;