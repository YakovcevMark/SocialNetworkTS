import React from 'react';
import img from "../../assets/img/logo.png";
import styled from "styled-components";

type HeaderPT = {
    login?: string
}
const Header: React.FC<HeaderPT> =
    ({
         login
     }) => {
        return (
            <StyledHeader>
                <img src={img} alt="."/>
                <div className="userInfo">{login}</div>
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