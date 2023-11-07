import React from 'react';
import styled from "styled-components";
import {NavLink} from "react-router-dom";
type NavbarPT = {

}
const Navbar: React.FC<NavbarPT> = () => {
    return (
        <StyledNavbar>
            <NavLink to={"/profile"}>Profile</NavLink>
            <NavLink to={"/dialogs"}>Dialogs</NavLink>
            <NavLink to={"/users"}>Users</NavLink>
        </StyledNavbar>
    );
};
const StyledNavbar = styled.div`
  grid-area: n;
  background-color: #736046;
  padding: 5px;
 

  a {
    display: block;
    appearance: none;
    color: black;
    text-decoration: none;
  }

  a:hover {
    color: #b69a5a;
  }

  .active {
    color: goldenrod;
  }
`
export default Navbar;