import React from 'react';
import user from "../../../../assets/img/user.png"
import styled from "styled-components";
import Contact from "./Contact/Contact";
import {ProfileInfoT} from "../../../../redux/profilePageReducer";

const StyledProfileInfo = styled.div`
  display: grid;
  grid-template-columns: 2fr 10fr;
  grid-gap: 10px;

  img {
    max-width: 200px;
    background-color: white;
  }

  margin: 5px;
`
type ProfileInfoPT = {
    profileInfo: ProfileInfoT
}
const ProfileInfo: React.FC<ProfileInfoPT> =
    ({
         profileInfo
     }) => {
        let profilePhoto = user && profileInfo.photos.large

        return (
            <StyledProfileInfo>
                <img src={profilePhoto} alt="Profile photo"/>
                <div>
                    {/*<div>*/}
                    {/*    {isOwner && <input type="file" onChange={onSavePhoto}/>}*/}
                    {/*</div>*/}
                    <div>
                        <b>FullName:</b> {profileInfo.fullName}
                    </div>
                    <div>
                        <b>Status:</b>
                        {/*<ProfileStatus*/}
                        {/*    isOwner={isOwner}*/}
                        {/*    status={status}*/}
                        {/*    updateProfileStatusRequest={updateProfileStatusRequest}*/}
                        {/*/>*/}
                    </div>
                    <div>
                        <div><b>aboutMe:</b></div>
                        {profileInfo.aboutMe}
                    </div>
                    <div>
                        <div><b>Ищет работу?</b></div>
                        {profileInfo.lookingForAJob ? "да" : "нет"}
                    </div>
                    <div>
                        <div><b>lookingForAJobDescription:</b></div>
                        {profileInfo.lookingForAJobDescription}
                    </div>
                    <div>
                        <b>Contacts:</b>
                        {Object.keys(profileInfo.contacts).map(key => {
                            return <Contact key={key}
                                            contactName={key}
                                            contactValue={profileInfo.contacts[key]}
                            />
                        })}
                    </div>
                </div>
            </StyledProfileInfo>
        );
    };

export default ProfileInfo;