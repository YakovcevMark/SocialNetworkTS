import React, {ComponentType, memo, useMemo} from 'react';
import styled from "styled-components";
import DialogItem from "./Dialog/DialogItem";
import DialogContent from "./Dialog/DialogContent";
import {useParams} from "react-router";
import {compose} from "redux";
import {withAuthRedirect} from "../common/Hocs/withAuthRedirect";
import {useAppSelector} from "../../redux/hooks";


const DialogsContainer: React.FC =
    () => {
        const {userId} = useParams()
        const state = useAppSelector(state => state.dialogsPage)

        const dialogItems = useMemo(() => {
            return state.dialogsData.map(d => <DialogItem key={d.id} name={d.name} id={d.id}/>)
        }, [state])

        let dialogContent;

        if (userId) {
            dialogContent = state.dialogsData?.find(d => d.id === +userId)
        }


        return (
            <StyledDialogs>
                <div>
                    {dialogItems}
                </div>
                {dialogContent && <DialogContent dialog={dialogContent}/>}
            </StyledDialogs>
        );
    };


export default compose<ComponentType>(
    withAuthRedirect,
    memo,
)(DialogsContainer);
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

