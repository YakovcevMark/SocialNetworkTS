import React, {useMemo} from 'react';
import styled from "styled-components";
import {DialogT} from "../../../redux/dialogsPageReducer";

type DialogContentPT = {
    dialog: DialogT
}
const DialogContent: React.FC<DialogContentPT> =
    ({
         dialog
     }) => {

        const renderMessages = useMemo(() => {
            return dialog.messages.map(m => <div
                key={m.id}
                className={m.type}>
                {m.message}
            </div>)
        }, [dialog])

        return (
            <>
                <StyledDialogContent>
                    {renderMessages}
                    <div className='newMessage'>
                        <textarea></textarea>
                        <button>Send message</button>
                    </div>
                </StyledDialogContent>
            </>

        );
    };
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

  .newMessage {
    display: grid;
    grid-template-columns: 10fr 2fr;
  }
`
export default DialogContent;