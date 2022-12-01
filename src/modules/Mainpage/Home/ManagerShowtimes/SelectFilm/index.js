import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RiArrowDownSLine } from 'react-icons/ri'
import { danhSachPhim, setMaFilm } from '../../../../../services/Slices/movieSlice';

const SelectFilm = () => {
    const dispatch = useDispatch();
    const { allFilm } = useSelector(state => state.movieSlice);

    const selectRef = useRef();

    const optionRef = useRef();

    const [showMenu, setShowMenu] = useState(false);
    const [select, setSelect] = useState();

    useEffect(() => {
        dispatch(danhSachPhim());
    }, [dispatch]);

    const handleShow = (e) => {
        setShowMenu(selectRef?.current?.contains(e.target));
    }

    useEffect(() => {
        if (showMenu) {
            optionRef.current.style.height = '300px';
        } else {
            optionRef.current.style.height = 0;
        }
        document.addEventListener('click', handleShow);
        return () => {
            document.removeEventListener('click', handleShow)
        }
    }, [showMenu])

    return (
        <SelectMenu>
            <Select ref={selectRef} onClick={handleShow}>
                <span>{select ? select : 'chọn phim'}</span><RiArrowDownSLine />
            </Select>
            <Option ref={optionRef}>
                {allFilm?.map((film, index) =>
                    (<li key={index} onClick={() => {setSelect(film.tenPhim); dispatch(setMaFilm(film.maPhim))}}>{film.tenPhim}</li>))}
            </Option>
        </SelectMenu>
    )
}

export default SelectFilm;

const SelectMenu = styled.div`
    position: relative;
    height: fit-content;
    width: 200px;
`

const Select = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #eee;
    text-transform: capitalize;
    background-color: #f5f5f5;
`

const Option = styled.ul`
    position: absolute;
    top: 110%;
    list-style-type: none;
    width: 100%;
    height: 0;
    border-radius: 4px;
    overflow: hidden;
    overflow-y: scroll;
    background-color: #f5f5f5;
    transition: all 0.3s;
    z-index: 10;

    li {
        padding : 8px;
        &:hover {
            color: #fff;
            background-color: rgba(0,0,0,0.3);
        }
    }
`