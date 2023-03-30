import { createSlice } from '@reduxjs/toolkit'

const locationSlice = createSlice({
	name: 'location',
	initialState: {
		changed: false
	},
	reducers: {
		setLocationChanged: (state, action) => {
			state.changed = action.payload
		}
	}
})

export const { setLocationChanged } = locationSlice.actions

export const locationChanged = (state) => state.location.changed

export default locationSlice.reducer
