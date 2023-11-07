import React from 'react';
import img from "../../assets/img/logo.png";
import styled from "styled-components";
type HeaderPT = {

}
const Header:React.FC<HeaderPT> = () => {
    return (
        <StyledHeader>
            <img src={img} alt="."/>
        </StyledHeader>
    );
};

const StyledHeader = styled.div`
    grid-area: h;
    background-color: burlywood;
  img{
    margin:5px;
    height: 60px
  }
  
`
export default Header;