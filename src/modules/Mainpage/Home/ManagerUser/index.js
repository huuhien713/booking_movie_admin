import React, { useEffect, useRef, useState } from 'react'
import Button from '../../../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, danhSachNguoiDung } from '../../../../services/Slices/authSlice';
import { MdEdit, MdDelete } from 'react-icons/md';
import Loading from '../../../../components/Loading';
import Modal from '../../../../components/Modal';
import * as Styles from './styles'
import SearchUser from './SearchUser';
import FormUser from './FormUser';
import Swal from 'sweetalert2'
import { GrFormPrevious, GrFormNext } from 'react-icons/gr'

const ManagerUser = () => {
    const dispatch = useDispatch();
    // lấy dữ liệu từ redux
    const { userList, isLoading, isAdd, isDel, isUpdate, messageError } = useSelector(state => state.authSlice);
    // state quản lý page
    const [pageNumber, setPageNumber] = useState(0);
    // useEffect componentDidMount
    useEffect(() => {
        dispatch(danhSachNguoiDung());
    }, [dispatch])
    // dom tới modal, notice
    const modalRef = useRef();
    const formRef = useRef();
    // useEffect show Hide kết quả action
    useEffect(() => {
        if (isDel || isAdd || isUpdate) {
            dispatch(danhSachNguoiDung());
            Swal.fire({
                position: 'center',
                icon: 'success',
                text: `${isDel ? 'Xóa người dùng thành công!' : isAdd ? 'Thêm người dùng thành công!' : isUpdate ? 'Cập nhật thông tin thành công!' : 'Success !'}`,
                showConfirmButton: false,
                timer: 1500
            })
        } else if (messageError) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                text: `${messageError}`,
                showConfirmButton: false,
                timer: 1500
            });
            dispatch(clearError());
        }
    }, [isDel, isAdd, isUpdate, messageError, dispatch])

    return (<>
        <Styles.UserList>
            <div className='feature'>
                <Button onClick={() => formRef.current.handleShowModal()} bgColor={'#9EF89F'}>
                    <span> + tạo mới nhân viên</span>
                </Button>
                <SearchUser />
            </div>
            <div className='table'>
                {isLoading ?
                    <div style={{ marginTop: 150 }}>
                        <Loading />
                    </div> :
                    <table>
                        <thead>
                            <tr>
                                <td>STT</td>
                                <td>Tài khoản</td>
                                <td>Họ & Tên</td>
                                <td>Số điện thoại</td>
                                <td>Email</td>
                                <td>Loại người dùng</td>
                                <td>Tính năng</td>
                            </tr>
                        </thead>
                        <tbody>
                            {userList.slice(pageNumber, pageNumber + 10)?.map((user, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{user.taiKhoan}</td>
                                    <td>{user.hoTen}</td>
                                    <td>{user.soDT}</td>
                                    <td>{user.email}</td>
                                    <td>{user.maLoaiNguoiDung}</td>
                                    <td>
                                        <Button onClick={() => formRef.current.handleEdit(user)}><MdEdit /></Button>
                                        <Button onClick={() => formRef.current.handleDelete(user.taiKhoan)}><MdDelete /></Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>}
            </div>
            <div className='pageNav'>
                <Button onClick={() => { if (pageNumber !== 0) setPageNumber(prev => prev - 10) }}><GrFormPrevious /></Button>
                {Array(6).fill(0).map((item, index) => (
                    <Button
                        key={index}
                        color={index === pageNumber / 10 ? '#fff' : ''}
                        bgColor={index === pageNumber / 10 ? '#2563eb' : ''}
                        onClick={() => setPageNumber(index * 10)}
                    >{index + 1}</Button>
                ))}
                <Button onClick={() => { if (pageNumber + 10 <= userList.length) setPageNumber(prev => prev + 10) }}><GrFormNext /></Button>
            </div>
        </Styles.UserList>
        <Modal ref={modalRef}>
            <div className='title' style={{ padding: '16px', borderBottom: '1px solid #fff' }}>
                <h3>Thêm Thành Viên Mới</h3>
            </div>
            <FormUser ref={formRef} modalRef={modalRef} />
        </Modal>
    </>)
}

export default ManagerUser;
