import { useGetCommentsByPostIdQuery } from '../../../services/comments/commentsApi'

import Comment from './comment'
import SpinnerLoader from '../../spinner-loader/spinnerLoader'


const CommentsList = ({ postId }) => {
    const {
        data: comments,
        isLoading,
        isSuccess
    } = useGetCommentsByPostIdQuery(postId, {
        pollingInterval: 1 * 60 * 1000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) 
        content = <SpinnerLoader />

    if (isSuccess) {
        const { ids } = comments
        const commentsList = ids?.length
            ? ids.map((commentId) => <Comment key={commentId} postId={postId} commentId={commentId} />)
            : null

        content = (
            <div className='bg-black h-full flex flex-col gap-2'>
                {commentsList}
            </div>
        )
    }

    return content
}

export default CommentsList