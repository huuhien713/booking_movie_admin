import React, { useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { TimKiemPhim } from '../../../../../services/Slices/movieSlice';


const SearchFilm = () => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const handleSearch = (e) => {
        setSearch(e.target.value);
        if (e.target.value !== '') {
            dispatch(TimKiemPhim(e.target.value));
        } else {
            dispatch(TimKiemPhim());
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

export default SearchFilm;
const SearchBar = styled.div`

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