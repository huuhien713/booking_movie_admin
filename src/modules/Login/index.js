import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import { dangNhap } from '../../services/Slices/authSlice';
import { useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup'
import CheckSucess from '../../components/CheckSuccess';
import CheckFail from '../../components/CheckFail';


const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // lấy dữ liệu về từ redux
    const { user } = useSelector(state => state.authSlice);
    // check form
    const { register, handleSubmit, formState } = useForm({
        defaultValue: {
            taiKhoan: '',
            matKhau: ''
        }, mode: 'all'
    });
    const { errors } = formState;
    // hàm submit gửi dữ liệu lên api
    const onSubmit = (values) => {
        dispatch(dangNhap(values));
        setIsOpen(true)
    }
    // state quản lý open Popup
    const [isOpen, setIsOpen] = useState(false);
    // hàm đóng Popup
    const handleOpenModal = () => {
        setIsOpen(false);
    }
    // useEffect quản lý đóng mỏ Popup
    useEffect(() => {
        window.addEventListener('click', handleOpenModal);
        return () => {
            window.removeEventListener('click', handleOpenModal)
        }
    }, [isOpen])
    // kiểm tra trạng thái đăng nhập, nếu có sẽ điều hướng về trang /
    if (user) {
        setTimeout(() => {
            navigate('/admin');
        }, 2000)
    }

    return (
        <Wrapper>
            <div className="container" >
                <div className="top" />
                <div className="bottom" />
                <div className="center">
                    <h2>Please Sign In</h2>
                    <h2>&nbsp;</h2>
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <input type="text" placeholder="Tài Khoản" {...register('taiKhoan', {
                            required: {
                                value: true,
                                message: 'Tài khoản không được bỏ trống'
                            },
                        })} />
                        {errors.taiKhoan && (<p>{errors.taiKhoan.message}</p>)}
                        <input type="password" placeholder="password" {...register('matKhau', {
                            required: {
                                value: true,
                                message: 'Mật khẩu không được bỏ trống'
                            },
                            // pattern: {
                            //     value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                            //     message: 'Mật khẩu phải tối thiểu 8 ký tự ít nhất một chữ cái viết hoa, một chữ cái viết thường, một số và một ký tự đặc biệt'
                            // }
                        })} />
                        {errors.matKhau && (<p>{errors.matKhau.message}</p>)}
                        <div>
                            <button>Sign In</button>
                        </div>
                    </form>
                </div>
            </div>
            <Popup
                modal
                open={isOpen}>
                <Modal>
                    {user ? <CheckSucess /> : <CheckFail />}
                    <p>{user ? 'đăng nhập thành công' : 'đăng nhập không thành công'}</p>
                </Modal>
            </Popup>
        </Wrapper>
    )
}

export default Login;

const Wrapper = styled.div`
    
    .container{
        position:absolute;
        width:100%;
        height:100%;
        overflow:hidden;
    
        &:hover,&:active{
            .top, .bottom{
                &:before, &:after{
                    margin-left: 200px;
                    transform-origin: -200px 50%;
                    transition-delay:0s;
                }
            }
            
            .center{
                opacity:1;
                transition-delay:0.2s;

                form {
                    width: 100%;
                }
            }
        }
    }

    .top, .bottom{
        &:before, &:after{
            content:'';
            display:block;
            position:absolute;
            width:200vmax;
            height:200vmax;
            top:50%;left:50%;
            margin-top:-100vmax;
            transform-origin: 0 50%;
            transition:all 0.5s cubic-bezier(0.445, 0.05, 0, 1);
            z-index:10;
            opacity:0.65;
            transition-delay:0.2s;
        }
    }

    .top{
        &:before{transform:rotate(45deg);background:#e46569;}
        &:after{transform:rotate(135deg);background:#ecaf81;}
    }

    .bottom{
        &:before{transform:rotate(-45deg);background:#60b8d4;}
        &:after{transform:rotate(-135deg);background:#3745b5;}
    }

    .center{
        position:absolute;
        width:400px;
        height:400px;
        top:50%;left:50%;
        margin-left:-200px;
        margin-top:-200px;
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding:30px;
        opacity:0;
        transition:all 0.5s cubic-bezier(0.445, 0.05, 0, 1);
        transition-delay:0s;
        color:#333;
        
        input {
            width:100%;
            padding:15px;
            margin: 5px 0;
            border-radius:1px;
            border:1px solid #ccc;
            font-family:inherit;
        }
        p {
            margin:5px;
            color: red;
            font-size: 0.75rem;
            font-family:inherit;
        }
        div {
            button {
                cursor: pointer;
                display: block;
                width: 25%;
                padding:10px;
                margin-left: auto;
                margin-top: 5px;
                border-radius:1px;
                border:1px solid #ccc;
                background-color: transparent;
            }
        }
    }
`

const Modal = styled.div`
    overflow: hidden;
    border-radius: 8px;
    width: 300px;
    padding: 16px;
    text-align: center;
    border-radius: 8px;
    text-transform: capitalize;
    background-color: #fff;
`