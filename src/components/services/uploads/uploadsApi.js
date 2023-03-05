import { apiSlice } from '../../features/api/apiSlice'


export const uploadsApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        upload: build.mutation({
            query: (initialUploadData) => ({
                url: '/uploads',
                method: 'POST',
                body: initialUploadData
            }),
            invalidatesTags: [
                {type: 'Upload', id: 'LIST'}
            ]
        })
    })
})

export const {
    useUploadMutation
} = uploadsApi