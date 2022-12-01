import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RiArrowDownSLine } from 'react-icons/ri'
import { setMaCumRap } from '../../../../../../services/Slices/movieSlice';

const SelectCumRap = () => {
    const dispatch = useDispatch();
    const { cumRap } = useSelector(state => state.movieSlice);

    const selectRef = useRef();

    const optionRef = useRef();

    const [showMenu, setShowMenu] = useState(false);
    const [select, setSelect] = useState();

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
                <span>{select ? select : 'chọn cụm rạp'}</span><RiArrowDownSLine />
            </Select>
            <Option ref={optionRef}>
                {cumRap?.map((cumRap, index) =>
                    (<li key={index} onClick={() => { 
                        setSelect(cumRap.tenCumRap); 
                        dispatch(setMaCumRap(cumRap.maCumRap)) 
                        }}>
                            {cumRap.tenCumRap}
                    </li>))}
            </Option>
        </SelectMenu>
    )
}

export default SelectCumRap;

const SelectMenu = styled.div`
    position: relative;
    width: 200px;
    height: fit-content;
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
        font-size: 12px;
        &:hover {
            color: #fff;
            background-color: rgba(0,0,0,0.3);
        }
    }
`