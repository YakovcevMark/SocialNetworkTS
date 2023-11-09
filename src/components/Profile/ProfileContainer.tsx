import React from 'react';
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./MyPosts/ProfielInfo/ProfileInfo";
import {useStoreContext} from "../../App";
type ProfileContainerPT = {

}
const ProfileContainer:React.FC<ProfileContainerPT> = () => {
    const store = useStoreContext()
    return (
        <div>
            <ProfileInfo/>
            <MyPosts postsData={store?.getState().profileState.postsData} addNewPost={store?.addNewPost.bind(store)}/>
        </div>

    );
};

export default ProfileContainer;