import React, {useMemo} from 'react';
import styled from "styled-components";
import {addMessage, DialogT} from "../../../redux/dialogsPageReducer";
import {AddNewMessageForm} from "../../common/FormControls/AddNewMessageForm";
import {useAppDispatch} from "../../../redux/hooks";

type DialogContentPT = {
    dialog: DialogT
}
const DialogContent: React.FC<DialogContentPT> =
    ({
         dialog,
     }) => {
        const dispatch = useAppDispatch()
        const renderMessages = useMemo(() => {
            return dialog.messages.map(m => <div
                key={m.id}
                className={m.type}>
                {m.message}
            </div>)
        }, [dialog])

        const onAddMessage = (newMessageBody:string) => {
            newMessageBody.trim() &&
            dispatch(addMessage(newMessageBody,dialog.id))
        }
        return (
            <>
                <StyledDialogContent>
                    {renderMessages}
                        <AddNewMessageForm onSubmit={onAddMessage}/>
                </StyledDialogContent>
            </>

        );
    };

export default DialogContent;

const StyledDialogContent = styled.div`
  display: grid;
  background-image: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrCKVj1-g3zHrU5AeECjoDetg4Hmocpqa2BQ&usqp=CAU');
  word-break: break-word;
  .input {
    max-width: 300px;
    justify-items: start;
    border: goldenrod 1px solid;
    border-radius: 25px;
    padding: 5px 0 5px 10px;
    margin: 2px;
    background-color: rgba(48, 123, 222, 0.62);

  }
  .output {
    justify-self: end;
    border: goldenrod 1px solid;
    border-radius: 25px;
    padding: 5px 10px 5px 10px;
    margin: 2px;
    background-color: rgba(48, 222, 190, 0.62);
  }
`
