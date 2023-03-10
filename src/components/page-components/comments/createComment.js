import { useRef, useState } from 'react'

import { useAddNewCommentMutation } from '../../services/comments/commentsApi'
import { useUpdatePostMutation } from '../../services/posts/postsApi'


const CreateComment = ({ postId, userId }) => {
    const [addNewComment] = useAddNewCommentMutation()
    
    const [updatePost, {
        isLoading,
        isSuccess
    }] = useUpdatePostMutation()

    const textRef = useRef()
    const errRef = useRef()

    const [text, setText] = useState('')
    const [errMessage, setErrMessage] = useState('')

    const handleTextInput = (e) => {setText(e.target.value)}

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { commentId } = await addNewComment({ user: userId, text }).unwrap()
            await updatePost({ id: postId, user: userId, comment: commentId })
            setText('')
        } catch (err) {
            if (!err.status) {
                setErrMessage('Server not responding!')
            } else if (err.status === 400) {
                setErrMessage('Missing data!')
            } else if (err.status === 401) {
                setErrMessage('Unauthorized!')
            } else {
                setErrMessage(err.data?.message)
            }
            //errRef.current.focus()
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