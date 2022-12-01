import React, { useEffect } from 'react'
import { MdDelete, MdEdit } from 'react-icons/md';
import { GoCalendar } from 'react-icons/go'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Button from '../../../../../components/Button';
import SearchFilm from '../SearchFilm';
import Loading from '../../../../../components/Loading';
import { danhSachPhim, setIsEdit, xoaPhim } from '../../../../../services/Slices/movieSlice';
import * as Styles from '../style'

const ListFilm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // lấy dữ liệu từ redux
    const { allFilm, isLoading, isDel, messageError } = useSelector(state => state.movieSlice);
    // useEffect componentDidMount
    useEffect(() => {
        dispatch(danhSachPhim())
    }, [dispatch])
    // useEffect quản lý popup khi del
    useEffect(() => {
        if (isDel) {
            Swal.fire({
                position: 'center',
                title: 'Xóa phim thành công !',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            })
            dispatch(danhSachPhim());
        } else if (messageError) {
            Swal.fire({
                position: 'center',
                title: 'Xóa phim thất bại !',
                icon: 'error',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }, [isDel, messageError, dispatch]);
    // hàm xử lý Del, & Edit
    const handleDelete = (maPhim) => dispatch(xoaPhim(maPhim));
    const handleEdit = (film) => navigate(`/admin/films/edit/${film.maPhim}`);
    const handleShowtime = (maPhim) => navigate(`/admin/films/showtime/${maPhim}`);

    return (
        <Styles.FilmList>
            <div className='feature'>
                <Button onClick={() => {navigate('/admin/films/addnew'); dispatch(setIsEdit())}}>
                    <span> + tạo mới phim</span>
                </Button>
                <SearchFilm />
            </div>
            <div className='table'>
                {isLoading ?
                    <div style={{ marginTop: 150 }}>
                        <Loading />
                    </div> :
                    <table>
                        <thead>
                            <tr>
                                <td>Mã Phim</td>
                                <td>Poster & Trailer</td>
                                <td>Tên phim</td>
                                <td>Mô tả</td>
                                <td>Ngày khởi chiếu</td>
                                <td>Đánh giá</td>
                                <td>Tính năng</td>
                            </tr>
                        </thead>
                        <tbody>
                            {allFilm.map((film, index) => (
                                <tr key={index}>
                                    <td>{film.maPhim}</td>
                                    <td>
                                        <a href={film.trailer} alt={film.biDanh}>
                                            <img src={film.hinhAnh} alt="" style={{ width: 40, height: 60, borderRadius: 4 }} />
                                        </a>
                                    </td>
                                    <td>{film.tenPhim}</td>
                                    <td>{`${film.moTa?.slice(0, 150)} . . .`}</td>
                                    <td>{film.ngayKhoiChieu?.slice(0, 10)}</td>
                                    <td>{film.danhGia} điểm</td>
                                    <td>
                                        <Button onClick={() => handleEdit(film)}><MdEdit /></Button>
                                        <Button onClick={() => handleDelete(film.maPhim)}><MdDelete /></Button>
                                        <Button onClick={() => handleShowtime(film.maPhim)}><GoCalendar /></Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>}
            </div>
        </Styles.FilmList>
    )
}

export default ListFilm