import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

import { apiSlice } from './api/apiSlice'
import authReducer from './auth/authSlice'
import modalReducer from './modal/modalSlice'
import locationReducer from './location/locationSlice'

const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		auth: authReducer,
		modal: modalReducer,
		location: locationReducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware),
	devTools: true
})

setupListeners(store.dispatch)

export default store
