import { createSlice } from '@reduxjs/toolkit'


const modalSlice = createSlice({
    name: 'modal',
    initialState: { 
        opened: false
    },
    reducers: {
        setModalOpened: (state, action) => {
            state.opened = action.payload
        }
    }
})

export const { setModalOpened } = modalSlice.actions

export const modalOpened = (state) => state.modal.opened 

export default modalSlice.reducer