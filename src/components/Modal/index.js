import React, { useEffect, useImperativeHandle, useRef, useState } from 'react'
import styled from 'styled-components';

const Modal = React.forwardRef(({children, ...props}, ref) => {
    const modalRef = useRef();
    const modalContentRef = useRef();

    const [show, setShow] = useState(false);

    useImperativeHandle(ref, () => ({
        show: () => setShow(!show)
    }))

    useEffect(() => {
        if (show) {
            modalRef.current.style.visibility = 'visible';
            modalContentRef.current.style.transform = 'translateY(0)';
        } else {
            modalContentRef.current.style.transform = 'translateY(-200%)';
            modalRef.current.style.visibility = 'hidden';
        }
    }, [show])

    return (
        <Wrapper ref={modalRef}>
            <div ref={modalContentRef}>
                {children}
            </div>
        </Wrapper>
    )
})

export default Modal;

const Wrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    background-color: rgba(0,0,0,0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 1s;
    visibility: hidden;

    & > div {
        width: 30%;
        margin: auto;
        border-radius: 4px;
        background-color: #F0F4F5;
        transform: translateY(-200%);
        transition: all 1s;
        overflow: hidden;
    }
    @media screen and (max-width: 912px) {
        &>  div {
            width: 60%;
        }
    }
    @media screen and (max-width: 500px) {
        &>  div {
            width: 80%;
        }
    }
`