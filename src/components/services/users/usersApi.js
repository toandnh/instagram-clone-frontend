import { createEntityAdapter } from '@reduxjs/toolkit'

import { apiSlice } from '../../features/api/apiSlice'


const usersAdapter = createEntityAdapter({})
const initialState = usersAdapter.getInitialState()

export const usersApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getUsers: build.query({
            query: () => ({
                url: '/users',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                }
            }), 
            keepUnusedDataFor: 60,
            transformResponse: (responseData) => {
                const loadedUsers = responseData.map((user) => {
                    user.id = user._id
                    return user
                })
                return usersAdapter.setAll(initialState, loadedUsers)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'User', id: 'LIST' },
                        ...result.ids.map((id) => ({ type: 'User', id }))
                    ]
                } else {
                    return [{ type: 'User', id: 'LIST' }]
                }
            }
        }),
        addNewUser: build.mutation({
            query: (initialUserData) => ({
                url: '/users',
                method: 'POST',
                body: {
                    ...initialUserData
                }
            }),
            invalidatesTags: [
                {type: 'User', id: 'LIST'}
            ]
        }),
        updateUser: build.mutation({
            query: (initialUserData) => ({
                url: '/users',
                method: 'PATCH',
                body: {
                    ...initialUserData
                }
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'User', id: arg.id}
            ]
        }),
        updateFollow: build.mutation({
            query: (id) => ({
                url: `/users/${id}`,
                method: 'PATCH'
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'User', id: arg.id}
            ]
        }),
        deleteUser: build.mutation({
            query: ({ id }) => ({
                url: '/users',
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'User', id: arg.id}
            ]
        })
    })
})

export const { 
    useGetUsersQuery, 
    useAddNewUserMutation,
    useUpdateUserMutation,
    useUpdateFollowMutation,
    useDeleteUserMutation
} = usersApi