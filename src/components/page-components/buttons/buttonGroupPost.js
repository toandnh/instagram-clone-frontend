import { Button } from '@mui/material'

import { useUpdatePostMutation } from '../../services/posts/postsApi'

import like from '../../images/like.png'
import likeFilled from '../../images/like-filled.png'
import comment from '../../images/comment.png'
import share from '../../images/share.png'
import bookmark from '../../images/bookmark.png'


const ButtonsGroupPost = ({ postId, liked }) => {
    const [updatePost] = useUpdatePostMutation()

    const handleLikeClick = async () => {
        try {
            await updatePost({ id: postId, like: 'true' })
        } catch (err) {
            console.log(err.data?.message)
        }
    }

    return (
        <div className='flex flex-row pt-2'>
            <div className='grow'>
                <Button 
                    onClick={handleLikeClick}
                    sx={{ 
                        maxWidth: '25px', 
                        maxHeight: '25px', 
                        minWidth: '25px', 
                        minHeight: '25px', 
                        margin: '0.5rem 0.5rem', 
                        padding: '0' 
                    }}
                >
                    {liked ? 
                        <img src={likeFilled} alt='like' className='h-[25px] w-[25px]' /> :
                        <img src={like} alt='like' className='h-[25px] w-[25px]' />}
                </Button>

                <Button 
                    sx={{ 
                        maxWidth: '25px', 
                        maxHeight: '25px', 
                        minWidth: '25px', 
                        minHeight: '25px', 
                        margin: '0.5rem 0.5rem', 
                        padding: '0' 
                    }}
                >
                    <img src={comment} alt='comment' className='h-[25px] w-[25px]' />
                </Button>

                <Button 
                    sx={{ 
                        maxWidth: '25px', 
                        maxHeight: '25px', 
                        minWidth: '25px', 
                        minHeight: '25px', 
                        margin: '0.5rem 0.5rem', 
                        padding: '0' 
                    }}
                >
                    <img src={share} alt='share' className='h-[25px] w-[25px]' />
                </Button>
            </div>

            <Button 
                sx={{ 
                    maxWidth: '25px', 
                    maxHeight: '25px', 
                    minWidth: '25px', 
                    minHeight: '25px', 
                    margin: '0.5rem 0.5rem', 
                    padding: '0' 
                }}
            >
                <img src={bookmark} alt='bookmark' className='h-[25px] w-[25px]' />
            </Button>
        </div>
    )
}

export default ButtonsGroupPost