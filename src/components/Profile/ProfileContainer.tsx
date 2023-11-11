import React from 'react';
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./MyPosts/ProfielInfo/ProfileInfo";
import {connect} from "react-redux";
import {addPost, ProfileStateT} from "../../redux/profilePageReducer";
import {AppStateType} from "../../redux/reduxStore";
import {Dispatch} from "redux";
type ProfileContainerPT = MapStateToPropsT & MapDispatchToPropsT
const ProfileContainer:React.FC<ProfileContainerPT> = (
    {
        state,
        addPost
    }) => {
    // const store = useStoreContext()
    return (
        <div>
            <ProfileInfo/>
            <MyPosts postsData={state.postsData} addNewPost={addPost}/>
        </div>

    );
};
type MapStateToPropsT = {
    state: ProfileStateT
}
type MapDispatchToPropsT = {
    addPost: (newPostBody:string) => void
}
const mapStateToProps = (state:AppStateType):MapStateToPropsT => {
    return{
        state: state.profilePage
    }
}
const mapDispatchToProps = (dispatch: Dispatch):MapDispatchToPropsT => {
    return{
        addPost:(newPostBody:string) =>{
            dispatch(addPost(newPostBody))
        }
    }

}
export default connect(mapStateToProps,mapDispatchToProps)(ProfileContainer);