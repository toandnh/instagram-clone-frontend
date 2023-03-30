import { createEntityAdapter } from '@reduxjs/toolkit'

import { apiSlice } from '../../features/api/apiSlice'

const commentsAdapter = createEntityAdapter({})
const initialState = commentsAdapter.getInitialState()

export const commentsApi = apiSlice.injectEndpoints({
	endpoints: (build) => ({
		getCommentsByPostId: build.query({
			query: (postId) => ({
				url: `/comments/${postId}`,
				method: 'GET',
				validateStatus: (response, result) => {
					return response.status === 200 && !result.isError
				}
			}),
			keepUnusedDataFor: 60,
			transformResponse: (responseData) => {
				const loadedComments = responseData.map((comment) => {
					comment.id = comment._id
					return comment
				})
				return commentsAdapter.setAll(initialState, loadedComments)
			},
			providesTags: (result, error, arg) => {
				if (result?.ids) {
					return [{ type: 'Comment', id: 'LIST' }, ...result.ids.map((id) => ({ type: 'Comment', id }))]
				} else {
					return [{ type: 'Comment', id: 'LIST' }]
				}
			}
		}),
		addNewComment: build.mutation({
			query: (initialCommentData) => ({
				url: '/comments',
				method: 'POST',
				body: {
					...initialCommentData
				}
			}),
			invalidatesTags: [{ type: 'Comment', id: 'LIST' }]
		}),
		updateComment: build.mutation({
			query: (initialCommentData) => ({
				url: '/comments',
				method: 'PATCH',
				body: {
					...initialCommentData
				}
			}),
			invalidatesTags: (result, error, arg) => [{ type: 'Comment', id: arg.id }]
		}),
		deleteComment: build.mutation({
			query: ({ id }) => ({
				url: '/comments',
				method: 'DELETE',
				body: { id }
			}),
			invalidatesTags: (result, error, arg) => [{ type: 'Comment', id: arg.id }]
		})
	})
})

export const {
	useGetCommentsByPostIdQuery,
	useAddNewCommentMutation,
	useUpdateCommentMutation,
	useDeleteCommentMutation
} = commentsApi
