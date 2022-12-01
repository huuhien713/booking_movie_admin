import React from 'react';
import styled from 'styled-components'
import Sidebar from './Sidebar';
import Title from '../Mainpage/Title';
import { Outlet } from 'react-router-dom';

const Mainpage = () => {
    
    return (
        <Wrapper>
            <Sidebar />
            <Title />
            <Outlet />
        </Wrapper>
    )
}

export default Mainpage;

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 15% 85%;
    grid-template-rows: 10% 90%;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    scroll-behavior: smooth;
    
    & > div {
        overflow: hidden;
    }

    @media screen and (max-width: 1024px) {
        grid-template-columns: 8% 92%;
    }
    @media screen and (max-width: 912px) {
        display: block;
    }
`

