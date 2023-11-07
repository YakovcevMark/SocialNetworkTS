import React from 'react';
import styled from "styled-components";
type DialogContentPT ={

}
const DialogContent: React.FC<DialogContentPT> =
    ({}) => {
        return (
            <>
                <StyledDialogContent>
                    <div className='message'>I see u</div>
                    <div className='message'>And</div>
                    <div className='message'>I know it was</div>
                    <div className='message'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi at culpa cumque esse nisi possimus quia repudiandae sunt vel voluptatem?</div>
                    <div className='answer'>No!</div>
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
  .message {
    max-width: 300px;
    justify-items: start;
    border: goldenrod 1px solid;
    border-radius: 25px;
    padding: 5px 0 5px 10px;
    margin: 2px;
    background-color: rgba(48, 123, 222, 0.62);

  }
  .answer {
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