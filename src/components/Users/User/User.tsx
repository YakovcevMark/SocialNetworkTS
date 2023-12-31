import s from "../Users.module.css";
import React, {memo} from "react";
import {NavLink} from "react-router-dom";
import userPNG from "../../../assets/img/user.png"
import {makeFollow, makeUnFollow} from "../../../redux/usersPageReducer";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {UserT} from "../../../api/samuraiAPI";



const User: React.FC<UserT> =
    ({
         id,
         status,
         name,
         photos,
         followed,
     }) => {
        const followingInProgress = useAppSelector(state => state.usersPage.followingInProgress)
        const dispatch = useAppDispatch()
        const onMakeFollow = () => {
            dispatch(makeFollow(id))
        }
        const onMakeUnFollow = () => {
            dispatch(makeUnFollow(id))
        }
        return (
            <>
                <div className={s.item}>

                    <NavLink to={`/profile/${id}`}>
                        <div>
                            <img src={photos.small ? photos.small : userPNG} alt=""/>
                        </div>
                    </NavLink>
                    <div className={s.description}>
                        <div className={s.name}>{name}</div>
                        <div className={s.status}>{status}</div>
                        {
                            followed
                                ? <button disabled={followingInProgress.some(userId => userId === id)}
                                          onClick={onMakeUnFollow}>UnFollow</button>
                                : <button disabled={followingInProgress.some(userId => userId === id)}
                                          onClick={onMakeFollow}>Follow</button>}
                    </div>
                </div>
            </>
        )
    }
export default memo(User);
// import s from "../Users.module.css";
// import React from "react";
// import {NavLink} from "react-router-dom";
// import userPNG from "../../../assets/img/user.png"
// import {UserT} from "../../../redux/usersPageReducer";
// import {UsersContainerPT} from "../UsersContainer";
//
// type UserPT =
//     UserT
//     & Omit<UsersContainerPT, "users" | "setUsers" | "totalUsersCount" | "pageSize" | "getUsersRequest" | "currentPage" | "setCurrentPage" | "setTotalUsersCount" | "isFetching" | "togglePreloader">
// const User: React.FC<UserPT> =
//     ({
//          id,
//          followingInProgress,
//          toggleFollowingInProgress,
//          makeFollow,
//          makeUnFollow,
//          status,
//          name,
//          photos,
//          followed,
//          // location
//      }) => {
//         const onMakeFollow = () => {  makeFollow(id)}
//         const onMakeUnFollow = () => { makeUnFollow(id) }
//         return (
//             <>
//                 <div className={s.item}>
//
//                     <NavLink to={`/profile/${id}`}>
//                         <div>
//                             <img src={photos.small ? photos.small : userPNG} alt=""/>
//                         </div>
//                     </NavLink>
//                     <div className={s.description}>
//                         <div className={s.name}>{name}</div>
//                         <div className={s.status}>{status}</div>
//                         {
//                             followed
//                                 ? <button disabled={followingInProgress.some(userId => userId === id)}
//                                           onClick={onMakeUnFollow}>UnFollow</button>
//                                 : <button disabled={followingInProgress.some(userId => userId === id)}
//                                           onClick={onMakeFollow}>Follow</button>}
//                     </div>
//                 </div>
//             </>
//         )
//     }
// export default User;