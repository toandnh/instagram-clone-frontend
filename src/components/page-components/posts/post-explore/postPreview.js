import { useDispatch } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

import { Button } from '@mui/material'

import { useGetPostsQuery } from '../../../services/posts/postsApi'

import { setModalOpened } from '../../../features/modal/modalSlice'

import SpinnerLoader from '../../spinner-loader/spinnerLoader'


const LINK = 'http://localhost:3500/uploads/'

const PostPreview = ({ postId }) => {
    const { post, isFetching, isLoading, isSuccess } = useGetPostsQuery(undefined, {
        selectFromResult: ({ data, isFetching, isLoading, isSuccess }) => ({
            post: data?.entities[postId],
            isFetching,
            isLoading, 
            isSuccess
        }),
        pollingInterval: 3 * 60 * 1000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    const dispatch = useDispatch()
    const location = useLocation()

    const handleOpen = () => {dispatch(setModalOpened(true))}

    let content

    if (isLoading)
        content = <SpinnerLoader />

    if (isSuccess) {
        const preview = LINK + post?.images[0]
        
        content = (
            <div className='max-h-[300px] max-w-[300px]'>
                <Button 
                    component={Link}
                    to={`/posts/${postId}`}
                    state={{ background: location }}
                    onClick={handleOpen}
                    sx={{ height: '300px', width: '300px', padding: '0' }}
                >
                    <img src={preview} alt='preview' className='h-[300px] w-[300px]' />
                </Button>
            </div>
        )
    }

    return content
}

export default PostPreview