import React from 'react';
import img from "../../assets/img/logo.png";
import styled from "styled-components";
import {NavLink} from "react-router-dom";

type HeaderPT = {
    login?: string
    isAuth: boolean
    logoutRequest: () => void
}
const Header: React.FC<HeaderPT> =
    ({
         isAuth,
         login,
         logoutRequest,
     }) => {
        const logOutHandler = () => {
            logoutRequest()
        }
        return (
            <StyledHeader>
                <img src={img} alt="."/>
                {isAuth
                    ? (<div>
                        <div className="userInfo">{login}</div>
                        <div onClick={logOutHandler}>logout</div>
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
export default Header;