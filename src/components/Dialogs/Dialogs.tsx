import React from 'react';
import styled from "styled-components";
import DialogContent from "./Dialog/DialogContent";
import DialogItem from "./Dialog/DialogItem";
import {v1} from "uuid";
type DialogsPT = {

}

const Dialogs:React.FC<DialogsPT> =
    ({

     }) => {
    return (
        <StyledDialogs>
            <div>
                <DialogItem  name={"Atrem"} id={v1()}/>
                <DialogItem  name={"Katya"} id={v1()}/>
                <DialogItem  name={"Vanya"} id={v1()}/>
                <DialogItem  name={"Sveta"} id={v1()}/>
                <DialogItem  name={"Andry"} id={v1()}/>
            </div>
            <DialogContent/>
        </StyledDialogs>
    );
};
const StyledDialogs = styled.div`
  display: grid;
  grid-template-columns: 2fr 10fr;
  a {
    display: block;
    text-decoration: none;
    color: black;
  }

  a:hover {
    color: #986c46;
  }
  a.active {
    color: #b76902;
  }
`

export default Dialogs;