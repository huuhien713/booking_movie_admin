import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RiArrowDownSLine } from 'react-icons/ri'
import { layCumRap, layHeThongRap } from '../../../../../../services/Slices/movieSlice';

const SelectHeThongRap = () => {
    const dispatch = useDispatch();
    const { heThongRap } = useSelector(state => state.movieSlice);

    const selectRef = useRef();

    const optionRef = useRef();

    const [showMenu, setShowMenu] = useState(false);
    const [select, setSelect] = useState();

    useEffect(() => {
        dispatch(layHeThongRap());
    }, [dispatch]);

    useEffect(() => {
        if (select) {
            dispatch(layCumRap(select));
        }
    }, [select, dispatch])

    const handleShow = (e) => {
        setShowMenu(selectRef?.current?.contains(e.target));
    }

    useEffect(() => {
        if (showMenu) {
            optionRef.current.style.height = '190px';
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
                <span>{select ? select : 'chọn hệ thống rạp'}</span><RiArrowDownSLine />
            </Select>
            <Option ref={optionRef}>
                {heThongRap?.map((heThongRap, index) =>
                    (<li key={index} onClick={() => setSelect(heThongRap.maHeThongRap)}>{heThongRap.maHeThongRap}</li>))}
            </Option>
        </SelectMenu>
    )
}

export default SelectHeThongRap;

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