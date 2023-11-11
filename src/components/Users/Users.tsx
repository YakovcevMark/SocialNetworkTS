import React, {useMemo} from "react";
import {UserT} from "../../redux/usersPageReducer";
import User from "./User";
import {UsersContainerPT} from "./UsersContainer";

type UsersPT = Omit<UsersContainerPT,"setUsers">
const Users: React.FC<UsersPT> =
    ({
         users,
         makeUnFollow,
         makeFollow,
         followingInProgress,
         toggleFollowingInProgress
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

            />)
        }, [users])
        return (

            <>
                {renderedUsers}
                {/*<Pagination*/}
                {/*    totalItemsCount={props.totalUsersCount}*/}
                {/*    pageSize={props.pageSize}*/}
                {/*    currentPage={props.currentPage}*/}
                {/*    pageChanged={props.pageChanged}*/}
                {/*/>*/}
                {/*{props.isFetching ? <Preloader/> :*/}
                {/*    props.users.map(u => <User*/}
                {/*        key={u.id}*/}
                {/*        id={u.id}*/}
                {/*        photos={u.photos}*/}
                {/*        followed={u.followed}*/}
                {/*        followingInProgress={props.followingInProgress}*/}
                {/*        toggleFollowingInProgress={props.toggleFollowingInProgress}*/}
                {/*        makeUnFollow={props.makeUnFollow}*/}
                {/*        makeFollow={props.makeFollow}*/}
                {/*        name={u.name}*/}
                {/*        status={u.status}*/}
                {/*        location={u.location}*/}
                {/*    />)}*/}
            </>
        )
    }
export default Users;