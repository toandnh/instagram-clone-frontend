import { useGetCommentsByPostIdQuery } from '../../../services/comments/commentsApi'
import { useGetUsersQuery } from '../../../services/users/usersApi'

import CommentLine from './commentLine'
import SpinnerLoader from '../../spinner-loader/spinnerLoader'


const Comment = ({ postId, commentId }) => {
    const { 
        comment, 
        isLoading: isCommentLoading, 
        isSuccess: isCommentSuccess 
    } = useGetCommentsByPostIdQuery(postId, {
        selectFromResult: ({ 
            data, 
            isLoading: isCommentLoading, 
            isSuccess: isCommentSuccess 
        }) => ({
            comment: data?.entities[commentId],
            isLoading: isCommentLoading, 
            isSuccess: isCommentSuccess
        })
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
            user: data?.entities[comment.user],
            isLoading: isUserLoading, 
            isSuccess: isUserSuccess
        })
    })

    let content

    if (isCommentLoading || isUserLoading)
        content = <SpinnerLoader />

    if (isCommentSuccess && isUserSuccess) {
        const userId = user._id
        const userAvatar = 'http://localhost:3500' + user.avatar
        const username = user.username
        const text = comment.text

        content = (
            <CommentLine userId={userId} userAvatar={userAvatar} username={username} text={text} />
        )
    }

    return content
}

export default Comment