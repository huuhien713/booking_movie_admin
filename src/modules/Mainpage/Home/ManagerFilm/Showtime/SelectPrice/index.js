import React, { useEffect, useImperativeHandle, useRef, useState } from 'react'
import styled from 'styled-components';
import { RiArrowDownSLine } from 'react-icons/ri'

const SelectPrice = React.forwardRef((props, ref) => {

    const prices = [
        { id: 1, giaVe: 50000 },
        { id: 2, giaVe: 75000 },
        { id: 3, giaVe: 90000 },
        { id: 4, giaVe: 120000 },
        { id: 5, giaVe: 160000 },
    ];

    useImperativeHandle(ref, () => {
        return select;
    })
    const selectRef = useRef();
    const optionRef = useRef();

    const [showMenu, setShowMenu] = useState(false);
    const [select, setSelect] = useState();

    const handleShow = (e) => {
        setShowMenu(selectRef?.current?.contains(e.target));
    }

    useEffect(() => {
        if (showMenu) {
            optionRef.current.style.height = 'fit-content';
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
                <span>{select ? select.toLocaleString() + ' VNĐ' : 'chọn giá vé'}</span><RiArrowDownSLine />
            </Select>
            <Option ref={optionRef}>
                {prices.map((item, index) =>
                    (<li key={index} onClick={() => { setSelect(item.giaVe) }}>{item.giaVe}</li>))}
            </Option>
        </SelectMenu>
    )
})

export default SelectPrice;

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
        font-size: 12px;
        &:hover {
            color: #fff;
            background-color: rgba(0,0,0,0.3);
        }
    }
`