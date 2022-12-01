import React, { useEffect, useImperativeHandle } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components';
import Button from '../../../../../components/Button';
import Select from '../../../../../components/Select'
import { capNhatNguoiDung, layNguoiDung, setIsEdit, themNguoiDung, xoaNguoiDung } from '../../../../../services/Slices/authSlice';

const FormUser = React.forwardRef(({ modalRef, ...rest }, ref) => {
    const list = [
        { id: 1, value: 'KhachHang', content: 'Khách hàng' },
        { id: 2, value: 'QuanTri', content: 'Quản trị' },
    ];
    const { userEdit, isEdit } = useSelector(state => state.authSlice);
    const dispatch = useDispatch();
    // const modalRef = useRef();
    useImperativeHandle(ref, () => ({
        handleDelete: (taikhoan) => dispatch(xoaNguoiDung(taikhoan)),
        handleEdit: (user) => {
            dispatch(layNguoiDung(user));
            // mở form đăng ký
            modalRef.current.show();
            // điền các trường =  dữ liệu vừa nhận về từ redux
            setValue("taiKhoan", userEdit?.taiKhoan);
            setValue("matKhau", userEdit?.matKhau);
            setValue("email", userEdit?.email);
            setValue("soDT", userEdit?.soDT);
            setValue("maNhom", userEdit?.maNhom);
            setValue("maLoaiNguoiDung", userEdit?.maLoaiNguoiDung);
            setValue("hoTen", userEdit?.hoTen);
        },
        handleShowModal: () => {
            // đóng form
            modalRef.current.show();
            // clear các trường về rổng
            setValue("taiKhoan", "")
            setValue("matKhau", "")
            setValue("email", "")
            setValue("soDT", "")
            setValue("maNhom", "GP01")
            setValue("maLoaiNguoiDung", "")
            setValue("hoTen", "")
            // set lại isEdit = false để thay đổi nút THÊM || CẬP NHẬT
            if (isEdit) {
                dispatch(setIsEdit());
            }
        }
    }))
    // khai báo useFomr
    const { register, handleSubmit, reset, formState, setValue } = useForm({
        defaultValues: {
            "taiKhoan": "",
            "matKhau": "",
            "email": "",
            "soDT": "",
            "maNhom": "GP01",
            "maLoaiNguoiDung": "KhachHang",
            "hoTen": ""
        }, mode: 'all'
    });
    const { errors } = formState;
    useEffect(() => {
        if (userEdit) reset(userEdit)
    }, [userEdit, reset])
    // hàm xử lý form submit đăng ký mới || cập nhật
    const onSubmit = (values) => {
        if (!isEdit) {
            // disptach lên redux
            dispatch(themNguoiDung(values));
            // đóng form đăng ký
            modalRef.current.show();
        } else {
            // tạo biến userUpdate phù hợp với dữ liệu API yêu cầu
            const userUpdate = {
                "taiKhoan": `${values.taiKhoan}`,
                "matKhau": `${values.matKhau}`,
                "email": `${values.email}`,
                "soDT": `${values.soDT}`,
                "maNhom": `${values.maNhom}`,
                "maLoaiNguoiDung": `${values.maLoaiNguoiDung === 'Quản trị' ? 'QuanTri' : 'KhachHang'}`,
                "hoTen": `${values.hoTen}`
            };
            // disptach lên redux
            dispatch(capNhatNguoiDung(userUpdate));
            // đóng form đăng ký
            modalRef.current.show();
        }
    }
    const handleShowModal = () => {
        // đóng form
        modalRef.current.show();
        // clear các trường về rổng
        setValue("taiKhoan", "")
        setValue("matKhau", "")
        setValue("email", "")
        setValue("soDT", "")
        setValue("maNhom", "GP01")
        setValue("maLoaiNguoiDung", "")
        setValue("hoTen", "")
        // set lại isEdit = false để thay đổi nút THÊM || CẬP NHẬT
        if (isEdit) {
            dispatch(setIsEdit());
        }
    }

    return (
        <Form className='form'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div>
                        <label>tài khoản</label>
                        <input type="text" {...register('taiKhoan', {
                            required: {
                                value: true,
                                message: 'Tài khoản không được bỏ trống'
                            }
                        })} />
                        {errors.taiKhoan && (<p>{errors.taiKhoan.message}</p>)}
                    </div>
                    <div>
                        <label>mật khẩu</label>
                        <input type="password" {...register('matKhau', {
                            required: {
                                value: true,
                                message: 'Mật khẩu không được bỏ trống'
                            },
                            pattern : {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                message: 'Mật khẩu phải tối thiểu 8 ký tự ít nhất một chữ cái viết hoa, một chữ cái viết thường, một số và một ký tự đặc biệt'
                            }
                        })} />
                        {errors.matKhau && (<p>{errors.matKhau.message}</p>)}
                    </div>
                    <div>
                        <label>email</label>
                        <input type="text" {...register('email', {
                            required: {
                                value: true,
                                message: 'Email không được bỏ trống'
                            },
                            pattern : {
                                value : /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                                message: 'Email không đúng định dạng'
                            }
                        })} />
                        {errors.email && (<p>{errors.email.message}</p>)}
                    </div>
                    <div>
                        <label>số điện thoại</label>
                        <input type="" {...register('soDT', {
                            required: {
                                value: true,
                                message: 'Số điện thoại không được bỏ trống'
                            },
                            pattern: {
                                value: /[0-9]{10,16}/,
                                message: 'Số điện thoại phải là số, từ 10 - 16 kí số'
                            }
                        })} />
                        {errors.soDT && (<p>{errors.soDT.message}</p>)}
                    </div>
                    <div>
                        <label>mã nhóm</label>
                        <input disabled type="text" {...register('maNhom')} />
                    </div>
                    <Select listOption={list} firstOption={userEdit?.maLoaiNguoiDung || 'Khách Hàng'} setValue={setValue}>loại người dùng</Select>
                    <div>
                        <label>họ & tên</label>
                        <input type="text" {...register('hoTen', {
                            required: {
                                value: true,
                                message: 'Họ và tên không được bỏ trống'
                            }
                        })} />
                        {errors.hoTen && (<p>{errors.hoTen.message}</p>)}
                    </div>

                </div>
                <div>
                    {
                        isEdit ? <Button color={'#fff'} bgColor={'#2563eb'}>Cập nhật</Button> :
                            <Button color={'#fff'} bgColor={'#2563eb'}>Thêm mới</Button>
                    }
                    <Button type={'button'} onClick={handleShowModal} color={'#fff'} bgColor={'#e11d48'}>Hủy</Button>
                </div>
            </form>
        </Form>
    )
})

export default FormUser;

export const Form = styled.div`
    width: 100%;

    form {
        & > div:first-child {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
            padding: 16px;

            div {
                label {
                    text-transform: capitalize;
                }
                input {
                    display: block;
                    width: 100%;
                    padding: 8px;
                    outline: none;
                    border-radius: 4px;
                    border: 1px solid #ccc;
                    margin-top: 8px;
                }
                p {
                    margin-top: 4px;
                    font-size: 10px;
                    color: red;
                }
            }
        }
        & > div:last-child {
            padding: 12px 16px;
            border-top: 1px solid #fff;
            text-align: right;
        }
    }
`