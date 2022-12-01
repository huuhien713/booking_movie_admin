import {configureStore} from '@reduxjs/toolkit'
import authSlice from './services/Slices/authSlice';
import movieSlice from './services/Slices/movieSlice';

const store = configureStore({
    reducer: {
        authSlice : authSlice,
        movieSlice : movieSlice
    },
    devTools: true
})

export default store;