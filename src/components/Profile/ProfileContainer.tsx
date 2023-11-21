import React, {useEffect} from 'react';
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./MyPosts/ProfielInfo/ProfileInfo";
import {connect} from "react-redux";
import {addPost, getProfileInfoRequest, PostT, ProfileInfoT} from "../../redux/profilePageReducer";
import {AppStateType} from "../../redux/reduxStore";
import {useParams} from "react-router";
import Preloader from "../common/Preloader/Preloader";
import {Navigate} from "react-router-dom";

type ProfileContainerPT = MapStateToPropsT & MapDispatchToPropsT
const ProfileContainer: React.FC<ProfileContainerPT> = (
    {
        posts,
        addPost,
        profileInfo,
        isFetching,
        getProfileInfoRequest,
        isAuth,
        currentUserId
    }) => {
    const {userId} = useParams()

    useEffect(() => {
        userId
            ? getProfileInfoRequest(+userId)
            : currentUserId && getProfileInfoRequest(currentUserId)
    }, [userId, getProfileInfoRequest,currentUserId])

    if (!isAuth && !userId) {
        return <Navigate to={"/login"}/>
    }

    return isFetching ? <Preloader/> : (
        <div>
            <ProfileInfo profileInfo={profileInfo}/>
            <MyPosts postsData={posts} addNewPost={addPost}/>
        </div>
    );
};
type MapStateToPropsT = {
    profileInfo: ProfileInfoT
    posts: PostT[]
    isFetching: boolean
    isAuth: boolean
    currentUserId:number
}
type MapDispatchToPropsT = {
    addPost: (newPostBody: string) => void
    getProfileInfoRequest: (userId: number) => void
}
const mapStateToProps = (state: AppStateType): MapStateToPropsT => {
    return {
        profileInfo: state.profilePage.profileInfo,
        posts: state.profilePage.postsData,
        isFetching: state.profilePage.isFetching,
        isAuth: state.auth.isAuth,
        currentUserId: state.auth.data.id
    }
}
export default connect(mapStateToProps, {addPost, getProfileInfoRequest})(ProfileContainer);