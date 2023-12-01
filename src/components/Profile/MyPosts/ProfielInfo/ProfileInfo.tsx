import React, {ChangeEvent} from 'react';
import user from "../../../../assets/img/user.png"
import styled from "styled-components";
import Contact from "./Contact/Contact";
import {useAppDispatch, useAppSelector} from "../../../../redux/hooks";
import {ProfileStatus} from "./ProfileStatus/ProfileStatus";
import {savePhoto} from "../../../../redux/profilePageReducer";

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

}
const ProfileInfo: React.FC<ProfileInfoPT> =
    () => {
        const profileInfo = useAppSelector(state => state.profilePage.profileInfo)
        const sessionUserId = useAppSelector(state => state.auth.data.id)
        const dispatch = useAppDispatch()
        const savePhotoHandler = (e:ChangeEvent<HTMLInputElement>) => {
            if(e.target.files && e.target.files.length){
                dispatch(savePhoto(e.target.files[0]))
            }
        }

        const profilePhoto = profileInfo ? profileInfo.photos.large : user
        const isOwner =  sessionUserId === profileInfo.userId
        return (
            <StyledProfileInfo>
                <img src={profilePhoto} alt="Profile"/>
                <div>
                    <div>
                        {isOwner && <input type="file" onChange={savePhotoHandler}/>}
                    </div>
                    <div>
                        <b>FullName:</b> {profileInfo.fullName}
                    </div>
                    <div>
                        <b>Status:</b>
                        <ProfileStatus
                            isOwner={isOwner}
                        />
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