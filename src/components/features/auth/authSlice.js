import { createSlice } from '@reduxjs/toolkit'


const authSlice = createSlice({
    name: 'auth',
    initialState: { 
        token: null, 
        expired: false
    },
    reducers: {
        setCredentials: (state, action) => {
            const { accessToken } = action.payload
            state.token = accessToken
        },
        setTokenNull: (state) => {
            state.token = null 
        },
        setExpiredStatus: (state, action) => {
            state.expired = action.payload
        }
    }
})

export const { 
    setCredentials, 
    setTokenNull, 
    setExpiredStatus
} = authSlice.actions

export const currentToken = (state) => state.auth.token
export const expiredStatus = (state) => state.auth.expired
export const refreshedStatus = (state) => state.auth.refreshed

export default authSlice.reducer
