import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Swal from 'sweetalert2';

import { logout } from '../../../services/Slices/authSlice';

const Title = () => {
    const { user } = useSelector(state => state.authSlice);

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    }
    
    const handleInfo = () => {
        Swal.fire({
            icon: 'info',
            title: 'My Info',
            html: `<p style="text-align: left">
                <span style="display: block">Name: ${user.hoTen}</span><br/>
                <span style="display: block">Phone: ${user.soDT}</span><br/>
                <span style="display: block">Account: ${user.taiKhoan}</span><br/>
                <span style="display: block">Email: ${user.email}</span><br/>
            </p>`,
        })
    }

    return (
        <Wrapper>
            <img onClick={handleInfo} src="https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-1/305582971_447145290781534_7259926296261216391_n.jpg?stp=dst-jpg_p320x320&_nc_cat=1&ccb=1-7&_nc_sid=c6021c&_nc_ohc=QOspP_-QvvMAX8PRlZ9&_nc_ht=scontent.fsgn2-4.fna&oh=00_AfCbpHIEZko0Bl6TGpp8JH8YuFNl6J5OxUOOwDZz0HtkYQ&oe=638A7CFA" alt="avt" />
            <h3 onClick={handleLogout}>LogOut</h3>
            <strong>|</strong>
            <h3>{user.hoTen}</h3>
        </Wrapper>
    )
}

export default Title;

const Wrapper = styled.div`
    grid-row: 1/ span 1;
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    margin: 8px 16px;
    border-radius: 4px;
    box-shadow: 0 0 4px 0 rgba(0,0,0, 0.3);
    background-color: #fff;
    img {
        border-radius: 100%;
        width: 45px;
        height: 45px;
        margin: 0 8px;
        cursor: pointer;
        transition: all 0.5s;
        &:hover {
            animation: spin 3s linear infinite;
            box-shadow: 0 0 4px 0 red;
        }
    }
    h3 {
        padding: 8px;
        margin: 0 4px;
        color: #ccc;
        transition: all 0.5s;
        &:last-of-type {
            color: rgb(37, 99, 235);
        }
        &:first-of-type {
            border-radius: 8px;
            color: #d5d5d5;
            transition: all 0.5s;
            cursor: pointer;
            border: 1px solid transparent;
            
            &:hover {
                color: #fff;
                border: 1px solid #d5d5d5;
                box-shadow: 0 0 0 20px #d5d5d5 inset;
            }
        }
    }

    @media screen and (max-width: 912px) {
        position: absolute;
        top: 0;
        right: 0;
        margin: 16px;
        background-color: transparent;
    }

    @media screen and (max-width: 912px) {

        h3 {
            &:last-of-type {
                display: none;
            }   
        }
        strong {
            display: none;
        }
    }
    @media screen and (max-width: 600px) {
        margin: 4px 16px;
        
    }

`