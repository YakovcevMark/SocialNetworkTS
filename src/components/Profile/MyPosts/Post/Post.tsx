import React from 'react';
import styled from "styled-components";
import user from "../../../../assets/img/user.png"
import {PostT} from "../../../../redux/profilePageReducer";


const StyledPost = styled.div`
  padding: 10px;
  display: grid;
  grid-template-rows: auto;
  width: 500px;
  grid-gap: 5px;

  .payload {
    justify-self: end;
  }

  .item {

    display: grid;
    grid-template-columns: 2fr 16fr;
  }

  .item img {
    align-self: center;
    width: 50px;
    border-radius: 50%;
  }

  .item span {
    padding: 5px;
    height: 100%;
    background-color: rgb(159, 87, 26);
    border-radius: 5px;
    align-self: center;
  }

`

const Post: React.FC<PostT> =
    ({
         id,
         likesCount,
         dislikesCount,
         postBody,

     }) => {
        return <StyledPost>
            <div className='item'>
                <img src={user} alt="user"/>
                <span>{postBody}</span>
            </div>
            <div className="payload">
                <span>likes {likesCount}</span>
                <span> dislikes {dislikesCount}</span>

            </div>
        </StyledPost>
    };
export default Post;