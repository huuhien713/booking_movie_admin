import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { FcFilmReel } from 'react-icons/fc'
import { BiCameraMovie } from 'react-icons/bi'
import { FaUserFriends } from 'react-icons/fa'

const Sidebar = () => {
    const styleActive = {
        color: '#001C41',
        backgroundColor: '#FFD43A'
    }

    return (
        <Wrapper>
            <Admin>
                <div>
                    <img src="https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-1/305582971_447145290781534_7259926296261216391_n.jpg?stp=dst-jpg_p320x320&_nc_cat=1&ccb=1-7&_nc_sid=c6021c&_nc_ohc=QOspP_-QvvMAX8PRlZ9&_nc_ht=scontent.fsgn2-4.fna&oh=00_AfCbpHIEZko0Bl6TGpp8JH8YuFNl6J5OxUOOwDZz0HtkYQ&oe=638A7CFA" alt="avt" />
                </div>
            </Admin>
            <ListManager>
                <ul>
                    <li>
                        <NavLink to='users' style={({ isActive }) => isActive ? styleActive : {}}>
                            <FaUserFriends />
                            <span>Users</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='films' style={({ isActive }) => isActive ? styleActive : {}}>
                            <FcFilmReel />
                            <span>Films</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='showtimes' style={({ isActive }) => isActive ? styleActive : {}}>
                            <BiCameraMovie />
                            <span>ShowTime</span>
                        </NavLink>
                    </li>
                </ul>
            </ListManager>
        </Wrapper>
    )
}

export default Sidebar;

const Wrapper = styled.div`
    grid-row: 1/ span 2;
    color: #fff;;
    background-color: #001C41;

    @media screen and (max-width: 912px) {
        grid-row: 1/ span 1;
        grid-column: 1/span 2;
        display: flex;
        align-items: center;
        padding: 0 16px;
    }
`

const Admin = styled.div`
    height: 20vh;
    padding: 16px;
    border-bottom: 1px solid #475569;
    div {
        width: 100%;
        height: 100%;
        text-align: center;

        img {
            display: block;
            width: 100px;
            height: 100px;
            object-fit: cover;
            margin: auto;
            border-radius: 100%;
            box-shadow: 0 0 10px 1px #FF6347, 0 0 10px 2px #FFDAB9;
            animation: spin 5s linear infinite;
        }
    }
    @media screen and (max-width: 1024px) {
        height: 15vh;
        padding: 0;
        div {
            display: flex;
            align-items: center;
            justify-content: center;
            img {
                width: 50px;
                height: 50px;
            }
            span {
                display: none;
            }
        }
    }
    @media screen and (max-width: 912px) {
        height: auto;
        border-bottom: none;
    }
    @media screen and (max-width: 600px) {
        div {
            img {
                display: none;
            }
        }
    }
`

const ListManager = styled.div`
    ul {
        list-style-type: none;
        li {    
            a {
                width: 100%;
                display: flex;
                align-items: center;    
                color: #fff;
                padding: 12px 8px;
                border-bottom: 1px solid #475569;

                span {
                    margin-left: 12px;
                }

                &:hover {
                    color: #001C41;
                    background-color: #C5DEFD;
                }
            }
        }
    }
    @media screen and (max-width: 1024px) {
        ul {
            span {
                display: none;
            }
            svg {
                width: 100%;
                margin: 12px;
                font-size: 20px;
            }
        }
    }
    @media screen and (max-width: 912px) {
        margin : 0 16px;
        ul {
            display: flex;
            li {
                margin: 16px;
                a {
                    border: none;
                    border-radius: 4px;
                    padding: 0;
                }
                span {
                    display: block;
                    padding-right: 8px;
                }
                svg {
                    padding-left: 8px;
                    margin: 12px 0;
                }
            }
        }
    }
    @media screen and (max-width: 600px) {
        margin: 0;
        ul {
            li {
                margin: 0;
                a {
                    padding: 16px;
                    border-radius: 0;
                    border-left: 1px solid #475569;
                    border-right: 1px solid #475569;
                    svg {
                        margin: 0;
                        padding: 0;
                    }
                    span {
                        display: none;
                    }
                }
            }
        }
    }
`