import React, {useMemo} from 'react';
import Post from "./Post/Post";
import styled from "styled-components";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {AddNewPostForm} from "../../common/FormControls/AddNewPostForm";
import {addPost} from "../../../redux/profilePageReducer";

const StyledMyPosts = styled.div`
  padding: 5px;
  .newPost {
    display: grid;
    width: 500px;
    grid-template-columns: 3fr 2fr;
`
type MyPostsPT = {
}
const MyPosts: React.FC<MyPostsPT> = () => {
    const postsData = useAppSelector(state => state.profilePage.postsData)
    const dispatch = useAppDispatch()
    const posts = useMemo(() => {
        return postsData?.map(p => <Post key={p.id}
                                     postBody={p.postBody}
                                     likesCount={p.likesCount}
                                     dislikesCount={p.dislikesCount}
                                     id={p.id}
        />)
    }, [postsData])
    const addNewPostHandler = (postBody:string) => {
        postBody.trim() && dispatch(addPost(postBody))
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