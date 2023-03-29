import { useRef, useState } from 'react'

import { useAddNewCommentMutation } from '../../services/comments/commentsApi'
import { useUpdatePostMutation } from '../../services/posts/postsApi'


const CreateComment = ({ postId, userId }) => {
    const [addNewComment] = useAddNewCommentMutation()
    
    const [updatePost] = useUpdatePostMutation()

    const textRef = useRef()

    const [text, setText] = useState('')

    const handleTextInput = (e) => {setText(e.target.value)}

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { commentId } = await addNewComment({ user: userId, text }).unwrap()
            await updatePost({ id: postId, user: userId, comment: commentId })
            setText('')
        } catch (err) {
            console.log(err.data?.message)
        }
    }

    return (
        <form className='flex flex-row font-sans text-base' onSubmit={handleSubmit}>
            <input type='button' value='smiley' />
            <input 
                type='text' 
                className='grow-[6] bg-black text-white focus:outline-none' 
                ref={textRef}
                value={text}
                onChange={handleTextInput}
                autoComplete='off'
                placeholder='Add a comment...' 
            />
            <input 
                type='submit' 
                className='grow font-semibold text-sky-600 pr-2 enabled:cursor-pointer enabled:hover:text-white disabled:opacity-75' 
                disabled={!text}
                value='Post' 
            />
        </form>
    )
}

export default CreateComment 