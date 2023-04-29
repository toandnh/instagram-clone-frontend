import { apiSlice } from '../../features/api/apiSlice'
import {
	setCredentials,
	setTokenNull,
	setExpiredStatus
} from '../../features/auth/authSlice'

export const authApi = apiSlice.injectEndpoints({
	endpoints: (build) => ({
		login: build.mutation({
			query: (credentials) => ({
				url: '/auth',
				method: 'POST',
				body: {
					...credentials
				}
			})
		}),
		logout: build.mutation({
			query: () => ({
				url: '/auth/logout',
				method: 'POST'
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled
					dispatch(setTokenNull())
					dispatch(setExpiredStatus(false))
					dispatch(apiSlice.util.resetApiState())
				} catch (err) {
					console.log(err)
				}
			}
		}),
		refresh: build.mutation({
			query: () => ({
				url: '/auth/refresh',
				method: 'GET'
			}),
			async onQueryStarted(navigate, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled
					const { accessToken } = data
					dispatch(setCredentials({ accessToken }))
				} catch (err) {
					navigate('/login')
					console.log(err)
				}
			}
		})
	})
})

export const { useLoginMutation, useLogoutMutation, useRefreshMutation } =
	authApi
