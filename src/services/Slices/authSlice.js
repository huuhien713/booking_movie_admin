import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "../authApi";

const initialState = {
    user: JSON.parse(localStorage.getItem('userQuanTri')) || null,

    isLoading: false,
    messageError: null,

    userList: [],
    userPage: [],
    userEdit: null,

    isAdd: false,
    isDel: false,
    isEdit: false,
    isUpdate: false
}


export const dangNhap = createAsyncThunk(
    'auth/signin',
    async (values) => {
        try {
            const { data } = await authApi.signIn(values);
            return data.content;
        } catch (error) {
            throw (error)
        }
    }
)

export const danhSachNguoiDung = createAsyncThunk(
    'auth/getUser',
    async () => {
        try {
            const { data } = await authApi.getUserList();
            return data.content;
        } catch (error) {
            throw (error)
        }
    }
)

export const TimKiem = createAsyncThunk(
    'auth/search',
    async (search) => {
        try {
            const { data } = await authApi.searchUser(search);
            return data.content;
        } catch (error) {
            throw (error)
        }
    }
)


export const themNguoiDung = createAsyncThunk(
    'auth/addUser',
    async (user, {rejectWithValue}) => {
        const data = await authApi.addUser(user)
        .then((res) => {
            return rejectWithValue(res.response.data.content);
        })
        .catch(error => {
            console.log(error);
        })
        return data;
    }
)

export const xoaNguoiDung = createAsyncThunk(
    'auth/deleteUser',
    async (taikhoan, {rejectWithValue}) => {
        const data = await authApi.deleteUser(taikhoan)
        .then((res) => {
            return rejectWithValue(res.response.data.content);
        })
        .catch(error => {
            console.log(error);
        })
        return data;
    }
)

export const layNguoiDung = createAsyncThunk(
    'auth/editUser',
    async (user) => {
        try {
            const { data } = await authApi.editUser(user);
            return data.content;
        } catch (error) {
            throw (error)
        }
    }
)

export const capNhatNguoiDung = createAsyncThunk(
    'auth/updateUser',
    async (user, {rejectWithValue}) => {
        const data = await authApi.updateUser(user)
        .then((res) => {
            console.log(res)
            return rejectWithValue(res.response.data.content);
        })
        .catch(error => {
            console.log(error);
        })
        return data;
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsEdit: (state) => {
            return { ...state, isEdit: false };
        },
        clearError: (state) => {
            return {...state, messageError: null};
        }, 
        logout : (state) => {
            return {...state, user : null};
        }
    },
    extraReducers: (builder) => {
        // dang nhap
        builder.addCase(dangNhap.pending, (state) => {
            return { ...state, isLoading: true };
        });
        builder.addCase(dangNhap.fulfilled, (state, action) => {
            if (action.payload.maLoaiNguoiDung === 'QuanTri') {
                localStorage.setItem('userQuanTri', JSON.stringify(action.payload));
                return { ...state, user: action.payload, isLoading: false }
            } else {
                return { ...state, user: null }
            }
        });
        builder.addCase(dangNhap.rejected, (state, action) => {
            return { ...state, isLoading: false, messageError: action.error.message };
        });

        // danh sach nguoi dung
        builder.addCase(danhSachNguoiDung.pending, (state) => {
            return { ...state, isLoading: true };
        });
        builder.addCase(danhSachNguoiDung.fulfilled, (state, action) => {
            return {
                ...state,
                isLoading: false,
                userList: action.payload,
                isAdd: false,
                isDel: false,
                isEdit: false,
                isUpdate: false
            };
        });
        builder.addCase(danhSachNguoiDung.rejected, (state, action) => {
            return { ...state, isLoading: false, messageError: action.error.message };
        });

        // tim kiem
        builder.addCase(TimKiem.pending, (state) => {
            return { ...state, isLoading: true };
        });
        builder.addCase(TimKiem.fulfilled, (state, action) => {
            return {...state, isLoading: false, userList: action.payload};
        });
        builder.addCase(TimKiem.rejected, (state, action) => {
            return { ...state, isLoading: false, messageError: action.error.message };
        });

        //add
        builder.addCase(themNguoiDung.fulfilled, (state, action) => {
            return { ...state, isLoading: false, isAdd: true };
        });
        builder.addCase(themNguoiDung.rejected, (state, action) => {
            return { ...state, isLoading: false, messageError: action.payload };
        });

        //delete
        builder.addCase(xoaNguoiDung.fulfilled, (state, action) => {
            return { ...state, isLoading: false, isDel: true };
        });
        builder.addCase(xoaNguoiDung.rejected, (state, action) => {
            return { ...state, isLoading: false, messageError: action.payload };
        });

        //edit
        builder.addCase(layNguoiDung.fulfilled, (state, action) => {
            return { ...state, isLoading: false, userEdit: action.payload, isEdit: true };
        });
        builder.addCase(layNguoiDung.rejected, (state, action) => {
            return { ...state, isLoading: false, messageError: action.error.message };
        });

        //update
        builder.addCase(capNhatNguoiDung.fulfilled, (state, action) => {
            return { ...state, isLoading: false, isUpdate: true, isEdit: false };
        });
        builder.addCase(capNhatNguoiDung.rejected, (state, action) => {
            return { ...state, isLoading: false, isEdit: false, messageError: action.payload };
        });

    }
})

export const { setIsEdit, clearError, logout } = authSlice.actions;
export default authSlice.reducer;