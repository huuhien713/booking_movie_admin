import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import styled from 'styled-components'
import SelectHeThongRap from './SelectHTR';
import { clearError, layLichChieuPhim, taoLichChieu } from '../../../../../services/Slices/movieSlice';
import SelectCumRap from './SelectCR';
import SelectPrice from './SelectPrice';
import Button from '../../../../../components/Button';
import { AiFillStar } from 'react-icons/ai';
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2';

const Showtime = () => {
    const dispatch = useDispatch();
    const { idFilm } = useParams();
    const priceRef = useRef();
    const { showtimes, maCumRap, addShowtime, messageError } = useSelector(state => state.movieSlice);

    const [show, setShow] = useState(showtimes);

    useEffect(() => {
        setShow(showtimes)
    }, [showtimes])

    useEffect(() => {
        dispatch(layLichChieuPhim(idFilm))
    }, [idFilm, dispatch])

    useEffect(() => {
        if (addShowtime) {
            Swal.fire({
                position: 'center',
                text: 'Thêm lịch chiếu thành công',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            })
            dispatch(layLichChieuPhim(idFilm))
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
    }, [addShowtime, dispatch, messageError, idFilm])
    
    const { register, handleSubmit, formState } = useForm({
        defaultValues: {
            ngayChieu: '',
            gioChieu: '',
        },
        mode: 'all'
    });
    const { errors } = formState;

    const onSubmit = (values) => {

        const lichChieu = {
            maPhim: +idFilm,
            ngayChieuGioChieu: `${values.ngayChieu} ${values.gioChieu}`,
            maRap: `${maCumRap}`,
            giaVe: priceRef.current,
        }
        console.log(lichChieu)
        dispatch(taoLichChieu(lichChieu));
    }

    return (
        <Wrapper>
            <div>
                <div className='currentFilm'>
                    <div>
                        <img src={show?.hinhAnh} alt="" />
                    </div>
                    <div>
                        <div>
                            <h3>{show?.tenPhim}</h3>
                            <p>{show?.moTa?.slice(0, 200)}. . .</p>
                        </div>
                        <div className='moreInfo'>
                            <div>
                                <span>
                                </span>
                                <em>{show?.danhGia}</em>
                            </div>
                            <strong>
                                <AiFillStar />
                                <AiFillStar />
                                <AiFillStar />
                                <AiFillStar />
                                <AiFillStar />
                            </strong>
                            <div>
                                <p>Ngày khởi chiếu : {show?.ngayKhoiChieu?.slice(0, 10)}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <ChonLichChieu>
                    <h3>Tạo Lịch Chiếu</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <SelectHeThongRap />
                        <SelectCumRap />
                        <div className='ngayChieu'>
                            <input type="text" placeholder='Nhập Ngày Chiếu' {...register('ngayChieu', {
                                required: {
                                    value: true,
                                    message: 'Ngày chiếu không được bỏ trống'
                                },
                                pattern: {
                                    value: /^(((0[1-9]|[12][0-9]|30)[-/]?(0[13-9]|1[012])|31[-/]?(0[13578]|1[02])|(0[1-9]|1[0-9]|2[0-8])[-/]?02)[-/]?[0-9]{4}|29[-/]?02[-/]?([0-9]{2}(([2468][048]|[02468][48])|[13579][26])|([13579][26]|[02468][048]|0[0-9]|1[0-6])00))$/,
                                    message: "Ngày chiếu không hợp lệ, Ngày chiếu phải có định dạng dd/MM/yyyy!"
                                }
                            })} />
                            {errors.ngayChieu && <p>{errors.ngayChieu.message}</p>}
                        </div>
                        <div className='gioChieu'>
                            <input type="text" placeholder='Nhập Giờ Chiếu' {...register('gioChieu', {
                                required: {
                                    value: true,
                                    message: 'Giờ chiếu không được bỏ trống'
                                },
                                pattern: {
                                    value: /^(((([0-1][0-9])|(2[0-3])):?[0-5][0-9]:?[0-5][0-9]+$))/,
                                    message: "Giờ chiếu không hợp lệ, Giờ chiếu phải có định dạng hh:mm:ss !"
                                }
                            })} />
                            {errors.gioChieu && <p>{errors.gioChieu.message}</p>}
                        </div>
                        <SelectPrice ref={priceRef} />
                        <Button onClick={handleSubmit}>Tạo lịch chiếu</Button>
                    </form>
                </ChonLichChieu>
            </div>
            <DanhSachLichChieu>
                <h3>Danh Sách Lịch Chiếu</h3>
                <div>
                    <div>Cụm rạp</div>
                    <div>Rạp</div>
                    <div>Gía vé</div>
                    <div>Ngày Chiếu - Giờ Chiếu</div>
                    <div>Mã rạp</div>
                </div>
                {show?.heThongRapChieu?.map((cumRap, index) => (
                    <React.Fragment key={index}>
                        {cumRap?.cumRapChieu?.map((rap, index) => (
                            <div key={index}>
                                <p>{rap.tenCumRap}</p>
                                <div>
                                    {rap.lichChieuPhim.map((lichChieu, index) => (
                                        <ul key={index}>
                                            <li>{lichChieu.tenRap}</li>
                                            <li>{lichChieu.giaVe}</li>
                                            <li>{lichChieu.ngayChieuGioChieu}</li>
                                            <li>{lichChieu.maRap}</li>
                                        </ul>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </React.Fragment>
                ))}
            </DanhSachLichChieu>
        </Wrapper>
    )
}

export default Showtime;

const Wrapper = styled.div`
    background-color: #fff;
    padding : 16px;
    height: 100%;

    & > div:first-child {
        display: grid;
        grid-template-columns: 3fr 2fr;
        gap: 16px;
        margin-bottom: 16px;
        .currentFilm {
            display: grid;
            grid-template-columns: 1fr 2fr;
            padding: 16px 0;
            border-radius: 4px;
            box-shadow: 0 0 4px 0 rgba(0,0,0,0.3);            
            & > div {
                img {
                    width: 80%;
                    height: 100%;
                    margin: auto;
                    display: block;
                    object-fit: cover;
                    border-radius: 8px;
                    border: 1px solid #fff;
                }

                p {
                    margin-top: 16px;
                    padding-right: 16px;
                    font-size: 13px;
                }
                .moreInfo {
                    text-align: center;
                    div {
                        position: relative;
                        margin: 16px 0;

                        span {
                            display: block;
                            width: 80px;
                            margin: auto; 
                            height: 80px;
                            border: 2px solid;
                            border-top-color: #F93E3E;
                            border-left-color: #61AFFE;
                            border-right-color: #61AFFE;
                            border-bottom-color: #61AFFE;
                            animation: spin 3s linear infinite;
                            border-radius: 100%;
                            margin-bottom: 16px;
                        }
                        em {
                            display: block;
                            position: absolute;
                            top: 45%;
                            left: 50%;
                            font-size: 40px;
                            transform: translate(-55%, -55%);
                        }
                        strong {
                            font-size: 16px;
                            color: rgb(255, 212, 58);
                        }
                    }
                }
            }
        }
    }
    @media screen and (max-width: 768px) {
        & > div:first-child {
            grid-template-columns: 1fr 2fr;
            .currentFilm {
                grid-template-columns: 1fr;
                & > div:last-of-type {
                    display: none;
                }
                & > div {
                    img {
                        width: 100px;
                    }
                }
            }
        }
    }
`


const ChonLichChieu = styled.div`
    padding: 16px;
    border-radius: 4px;
    box-shadow: 0 0 4px 0 rgba(0,0,0,0.3);
    
    h3 {
        margin-bottom: 16px;
    }

    & > form {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 40px 16px;
        height: 30%;
        & > div {
            width: 100%;    
            height: 100%;
        }
    }

    .ngayChieu, .gioChieu {
        input {
            outline: none;
            width: 100%;
            padding: 8px;
            border-radius: 4px;
            border: 1px solid #eee;
            background-color: #f5f5f5;
        }
        p {
            margin-top: 8px;
            font-size: 11px;
            color: red;
        }
    }
    button {
        width: 100%;
        margin: 0;
    }
    @media screen and (max-width: 768px) {
        form {
            gap: 16px;
        }
    }
`

const DanhSachLichChieu = styled.div`
    height: calc(100% - 320px);
    overflow: auto;
    grid-column: 1/ span 2;
    border-radius: 4px;
    padding: 16px;
    box-shadow: 0 0 4px 0 rgba(0,0,0,0.3);

    & > div {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 4fr;
        border-bottom: 1px solid #eee;
    }

    p {
        padding: 8px 0;
    }

    ul {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        padding: 8px 0;    
        text-align: center;
        li {
            padding: 4px 0;
        }
    }

    & > div:first-of-type {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        text-align: center;
        padding: 8px;
        margin: 8px 0;
        font-weight: 700;
        background-color: #f5f5f5;
    }

    @media screen and (max-width: 912px) {
        height: calc(100% - 410px);
    }

    @media screen and (max-width: 768px) {
        height: calc(100% - 230px);
    }
    @media screen and (max-width: 576px) {
        height: calc(100% - 278px);

        p {
            min-width: 100px;
        }
    }
`