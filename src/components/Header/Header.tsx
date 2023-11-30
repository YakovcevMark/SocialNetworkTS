import React, {memo, useEffect} from 'react';
import img from "../../assets/img/logo.png";
import styled from "styled-components";
import {NavLink} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {getAuthUserData, logoutRequest} from "../../redux/authReducer";

type HeaderPT = {}
const Header: React.FC<HeaderPT> = () => {
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const login = useAppSelector(state => state.auth.data.login)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getAuthUserData())
    }, [dispatch])
    const logOutHandler = () => {
        dispatch(logoutRequest())
    }
    return (
        <StyledHeader>
            <img src={img} alt="."/>
            {isAuth
                ? (<div>
                    <div className="userInfo">{login}</div>
                    <button onClick={logOutHandler}>logout</button>
                </div>)
                : <NavLink to={'login'}>login</NavLink>}
        </StyledHeader>
    );
};

const StyledHeader = styled.div`
  display: flex;
  grid-area: h;
  background-color: burlywood;
  justify-content: space-between;
  align-items: center;

  img {
    margin: 5px;
    height: 60px
  }

  //.userInfo{
  //  display: grid;
  //  justify-self: end;
  //  align-self: center;
  //}

`
export default memo(Header);