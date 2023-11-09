import React from 'react';
import {NavLink} from "react-router-dom";
type DialogItemPT = {
    id:number
    name:string

}
const DialogItem:React.FC<DialogItemPT> =
    ({
         id,
         name
    }) => {
    return  <>
        <NavLink to={`/dialogs/${id}`}>{name}</NavLink>
        </>
};

export default DialogItem;