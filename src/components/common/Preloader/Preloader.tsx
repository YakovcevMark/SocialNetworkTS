import React from 'react'
import styled from "styled-components";
type PreloaderPT = {
    text?:string
}
const Preloader:React.FC<PreloaderPT> = ({
    text,
    ...rest
}) => {
    return <StyledPreloader>
        <div className='loader'></div>
        {text && <span className='preloaderText'>{text}...</span>}
    </StyledPreloader>
}
const StyledPreloader = styled.div`
  justify-self: center;
  align-self: center;
  .loader {
    overflow:hidden;
    font-size: 10px;
    margin: 50px auto;
    text-indent: -9999em;
    width: 11em;
    height: 11em;
    border-radius: 50%;
    background: rgb(159, 87, 26);
    background: -moz-linear-gradient(left, rgb(159, 87, 26) 10%, rgba(101,171,248, 0) 42%);
    background: -webkit-linear-gradient(left, rgb(159, 87, 26) 10%, rgba(101,171,248, 0) 42%);
    background: -o-linear-gradient(left, rgb(159, 87, 26) 10%, rgba(101,171,248, 0) 42%);
    background: -ms-linear-gradient(left, rgb(159, 87, 26) 10%, rgba(101,171,248, 0) 42%);
    background: linear-gradient(to right, rgb(159, 87, 26) 10%, rgba(101,171,248, 0) 42%);
    position: relative;
    -webkit-animation: load3 1.4s infinite linear;
    animation: load3 1.4s infinite linear;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
  }
  .loader:before {
    width: 50%;
    height: 50%;
    background: rgb(159, 87, 26);
    border-radius: 100% 0 0 0;
    position: absolute;
    top: 0;
    left: 0;
    content: '';
  }
  .loader:after {
    background: rgb(171 165 147);
    width: 75%;
    height: 75%;
    border-radius: 50%;
    content: '';
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  .preloaderText {
    font-weight: bold;
    color:rgb(159, 87, 26);
   
  }
  @-webkit-keyframes load3 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes load3 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`
export default Preloader;