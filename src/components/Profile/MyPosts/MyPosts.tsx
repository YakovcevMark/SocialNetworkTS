import React, {ChangeEvent, useMemo, useState} from 'react';
import Post from "./Post/Post";
import styled from "styled-components";
import {useAppSelector} from "../../../redux/hooks";
import {AddNewPostForm} from "../../common/FormControls/AddNewPostForm";

const StyledMyPosts = styled.div`
  padding: 5px;
  .newPost {
    display: grid;
    width: 500px;
    grid-template-columns: 3fr 2fr;
`
type MyPostsPT = {
    addNewPost?:(postBody:string) => void
}
const MyPosts: React.FC<MyPostsPT> = ({addNewPost}) => {
    const postsData = useAppSelector(state => state.profilePage.postsData)
    const posts = useMemo(() => {
        return postsData?.map(p => <Post key={p.id}
                                     postBody={p.postBody}
                                     likesCount={p.likesCount}
                                     dislikesCount={p.dislikesCount}
                                     id={p.id}
        />)
    }, [postsData])
    const addNewPostHandler = (postBody:string) => {
        addNewPost && postBody.trim() && addNewPost(postBody)
    }
    return (
        <StyledMyPosts>

            <h3>My Posts</h3>
            <AddNewPostForm onSubmit={addNewPostHandler}/>
            {posts}
        </StyledMyPosts>
    );
};

export default MyPosts;