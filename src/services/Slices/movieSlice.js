import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { movieApi } from "../movieApi";

const initialState = {
    isLoading: false,
    messageError: null,

    allFilm: [],
    filmPage: [],

    filmEdit: null,

    isAdd: false,
    isDel: false,
    isEdit: false,
    isUpdate: false,

    showtimes: [], 
    heThongRap: [],
    cumRap: [],

    maPhim : null,
    maCumRap: null,

    addShowtime: false,
}

export const danhSachPhim = createAsyncThunk(
    'movie/allFilm',
    async () => {
        try {
            const { data } = await movieApi.getFilm();
            return data.content;
        } catch (error) {
            throw (error)
        }
    }
)

export const TimKiemPhim = createAsyncThunk(
    'movie/searchFilm',
    async (search) => {
        try {
            const { data } = await movieApi.TimKiemFilm(search);
            return data.content;
        } catch (error) {
            throw (error)
        }
    }
)

export const themPhim = createAsyncThunk(
    'movie/addPhim',
    async (film, { rejectWithValue }) => {
        const data = await movieApi.addFilm(film)
        .then((response) => {
            return rejectWithValue(response.response.data.content);
        })
        .catch(error => {
            console.log(error);
        })
        return data;
    }
)

export const xoaPhim = createAsyncThunk(
    'movie/deletePhim',
    async (maPhim) => {
        try {
            const {data} = await movieApi.xoaFilm(maPhim);
            return data;
        } catch (error) {
            throw (error)
        }
    }
)

export const layPhim = createAsyncThunk(
    'movie/editPhim',
    async (idFilm) => {
        try {
            const { data } = await movieApi.layFilmEdit(idFilm);
            console.log(data)
            return data.content;
        } catch (error) {
            throw (error)
        }
    }
)

export const capNhatPhim = createAsyncThunk(
    'movie/updatePhim',
    async (film, { rejectWithValue }) => {
        const data = await movieApi.capNhatFilm(film)
        .then((res) => {
            console.log(res);
            return rejectWithValue(res.response.data.content);
        })
        .catch(error => {
            console.log(error);
        });
        return data;
    }
)

export const layLichChieuPhim = createAsyncThunk(
    'movie/getLichChieuPhim',
    async (maPhim) => {
        try {
            const {data} = await movieApi.layLichChieuFilm(maPhim);
            return data.content;
        } catch (error) {
            throw(error)
        }
    }
)

export const layHeThongRap = createAsyncThunk(
    'movie/getHeThongRap',
    async () => {
        try {
            const {data} = await movieApi.getHeThongRap();
            return data.content;
        } catch (error) {
            throw(error)
        }
    }
)

export const layCumRap = createAsyncThunk(
    'movie/getCumRap',
    async (maHeThongRap) => {
        try {
            const {data} = await movieApi.getCumRap(maHeThongRap);
            return data.content;
        } catch (error) {
            throw(error)
        }
    }
)

export const taoLichChieu = createAsyncThunk(
    'movie/taoLichChieu',
    async (lich, {rejectWithValue}) => {
        const data = await movieApi.taoLichChieu(lich)
        .then(res => {
            return rejectWithValue(res.response.data.content)
        })
        .catch(error => {
            console.log(error);
        })
        return data
    }
)


