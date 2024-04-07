import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        _id: null,
        name: null,
        lastname: null,
        email: null,
        rol: null,
        cartId: null,
        isAdmin: null,
        status: 'checking',
        reducers: {
                onLogin: (state, {payload}) => {
                    state.status = 'authenthicated',
                    state._id= payload._id,
                    state.name= payload.name,
                    state.lastname= payload.lastname,
                    state.email= payload.email,
                    state.rol= payload.rol,
                    state.cartId= payload.cartId,
                    state.isAdmin = payload.rol ==='admin' ? true:false
                },
                onLogout: (state, {payload}) => {
                    state.status = 'non-authenthicated',
                    state._id= null,
                    state.name= null,
                    state.lastname= null,
                    state.email= null,
                    state.rol= null,
                    state.cartId= null
                },
                checkLogin: (state, {payload}) => {
                    state.status = 'checking'
                }
        },
    }
})

export const { } = authSlice.actions;