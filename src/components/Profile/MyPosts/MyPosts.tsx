import React from 'react';
import Post from "./Post/Post";
import styled from "styled-components";
const StyledMyPosts = styled.div`
  padding: 5px;
  .newPost{
    display: grid;
    width:500px;
    grid-template-columns: 3fr 2fr;
  }
`
const MyPosts:React.FC = () => {
    return (
        <StyledMyPosts>
            <h3>My Posts</h3>
            <div className='newPost'>
                <textarea></textarea>
                <button>Add new post</button>
            </div>
            <Post postText={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur, dicta, hic! Dignissimos enim et laboriosam molestias natus necessitatibus odit quod!"} likeCount={5}/>
            <Post postText={"kek"} likeCount={10}/>
            <Post postText={"arbidol"} likeCount={15}/>

        </StyledMyPosts>
    );
};

export default MyPosts;