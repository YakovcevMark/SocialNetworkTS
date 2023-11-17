import s from "../Users.module.css";
import React from "react";
import {NavLink} from "react-router-dom";
import userPNG from "../../../assets/img/user.png"
import {UserT} from "../../../redux/usersPageReducer";
import {UsersContainerPT} from "../UsersContainer";
import {usersAPI} from "../../../api/samuraiAPI";

type UserPT =
    UserT
    & Omit<UsersContainerPT, "users" | "setUsers" | "totalUsersCount" | "pageSize" | "currentPage" | "setCurrentPage" | "setTotalUsersCount" | "isFetching" | "togglePreloader">
const User: React.FC<UserPT> =
    ({
         id,
         followingInProgress,
         toggleFollowingInProgress,
         makeFollow,
         makeUnFollow,
         status,
         name,
         photos,
         followed,
         // location
     }) => {
        const onMakeFollow = () => {
            toggleFollowingInProgress(true, id);
            usersAPI.makeFollow(id)
                .then(resp => {
                    if (resp.data.resultCode === 0) {
                        toggleFollowingInProgress(false, id);
                        makeFollow(id);
                    }
                })
        }
        const onMakeUnFollow = () => {
            toggleFollowingInProgress(true, id);
           usersAPI.makeUnFollow(id)
                .then(resp => {
                    if (resp.data.resultCode === 0) {
                        toggleFollowingInProgress(false, id);
                        makeUnFollow(id);
                    }
                })
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
export default User;