import React, {useMemo} from 'react';
import styled from "styled-components";
import DialogItem from "./Dialog/DialogItem";
import DialogContent from "./Dialog/DialogContent";
import {useParams} from "react-router";
import {useStoreContext} from "../../App";

type DialogsContainerPT = {

}

const DialogsContainer: React.FC<DialogsContainerPT> =
    ({}) => {
        const {userId} = useParams()

        const dialogsData = useStoreContext()?.getState().dialogsState.dialogsData

        const dialogItems = useMemo(() => {
            return dialogsData?.map(d => <DialogItem key={d.id} name={d.name} id={d.id}/>)
        }, [dialogsData])
        let dialogContent;
        if (userId) {
            dialogContent = dialogsData?.find(d => d.id === +userId)
        }
        // const dialogContent = dialogsData?.find(d => d.id === +userId)
        return (
            <StyledDialogs>
                <div>
                    {dialogItems}
                </div>
                {dialogContent && <DialogContent dialog={dialogContent}/>}
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

export default DialogsContainer;