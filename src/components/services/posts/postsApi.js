import { createEntityAdapter } from '@reduxjs/toolkit'

import { apiSlice } from '../../features/api/apiSlice'

const postsAdapter = createEntityAdapter({})
const initialState = postsAdapter.getInitialState()

export const postsApi = apiSlice.injectEndpoints({
	endpoints: (build) => ({
		getPosts: build.query({
			query: () => ({
				url: '/posts',
				validateStatus: (response, result) => {
					return response.status === 200 && !result.isError
				}
			}),
			keepUnusedDataFor: 60,
			transformResponse: (responseData) => {
				const loadedPosts = responseData.map((post) => {
					post.id = post._id
					return post
				})
				return postsAdapter.setAll(initialState, loadedPosts)
			},
			providesTags: (result, error, arg) => {
				if (result?.ids) {
					return [{ type: 'Post', id: 'LIST' }, ...result.ids.map((id) => ({ type: 'Post', id }))]
				} else {
					return [{ type: 'Post', id: 'LIST' }]
				}
			}
		}),
		getPostsByUserId: build.query({
			query: (userId) => ({
				url: `/posts/${userId}`,
				method: 'GET',
				validateStatus: (response, result) => {
					return response.status === 200 && !result.isError
				}
			}),
			keepUnusedDataFor: 60,
			transformResponse: (responseData) => {
				const loadedPosts = responseData.map((post) => {
					post.id = post._id
					return post
				})
				return postsAdapter.setAll(initialState, loadedPosts)
			},
			providesTags: (result, error, arg) => {
				if (result?.ids) {
					return [{ type: 'Post', id: 'LIST' }, ...result.ids.map((id) => ({ type: 'Post', id }))]
				} else {
					return [{ type: 'Post', id: 'LIST' }]
				}
			}
		}),
		addNewPost: build.mutation({
			query: (initialPostData) => ({
				url: '/posts',
				method: 'POST',
				body: {
					...initialPostData
				}
			}),
			invalidatesTags: [{ type: 'Post', id: 'LIST' }]
		}),
		updatePost: build.mutation({
			query: (initialPostData) => ({
				url: '/posts',
				method: 'PATCH',
				body: {
					...initialPostData
				}
			}),
			invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg.id }]
		}),
		deletePost: build.mutation({
			query: ({ id }) => ({
				url: '/posts',
				method: 'DELETE',
				body: { id }
			}),
			invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg.id }]
		})
	})
})

export const {
	useGetPostsQuery,
	useGetPostsByUserIdQuery,
	useAddNewPostMutation,
	useUpdatePostMutation,
	useDeletePostMutation
} = postsApi
