import { useDispatch } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

import { Button } from '@mui/material'

import { useGetPostsQuery } from '../../../services/posts/postsApi'
import { useGetUsersQuery } from '../../../services/users/usersApi'

import useAuth from '../../../hooks/useAuth'

import { setModalOpened } from '../../../features/modal/modalSlice'

import PostHeader from '../postHeader'
import PostImages from '../post-explore/postImages'
import ButtonsPost from '../../buttons/buttonGroupPost'
import CreateComment from '../../comments/createComment'
import SpinnerLoader from '../../spinner-loader/spinnerLoader'


const LINK = 'http://localhost:3500/'

const Post = ({ postId }) => {
    const { userId: authorizedUserId } = useAuth()
    
    const { 
        post, 
        isLoading: isPostLoading,
        isSuccess: isPostSuccess
    } = useGetPostsQuery(undefined, {
        selectFromResult: ({ 
            data, 
            isLoading: isPostLoading,
            isSuccess: isPostSuccess
        }) => ({
            post: data?.entities[postId],
            isLoading: isPostLoading,
            isSuccess: isPostSuccess
        }),
        pollingInterval: 3 * 60 * 1000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    const { 
        user, 
        isLoading: isUserLoading,
        isSuccess: isUserSuccess
    } = useGetUsersQuery(undefined, {
        selectFromResult: ({ 
            data, 
            isLoading: isUserLoading,
            isSuccess: isUserSuccess
        }) => ({
            user: data?.entities[post.user],
            isLoading: isUserLoading,
            isSuccess: isUserSuccess
        }),
        pollingInterval: 3 * 60 * 1000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    const dispatch = useDispatch()
    const location = useLocation()

    const handleOpen = () => {dispatch(setModalOpened(true))}

    let content
    
    if (isPostLoading || isUserLoading)
        content = <SpinnerLoader />

    if (isPostSuccess && isUserSuccess) {
        const username = user.username
        const userAvatar = LINK + user.avatar
        const userId = user._id

        const postCaption = post.caption
        const postLikes = post.likes.length
        const postDate = post.createdAt.split('T')[0]
        const liked = post.likes.includes(authorizedUserId)

        content = (
            <div className='h-[93%] bg-black grid grid-rows-[1fr_10fr_2fr_1fr] rounded-lg'>
                <PostHeader userId={userId} username={username} userAvatar={userAvatar} />
                
                <div className='max-h-full h-auto w-auto flex flex-col justify-center items-center grow overflow-hidden'>
                    <PostImages postId={postId} />
                </div>

                <div className='flex flex-col gap-1 border-y border-neutral-900 mx-2 pb-2'>
                    <ButtonsPost key={postId} postId={postId} liked={liked} />

                    <div className='mx-3 font-sans font-semibold text-sm text-white'>{postLikes} likes</div>

                    <div className='mx-3 font-sans font-semibold text-sm text-white'>
                        {username} 
                        <div className='font-medium'>{postCaption}</div>
                    </div>

                    <Button
                        component={Link}
                        to={`/posts/${postId}`}
                        state={{ background: location }}
                        onClick={handleOpen}
                        sx={{  
                            display: 'flex', 
                            justifyContent: 'start', 
                            textTransform: 'none', 
                            color: 'rgb(115 115 115)', 
                            fontSize: '14px',
                            margin: '0 12px',
                            padding: '0',
                            ':hover': {
                                backgroundColor: 'inherit'
                            }
                        }}
                    >
                        View comments
                    </Button>

                    <div className='mx-3 font-sans text-xs text-white'>{postDate}</div>
                </div>

                <CreateComment key={userId} postId={postId} userId={userId} />
            </div>
        )
    }

    return content
}

export default Post