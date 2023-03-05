import { Link } from 'react-router-dom'

import { Button } from '@mui/material'

import ButtonFollow from '../buttons/buttonFollow'
import ButtonSettingPost from '../buttons/buttonSettingPost'


const PostHeader = ({ userId, username, userAvatar, postId, isAuthorizedUserPost }) => {
    return (
        <div className='flex flex-row items-center border-b border-neutral-900 px-2 py-1'>
            <Button 
                component={Link}
                to={`/profile/${userId}`}
                sx={{ 
                    maxWidth: '30px', 
                    maxHeight: '30px', 
                    minWidth: '30px', 
                    minHeight: '30px', 
                    margin: '0 0.5rem', 
                    padding: '0' 
                }}
            >
                <img src={userAvatar} alt='avatar' className='h-[30px] w-[30px] rounded-full' />
            </Button>

            <div className='grow flex flex-row'>
                <Button 
                    component={Link}
                    to={`/profile/${userId}`}
                    sx={{  
                        height: '100%',
                        display: 'flex', 
                        justifyContent: 'start', 
                        textTransform: 'none', 
                        color: 'white', 
                        fontSize: '14px', 
                        fontWeight: '700',
                        margin: '0'
                    }}
                >
                    {username}
                </Button>

                <div className={isAuthorizedUserPost ? 'hidden' : 'flex flex-row items-center gap-2 text-white'}>
                    &bull;
                    <ButtonFollow followId={userId}/>
                </div>
            </div>

            <ButtonSettingPost postId={postId} isAuthorizedUserPost={isAuthorizedUserPost} />
        </div>
    )
}

export default PostHeader