const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {
        setIsEdit: (state) => {
            return { ...state, isEdit: false, filmEdit: null };
        },
        clearError: (state) => {
            return { ...state, messageError: null };
        },
        setMaCumRap: (state, rap) => {
            return {...state, maCumRap : rap.payload};
        },
        setMaFilm: (state, maPhim) => {
            return {...state, maPhim : maPhim.payload};
        },
    },
    extraReducers: (builder) => {
        // get all film
        builder.addCase(danhSachPhim.pending, (state) => {
            return { ...state, isLoading: true }
        });
        builder.addCase(danhSachPhim.fulfilled, (state, action) => {
            return {
                ...state,
                isLoading: false,
                allFilm: action.payload,
                isAdd: false,
                isDel: false,
                isEdit: false,
                isUpdate: false,
            }
        });
        builder.addCase(danhSachPhim.rejected, (state, action) => {
            console.log(action);
            return { ...state, isLoading: false, messageError: action.error.message }
        });

        // search film
        builder.addCase(TimKiemPhim.pending, (state) => {
            return { ...state, isLoading: true }
        });
        builder.addCase(TimKiemPhim.fulfilled, (state, action) => {
            return { ...state, isLoading: false, allFilm: action.payload }
        });
        builder.addCase(TimKiemPhim.rejected, (state, action) => {
            console.log(action);
            return { ...state, isLoading: false, messageError: action.error.message }
        });

        // add phim
        builder.addCase(themPhim.pending, (state) => {
            return { ...state, isLoading: true };
        });
        builder.addCase(themPhim.fulfilled, (state, action) => {
            return { ...state, isLoading: false, isAdd: true };
        });
        builder.addCase(themPhim.rejected, (state, action) => {
            return { ...state, isLoading: false, messageError: action.payload};
        });

        // xóa phim
        builder.addCase(xoaPhim.pending, (state) => {
            return { ...state, isLoading: true }
        });
        builder.addCase(xoaPhim.fulfilled, (state, action) => {
            return { ...state, isLoading: false, isDel: true }
        });
        builder.addCase(xoaPhim.rejected, (state, action) => {
            return { ...state, isLoading: false, messageError: action.error.message }
        });

        // EDIT phim
        builder.addCase(layPhim.pending, (state) => {
            return { ...state, isLoading: true }
        });
        builder.addCase(layPhim.fulfilled, (state, action) => {
            return { ...state, isLoading: false, filmEdit: action.payload, isEdit: true }
        });
        builder.addCase(layPhim.rejected, (state, action) => {
            return { ...state, isLoading: false, messageError: action.error.message }
        });

        // update phim
        builder.addCase(capNhatPhim.pending, (state) => {
            return { ...state, isLoading: true }
        });
        builder.addCase(capNhatPhim.fulfilled, (state, action) => {
            return { ...state, isLoading: false, isEdit: false, isUpdate: true }
        });
        builder.addCase(capNhatPhim.rejected, (state, action) => {
            console.log(action)
            return { ...state, isLoading: false, messageError: action.payload }
        });

        // lấy lịch chiếu
        builder.addCase(layLichChieuPhim.pending, (state) => {
            return { ...state, isLoading: true }
        });
        builder.addCase(layLichChieuPhim.fulfilled, (state, action) => {
            return { ...state, isLoading: false, showtimes: action.payload, addShowtime: false}
        });
        builder.addCase(layLichChieuPhim.rejected, (state, action) => {
            console.log(action)
            return { ...state, isLoading: false, messageError: action.error.message }
        });
        // lấy HTR
        builder.addCase(layHeThongRap.pending, (state) => {
            return { ...state, isLoading: true }
        });
        builder.addCase(layHeThongRap.fulfilled, (state, action) => {
            return { ...state, isLoading: false, heThongRap: action.payload}
        });
        builder.addCase(layHeThongRap.rejected, (state, action) => {
            console.log(action)
            return { ...state, isLoading: false, messageError: action.error.message }
        });
        // lấy cụm rạp
        builder.addCase(layCumRap.pending, (state) => {
            return { ...state, isLoading: true }
        });
        builder.addCase(layCumRap.fulfilled, (state, action) => {
            return { ...state, isLoading: false, cumRap: action.payload}
        });
        builder.addCase(layCumRap.rejected, (state, action) => {
            console.log(action)
            return { ...state, isLoading: false, messageError: action.error.message }
        });
        // tạo lịch chiếu
        builder.addCase(taoLichChieu.pending, (state) => {
            return { ...state, isLoading: true }
        });
        builder.addCase(taoLichChieu.fulfilled, (state, action) => {
            console.log(action);
            return { ...state, isLoading: false, addShowtime: true}
        });
        builder.addCase(taoLichChieu.rejected, (state, action) => {
            return { ...state, isLoading: false, messageError: action.payload }
        });
    }
})

export const { setIsEdit, clearError, setMaCumRap, setMaFilm} = movieSlice.actions;
export default movieSlice.reducer;