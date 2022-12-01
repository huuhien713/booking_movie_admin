import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import SelectPrice from '../ManagerFilm/Showtime/SelectPrice';
import { useForm } from 'react-hook-form';
import { clearError, layLichChieuPhim, taoLichChieu } from '../../../../services/Slices/movieSlice';
import SelectCumRap from '../ManagerFilm/Showtime/SelectCR';
import SelectHeThongRap from '../ManagerFilm/Showtime/SelectHTR';
import SelectFilm from './SelectFilm';
import Button from '../../../../components/Button'
import Swal from 'sweetalert2';
const ManagerShowtimes = () => {
    const dispatch = useDispatch();
    const {maPhim, maCumRap, addShowtime, messageError } = useSelector(state => state.movieSlice);

    const priceRef = useRef();

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
            maPhim: maPhim,
            ngayChieuGioChieu: `${values.ngayChieu} ${values.gioChieu}`,
            maRap: `${maCumRap}`,
            giaVe: priceRef.current,
        }
        console.log(lichChieu);
        dispatch(taoLichChieu(lichChieu));
    }

    useEffect(() => {
        if (addShowtime) {
            Swal.fire({
                position: 'center',
                text: 'Thêm lịch chiếu thành công',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            })
            dispatch(layLichChieuPhim(maPhim))
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
    }, [addShowtime, dispatch, messageError])

    return (
        <Wrapper>
            <ChonLichChieu>
                <h3>Tạo Lịch Chiếu</h3>
                <form onSubmit={handleSubmit(onSubmit)}>    
                    <SelectHeThongRap />
                    <SelectCumRap />
                    <SelectFilm />
                    <SelectPrice ref={priceRef} />
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
                    <div>
                        <Button onClick={handleSubmit}>Tạo lịch chiếu</Button>
                    </div>
                </form>
            </ChonLichChieu>
        </Wrapper>
    )
}

export default ManagerShowtimes;

const Wrapper = styled.div`
    height: 90%;
    background-color: #fff;
    padding : 16px; 
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
        div:last-child {
            grid-column: 1 / span 2;
            text-align: center;
            button {
                width: 30%;
            }

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
    @media screen and (max-width: 576px) {
        & > form {
            display: block;
            & > div {
                margin-bottom: 16px;
            }
            div:last-child {
                button {
                    width : 50%;
                }
            }
        }
    }
`