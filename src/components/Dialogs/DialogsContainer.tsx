import React, {useMemo} from 'react';
import styled from "styled-components";
import DialogItem from "./Dialog/DialogItem";
import DialogContent from "./Dialog/DialogContent";
import {useParams} from "react-router";
import {addMessage, DialogsStateT} from "../../redux/dialogsPageReducer";
import {AppStateType} from "../../redux/reduxStore";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {Navigate} from "react-router-dom";

type DialogsContainerPT = MapStateToPropsT & MapDispatchToPropsT

const DialogsContainer: React.FC<DialogsContainerPT> =
    ({
         addMessage,
         state,
        isAuth
     }) => {
        const {userId} = useParams()


        const dialogItems = useMemo(() => {
            return state.dialogsData.map(d => <DialogItem key={d.id} name={d.name} id={d.id}/>)
        }, [state])

        let dialogContent;

        if (userId) {
            dialogContent = state.dialogsData?.find(d => d.id === +userId)
        }

        if (!isAuth) {
            return <Navigate to={"/login"}/>
        }
        return (
            <StyledDialogs>
                <div>
                    {dialogItems}
                </div>
                {dialogContent && <DialogContent addMessage={addMessage} dialog={dialogContent}/>}
            </StyledDialogs>
        );
    };
type MapStateToPropsT = {
    state: DialogsStateT
    isAuth:boolean
}
type MapDispatchToPropsT = {
    addMessage: (newMessageBody: string, dialogId: number) => void
}
const mapStateToProps = (state: AppStateType): MapStateToPropsT => ({
    state: state.dialogsPage,
    isAuth:state.auth.isAuth
})
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsT => ({
    addMessage: (newMessageBody: string, dialogId: number) => {
        dispatch(addMessage(newMessageBody, dialogId))
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(DialogsContainer);
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

