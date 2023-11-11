import React from 'react';
import user from "../../../../assets/img/user.png"
import styled from "styled-components";
const StyledProfileInfo = styled.div`
  display:grid;
  grid-template-columns: 2fr 10fr;
  grid-gap: 10px;
  img{
    max-width: 200px;
    background-color: white;
  }
  margin: 5px;
`
type ProfileInfoPT={

}
const ProfileInfo:React.FC<ProfileInfoPT> =
    ({

     }) => {
        return (
            <StyledProfileInfo>
                <img src={user} alt=""/>
                <div>Description</div>
            </StyledProfileInfo>
        );
    };

export default ProfileInfo;