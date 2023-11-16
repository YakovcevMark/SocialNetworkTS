import React, {useEffect} from 'react';
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./MyPosts/ProfielInfo/ProfileInfo";
import profileInfo from "./MyPosts/ProfielInfo/ProfileInfo";
import {connect} from "react-redux";
import {addPost, PostT, ProfileInfoT, setProfileInfo, togglePreloader} from "../../redux/profilePageReducer";
import {AppStateType} from "../../redux/reduxStore";
import {useParams} from "react-router";
import axios from "axios";
import Preloader from "../common/Preloader/Preloader";
type ProfileContainerPT = MapStateToPropsT & MapDispatchToPropsT
const ProfileContainer: React.FC<ProfileContainerPT> = (
    {
        posts,
        addPost,
        setProfileInfo,
        profileInfo,
        isFetching,
        togglePreloader
    }) => {
    const {userId} = useParams()
    useEffect(() => {
        togglePreloader(true)
        const requestParameter = userId ? +userId : 30061
        axios
            .get(`https://social-network.samuraijs.com/api/1.0/profile/${requestParameter}`)
            .then(resp => {
                setProfileInfo(resp.data)
                togglePreloader(false)
            })
    }, [userId, setProfileInfo,togglePreloader])
    // console.log(userId)

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
}
type MapDispatchToPropsT = {
    addPost: (newPostBody: string) => void
    setProfileInfo: (profileInfo: ProfileInfoT) => void
    togglePreloader:(v:boolean) => void
}
const mapStateToProps = (state: AppStateType): MapStateToPropsT => {
    return {
        profileInfo: state.profilePage.profileInfo,
        posts: state.profilePage.postsData,
        isFetching:state.profilePage.isFetching
    }
}
// const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsT => {
//     return {
//         addPost: (newPostBody: string) => {
//             dispatch(addPost(newPostBody))
//         }
//     }
//
// }
export default connect(mapStateToProps, {addPost, setProfileInfo, togglePreloader})(ProfileContainer);