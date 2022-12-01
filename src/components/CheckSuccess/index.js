import React from 'react'
import styled from 'styled-components';


const CheckSucess = () => {
    return (
        <Wrapper>
            <div>
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
                    <circle className="path circle" fill="none" stroke="#73AF55" strokeWidth={6} strokeMiterlimit={10} cx="65.1" cy="65.1" r="62.1" />
                    <polyline className="path check" fill="none" stroke="#73AF55" strokeWidth={6} strokeLinecap="round" strokeMiterlimit={10} points="100.2,40.2 51.5,88.8 29.8,67.5 " />
                </svg>
                <p className="success">Success !</p>
            </div>
        </Wrapper>
    )
}

export default CheckSucess;


const Wrapper = styled.div`
    svg {
        width: 100px;
        display: block;
        margin: 40px auto 0;
    }

    .path {
    stroke-dasharray: 1000;
    stroke-dashoffset: 0;
        &.circle {
            -webkit-animation: dash .9s ease-in-out;
            animation: dash .9s ease-in-out;
        }
        &.check {
            stroke-dashoffset: -100;
            -webkit-animation: dash-check .9s .35s ease-in-out forwards;
            animation: dash-check .9s .35s ease-in-out forwards;
        }
    }

    p {
        text-align: center;
        margin: 20px 0;
        font-size: 1.25em;
        &.success {
            color: #73AF55;
        }
    }

    @-webkit-keyframes dash-check {
        0% {
            stroke-dashoffset: -100;
        }
        100% {
            stroke-dashoffset: 900;
        }
    }

    @keyframes dash-check {
        0% {
            stroke-dashoffset: -100;
        }
        100% {
            stroke-dashoffset: 900;
        }
    }
`