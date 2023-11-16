import React, {useMemo} from "react";
import {UserT} from "../../redux/usersPageReducer";
import User from "./User/User";
import {UsersContainerPT} from "./UsersContainer";
import Pagination from "../common/Pagination/Pagination";
import Preloader from "../common/Preloader/Preloader";

type UsersPT = Omit<UsersContainerPT, "setUsers" | "setTotalUsersCount" | "togglePreloader">
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
        }, [users])
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