import React, {ComponentType, useCallback, useEffect} from 'react';
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./MyPosts/ProfielInfo/ProfileInfo";
import {connect} from "react-redux";
import {
    addPost,
    getProfileInfoRequest,
    updateProfileStatusRequest
} from "../../redux/profilePageReducer";
import {useParams} from "react-router";
import Preloader from "../common/Preloader/Preloader";
import {compose} from "redux";
import {withAuthRedirect} from "../common/Hocs/withAuthRedirect";
import {useAppSelector} from "../../redux/hooks";

type ProfileContainerPT = & MapDispatchToPropsT

const ProfileContainer: React.FC<ProfileContainerPT> = (
    {
        addPost,
        getProfileInfoRequest,
        updateProfileStatusRequest,
    }) => {


    const {userId} = useParams()
    const isFetching = useAppSelector(state => state.profilePage.isFetching)
    const currentUserId = useAppSelector(state => state.auth.data.id)

    useEffect(() => {
        userId
            ? getProfileInfoRequest(+userId)
            : currentUserId && getProfileInfoRequest(currentUserId)
    }, [userId, getProfileInfoRequest, currentUserId])

    return isFetching ? <Preloader/> : (
        <div>
            <ProfileInfo updateProfileStatusRequest={updateProfileStatusRequest}/>
            <MyPosts addNewPost={addPost}/>
        </div>
    );
};

type MapDispatchToPropsT = {
    addPost: (newPostBody: string) => void
    getProfileInfoRequest: (userId: number) => void
    updateProfileStatusRequest: (status: string) => void

}
export default compose<ComponentType>(
    withAuthRedirect,
    connect(() => {},
        {addPost, getProfileInfoRequest, updateProfileStatusRequest})
)(ProfileContainer);