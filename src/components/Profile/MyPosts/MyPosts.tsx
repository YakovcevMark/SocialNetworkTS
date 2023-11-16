import React, {ChangeEvent, useMemo, useState} from 'react';
import Post from "./Post/Post";
import styled from "styled-components";
import {PostT} from "../../../redux/profilePageReducer";

const StyledMyPosts = styled.div`
  padding: 5px;
  .newPost {
    display: grid;
    width: 500px;
    grid-template-columns: 3fr 2fr;
  }
`
type MyPostsPT = {
    postsData:PostT[]
    addNewPost?:(postBody:string) => void
}
const MyPosts: React.FC<MyPostsPT> = ({postsData,addNewPost}) => {
    const posts = useMemo(() => {
        return postsData?.map(p => <Post key={p.id}
                                     postBody={p.postBody}
                                     likesCount={p.likesCount}
                                     dislikesCount={p.dislikesCount}
                                     id={p.id}
        />)
    }, [postsData])
    const [title,setTitle] = useState<string>("")
    const addNewPostHandler = () => {
        addNewPost && title.trim() && addNewPost(title)
        setTitle("");
    }
    const onChangeHandler = (e:ChangeEvent<HTMLTextAreaElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (
        <StyledMyPosts>
            <h3>My Posts</h3>
            <div className='newPost'>
                <textarea value={title} onChange={onChangeHandler}></textarea>
                <button onClick={addNewPostHandler}>Add new post</button>
            </div>
            {posts}
        </StyledMyPosts>
    );
};

export default MyPosts;