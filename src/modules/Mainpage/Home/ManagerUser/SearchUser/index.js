import React, { useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { TimKiem } from '../../../../../services/Slices/authSlice';


const SearchUser = () => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const handleSearch = (e) => {
        setSearch(e.target.value);
        if (e.target.value !== '') {
            dispatch(TimKiem(e.target.value));
        } else {
            dispatch(TimKiem());
        }
    }
    return (
        <SearchBar>
            <div>
                <div className='searchIcon'>
                    <BsSearch />
                </div>
                <input type="text" placeholder='Tìm kiếm' value={search} onChange={handleSearch} />
            </div>
        </SearchBar>
    )
}

export default SearchUser;
const SearchBar = styled.div`
    width: 200px;
    margin-left: auto;
    & > div {
        display: flex;
        align-items: center;
        margin-right: 12px;
        border-radius: 4px;
        border: 1px solid #ccc;
        background-color: #f5f5f5;
        
        input {
            width: 100%;
            padding: 8px;
            border: none;
            outline: none;
            background-color: transparent;
        }

        .searchIcon {
            padding: 6px;
            cursor: pointer;
            border-right: 1px solid #ccc;
            svg {
                font-size: 16px;
                vertical-align: middle;
            }
        }

    }
`