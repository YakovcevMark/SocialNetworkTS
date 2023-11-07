import React from 'react';
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./MyPosts/ProfielInfo/ProfileInfo";
type ProfilePT = {

}
const Profile:React.FC<ProfilePT> = () => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts/>
        </div>

    );
};

export default Profile;