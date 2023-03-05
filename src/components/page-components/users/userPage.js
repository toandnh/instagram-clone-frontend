import { useParams } from 'react-router-dom'

import { Button } from '@mui/material'

import { useGetUsersQuery } from '../../services/users/usersApi'

import useAuth from '../../hooks/useAuth'

import UserTab from './userTab'
import ButtonFollow from '../buttons/buttonFollow'
import SpinnerLoader from '../spinner-loader/spinnerLoader'

import setting from '../../images/setting.png'


const LINK = 'http://localhost:3500/'

const UserPage = () => {
    const { userId: authorizedUserId } = useAuth()
    const { userId } = useParams()
    
    const { user, isLoading, isSuccess } = useGetUsersQuery(undefined, {
        selectFromResult: ({ data, isLoading, isSuccess }) => ({
            user: data?.entities[userId],
            isLoading, 
            isSuccess
        }),
        pollingInterval: 3 * 60 * 1000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    const isAuthorizedUserPage = authorizedUserId === userId

    let content

    if (isLoading)
        content = <SpinnerLoader />

    if (isSuccess) {
        const img_link = LINK + user.avatar
        const username = user.username
        const num_posts = user.posts?.length ? user.posts.length : 0
        const num_following = user.following?.length ? user.following.length : 0
        const num_followers = user.followers?.length ? user.followers.length : 0

        content = (
            <div className='h-full w-full grid grid-rows-[200px_2fr] p-5'>
                <div className='grid grid-cols-[1fr_2fr_5fr] justify-items-center border-b border-neutral-700'>
                    <div />

                    <img src={img_link} alt='avatar' className='h-[150px] w-[150px] rounded-full' />

                    <div className='grid grid-rows-3 h-full w-full'>
                        <div className='flex gap-4 items-center font-sans text-white'>
                            <p>{username}</p>

                            <div className={isAuthorizedUserPage ? 'flex flex-row gap-4 items-center' : 'hidden'}>
                                <input 
                                    type='submit' 
                                    className='h-8 w-28 bg-white text-black my-2.5 rounded cursor-pointer hover:bg-slate-100' 
                                    value='Edit profile' 
                                />
                                <img src={setting} alt='home' className='h-[25px] w-[25px]' />
                            </div>

                            <div className={!isAuthorizedUserPage ? 'flex flex-row gap-4 items-center' : 'hidden'}>
                                <ButtonFollow followId={userId} />
                                <Button
                                    sx={{ 
                                        textTransform: 'none', 
                                        height: '30px',
                                        fontSize: '14px', 
                                        fontWeight: '600',
                                        color: 'black',
                                        backgroundColor: 'white',
                                        borderRadius: '5px',
                                        ':hover': {
                                            backgroundColor: 'rgb(212 212 212)'
                                        }
                                    }}
                                >
                                    Message
                                </Button>
                            </div>
                        </div>

                        <div className='flex gap-4 items-center font-sans text-white'>
                            <p>{num_posts} posts</p>
                            <p>{num_followers} followers</p>
                            <p>{num_following} following</p>
                        </div>

                        <div></div>
                    </div>
                </div>
                
                <div className='flex flex-col gap-2'>
                    <UserTab key={userId} userId={userId} />
                </div>
            </div>
        )
    }

    return content
}

export default UserPage