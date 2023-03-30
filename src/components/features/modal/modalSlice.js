import { createSlice } from '@reduxjs/toolkit'


const modalSlice = createSlice({
    name: 'modal',
    initialState: { 
        postOpened: false,
        createOpened: false
    },
    reducers: {
        setPostOpened: (state, action) => {
            state.postOpened = action.payload
        }
    }
})

export const { setPostOpened, setCreateOpened } = modalSlice.actions

export const postOpened = (state) => state.modal.postOpened 
export const createOpened = (state) => state.modal.createOpened 

export default modalSlice.reducer