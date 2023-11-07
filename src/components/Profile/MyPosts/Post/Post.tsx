import React from 'react';
import styled from "styled-components";
import user from "../../../../assets/img/user.png"


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
    padding:5px ;
    height: 100%;
    background-color:  rgb(159, 87, 26) ;
    border-radius: 5px;
    align-self: center;
  }

`
type PostPT = {
    postText: string
    likeCount: number
}
const Post: React.FC<PostPT> =
    ({
         postText,
         likeCount
     }) => {
        return <StyledPost>
            <div className='item'>
                <img src={user} alt="user"/>
                <span>{postText}</span>
            </div>
            <div className="payload">
                <span>likes {likeCount}</span>
            </div>
        </StyledPost>
    };
export default Post;