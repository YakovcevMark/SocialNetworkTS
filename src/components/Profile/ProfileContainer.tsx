import React, {useEffect} from 'react';
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./MyPosts/ProfielInfo/ProfileInfo";
import {
    getProfileInfoRequest,
} from "../../redux/profilePageReducer";
import {useParams} from "react-router";
import Preloader from "../common/Preloader/Preloader";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";



export const ProfileContainer: React.FC = () => {

    const {userId} = useParams()
    const isFetching = useAppSelector(state => state.profilePage.isFetching)
    const currentUserId = useAppSelector(state => state.auth.data.id)
    const dispatch = useAppDispatch()
    useEffect(() => {
        userId
            ? dispatch(getProfileInfoRequest(+userId))
            : currentUserId && dispatch(getProfileInfoRequest(currentUserId))
    }, [userId, dispatch, currentUserId])

    return isFetching ? <Preloader/> : (
        <div>
            <ProfileInfo />
            <MyPosts />
        </div>
    );
};