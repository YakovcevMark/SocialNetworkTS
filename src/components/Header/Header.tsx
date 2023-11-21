import React from 'react';
import img from "../../assets/img/logo.png";
import styled from "styled-components";
import {Navigate, NavLink} from "react-router-dom";

type HeaderPT = {
    login?: string
    isAuth: boolean
}
const Header: React.FC<HeaderPT> =
    ({
        isAuth,
         login
     }) => {
        return (
            <StyledHeader>
                <img src={img} alt="."/>
                {isAuth
                    ? <div className="userInfo">{login}</div>
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
export default Header;