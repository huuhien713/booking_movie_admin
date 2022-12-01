import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components';


const Select = React.forwardRef(({ children, listOption, setValue, firstOption, ...props}, ref) => {
    // dom tới Select, và Option
    const refSelect = useRef();
    const refOption = useRef();
    // state quản lý show,Option
    const [isShow, setIsShow] = useState(false);
    // state quản lý nội dung mặc định của select
    const [optionValue, setOptionValue] = useState();
    // useEffect show Option và close Option
    useEffect(() => {
        if (isShow) {
            refOption.current.style.display = 'block';
        } else {
            refOption.current.style.display = 'none';
        }
    }, [isShow]);
    // useEffect kiểm tra sự kiện khi click vào Select, sẽ đóng khi chọn bên ngoài select
    useEffect(() => {
        if (isShow) {
            document.addEventListener('click', handleClickSelect);
            return () => {
                document.removeEventListener('click', handleClickSelect);
            }
        }
    }, [isShow]);
    // hàm xử lý event click vào select sẽ show option
    const handleClickSelect = (e) => {
        if (refSelect.current) {
            setIsShow(refSelect.current.contains(e.target));
        }
    }
    // set lại giá trị khi khách hàng chọn
    const handleClickOption = (option, value) => {
        setOptionValue(option);
        setValue('maLoaiNguoiDung', value);
    }

    return (
        <Wrapper onClick={handleClickSelect}>
            <label>{children}</label>
            <div>
                <div ref={refSelect} className='select'>
                    {optionValue || firstOption}
                </div>
                <div className='list' ref={refOption}>
                    <ul>
                        {listOption.map((item, index) => (
                            <li key={index} onClick={(e) => handleClickOption(item.content, item.value)}>{item.content}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </Wrapper>
    )
})

export default Select;

const Wrapper = styled.div`
    position: relative;
    width: 100%;

    & > div {
        margin-top: 8px;
        .select {
            width: 100%;
            padding: 8px;
            border-radius: 4px;
            border: 1px solid #ccc;
            background-color: #fff;
        }
        .list {
            position: absolute;
            top: 120%;
            width: 100%;
            border-radius: 4px;
            background-color: #fff;

            &::after {
                content: '';
                display: block;
                width: 10px;
                height: 10px;
                position: absolute;
                top: -5px;
                transform: rotate(45deg);
                left: 30px;
                background-color: #fff;
            }

            ul {
                list-style-type: none;
                li {
                    padding : 8px;
                }
            }
        }
    }
`