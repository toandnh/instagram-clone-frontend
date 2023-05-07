import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { setCredentials, setExpiredStatus } from '../auth/authSlice'

const baseQuery = fetchBaseQuery({
	baseUrl: process.env.REACT_APP_BASE_URL,
	credentials: 'include',
	prepareHeaders: (headers, { getState }) => {
		const token = getState().auth.token
		if (token) headers.set('authorization', `Bearer ${token}`)
		return headers
	}
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
	let result = await baseQuery(args, api, extraOptions)

	if (result?.error?.status === 401 || result?.error?.status === 403) {
		console.log('Sending request token...')

		//Send refresh token to get new access token.
		const refreshResult = await baseQuery('auth/refresh', api, extraOptions)

		if (refreshResult?.data) {
			//Store the new token.
			api.dispatch(setCredentials({ ...refreshResult.data }))

			//Retry the original query with new access token.
			result = await baseQuery(args, api, extraOptions)
		} else {
			api.dispatch(setExpiredStatus(true))
		}
	}

	return result
}

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: baseQueryWithReauth,
	tagTypes: ['User', 'Post', 'Comment'],
	endpoints: () => ({})
})
