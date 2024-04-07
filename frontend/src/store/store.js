import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './authSlice'

export const store = configureStore({
    reducer:{
        auth: authSlice.reducer,
    },
    devTools:process.env.NODE_ENV !== 'production',
})