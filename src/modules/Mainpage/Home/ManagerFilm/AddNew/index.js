import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import * as Styles from './styles';
import Swal from 'sweetalert2';
import Button from '../../../../../components/Button';
import { capNhatPhim, clearError, danhSachPhim, layPhim, themPhim } from '../../../../../services/Slices/movieSlice';

const Addnew = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { idFilm } =  useParams();
    const { isAdd, isEdit, isUpdate, filmEdit, messageError } = useSelector(state => state.movieSlice);
    const [imgPreview, setImgPreView] = useState(null);
    // khai báo useFomr
    const { register, handleSubmit, reset, formState, setValue } = useForm({
        defaultValues: {
            tenPhim: `${filmEdit?.tenPhim === undefined ? "" : filmEdit?.tenPhim}`,
            biDanh: `${filmEdit?.biDanh === undefined ? "" : filmEdit?.biDanh}`,
            trailer: `${filmEdit?.trailer === undefined ? "" : filmEdit?.trailer}`,
            moTa: `${filmEdit?.moTa === undefined ? "" : filmEdit?.moTa}`,
            maNhom: "GP01",
            ngayKhoiChieu:  `${filmEdit?.ngayKhoiChieu === undefined ? "" : filmEdit?.ngayKhoiChieu}`,
            dangChieu: `${filmEdit?.dangChieu === undefined ? false : filmEdit?.dangChieu}`,
            sapChieu: `${filmEdit?.sapChieu === undefined ? false : filmEdit?.sapChieu}`,
            hot: `${filmEdit?.hot === undefined ? false : filmEdit?.hot}`,
            danhGia: `${filmEdit?.danhGia === undefined ? "5" : filmEdit?.danhGia}`,
            hinhAnh: `${filmEdit?.hinhAnh === undefined ? "" : filmEdit?.hinhAnh}`,
        }, mode: 'all'
    });
    // reset filmEdit
    useEffect(() => {
        if (filmEdit) reset(filmEdit);
    }, [filmEdit, reset])

    const { errors } = formState;

    const handleChangeImage = (e) => {
        const file = e.target.files[0];
        if (!file) return
        setValue('hinhAnh', file);
        // hiển thị ảnh choi người dùng xem
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            // console.log(e.target.result);
            setImgPreView(e.target.result)
        }
        fileReader.readAsDataURL(file);
    }

    // hàm xử lý form submit đăng ký mới || cập nhật
    const onSubmit = (values) => {
        console.log(values)
        const formData = new FormData();
        
        for (let key in values) {
            formData.append(key, values[key]);
        }

        if (!isEdit) {
            dispatch(themPhim(formData));
        } else {
            dispatch(capNhatPhim(formData));
        }
    }

    useEffect(() => {
        if (idFilm === undefined) return;
        dispatch(layPhim(idFilm));
    }, [idFilm, dispatch])

    useEffect(() => {
        if (isAdd || isUpdate) {
            Swal.fire({
                position: 'center',
                title: `${isAdd ? 'Thêm phim thành công' : isUpdate ? 'Cập nhật phim thành công' : 'Success !'}`,
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            })
            dispatch(danhSachPhim());
            setTimeout(() => {
                navigate('/admin/films');
            }, 1500)
        } else if (messageError) {
            Swal.fire({
                position: 'center',
                text: `${messageError}`,
                icon: 'error',
                showConfirmButton: false,
                timer: 1500
            })
            dispatch(clearError());
        }
    }, [isAdd, isUpdate, messageError, navigate, dispatch]);

    return (
        <Styles.Wrapper>
            <div>
                <div className='title'>
                    <h3>Thêm Phim Mới</h3>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='main'>
                    <div className='field'>
                        <h4>Tên Phim</h4>
                        <span>:</span>
                        <div>
                            <input type="text" {...register('tenPhim', {
                                required: {
                                    value: true,
                                    message: 'Tên phim không được bỏ trống'
                                }
                            })} />
                        </div>
                        {errors.tenPhim && (<p>{errors.tenPhim.message}</p>)}
                    </div>
                    <div className='field'>
                        <h4>Bí Danh</h4>
                        <span>:</span>
                        <div>
                            <input type="text" {...register('biDanh', {
                                required: {
                                    value: true,
                                    message: 'Bí Danh không được bỏ trống'
                                }
                            })} />
                        </div>
                        {errors.biDanh && (<p>{errors.biDanh.message}</p>)}
                    </div>
                    <div className='field'>
                        <h4>Trailer</h4>
                        <span>:</span>
                        <div>
                            <input type="text" {...register('trailer', {
                                required: {
                                    value: true,
                                    message: 'Trailer không được bỏ trống'
                                }
                            })} />
                        </div>
                        {errors.trailer && (<p>{errors.trailer.message}</p>)}
                    </div>
                    <div className='field'>
                        <h4>Mô tả</h4>
                        <span>:</span>
                        <div>
                            <input type="text" {...register('moTa', {
                                required: {
                                    value: true,
                                    message: 'Mô tả không được bỏ trống'
                                }
                            })} />
                        </div>
                        {errors.moTa && (<p>{errors.moTa.message}</p>)}
                    </div>
                    <div className='field'>
                        <h4>Ngày khởi chiếu</h4>
                        <span>:</span>
                        <div>
                            <input type="text" {...register('ngayKhoiChieu', {
                                required: {
                                    value: true,
                                    message: 'Ngày khởi chiếu không được bỏ trống'
                                },
                                pattern : {
                                    value: /^(((0[1-9]|[12][0-9]|30)[-/]?(0[13-9]|1[012])|31[-/]?(0[13578]|1[02])|(0[1-9]|1[0-9]|2[0-8])[-/]?02)[-/]?[0-9]{4}|29[-/]?02[-/]?([0-9]{2}(([2468][048]|[02468][48])|[13579][26])|([13579][26]|[02468][048]|0[0-9]|1[0-6])00))$/,
                                    message: "Ngày chiếu không hợp lệ, Ngày chiếu phải có định dạng dd/MM/yyyy!"
                                }
                            })} />
                        </div>
                        {errors.ngayKhoiChieu && (<p>{errors.ngayKhoiChieu.message}</p>)}
                    </div>
                    <div className='field'>
                        <h4>Đang chiếu</h4>
                        <span>:</span>
                        <div>
                            <input type="checkbox" {...register('dangChieu')} />
                        </div>
                    </div>
                    <div className='field'>
                        <h4>Sắp chiếu</h4>
                        <span>:</span>
                        <div>
                            <input type="checkbox" {...register('sapChieu')} />
                        </div>
                    </div>
                    <div className='field'>
                        <h4>Hot</h4>
                        <span>:</span>
                        <div>
                            <input type="checkbox" {...register('hot')} />
                        </div>
                    </div>
                    <div className='field'>
                        <h4>Đánh giá</h4>
                        <span>:</span>
                        <div>
                            <input type="number" min={0} max={10} {...register('danhGia')} />
                        </div>
                    </div>
                    <div className='field'>
                        <h4>Hình ảnh</h4>
                        <span>:</span>
                        <div>
                            <input type="file" onChange={(e) => handleChangeImage(e)} />
                            <br />
                            {errors.hinhAnh && (<p>{errors.hinhAnh.message}</p>)}
                            <div>
                                {imgPreview ? <img src={imgPreview} alt='' /> : <img src={filmEdit?.hinhAnh} alt='' />}
                            </div>
                        </div>
                    </div>
                    <div className='field'>
                        <h4>Tác vụ</h4>
                        <span>:</span>
                        <div>
                            {
                                isEdit ? <Button color={'#fff'} bgColor={'#2563eb'}>Cập nhật</Button> :
                                    <Button color={'#fff'} bgColor={'#2563eb'}>Thêm mới</Button>
                            }
                            <Button type={'button'} onClick={() => navigate('/admin/films')} color={'#fff'} bgColor={'#e11d48'}>Trở về</Button>
                        </div>
                    </div>
                </form>
            </div>
        </Styles.Wrapper>
    )
}

export default Addnew;

