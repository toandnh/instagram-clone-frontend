import { useGetPostsByUserIdQuery } from '../../../services/posts/postsApi'

import PostPreview from '../post-explore/postPreview'
import SpinnerLoader from '../../spinner-loader/spinnerLoader'


const PostsGrid = ({ userId }) => {
    const {
        data: posts,
        isFetching,
        isLoading,
        isSuccess
    } = useGetPostsByUserIdQuery(userId, {
        pollingInterval: 3 * 60 * 1000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading || isFetching) 
        content = <SpinnerLoader />
        
    if (isSuccess && !isFetching) {
        const { ids } = posts
        const postsGrid = ids?.length
            ? ids.map((_, index) => <PostPreview key={ids[ids.length - 1 - index]} postId={ids[ids.length - 1 - index]} />)
            : null

        content = (
            <div className='flex flex-row gap-8 flex-wrap'>
                {postsGrid}
            </div>
        )
    }

    return content
}

export default PostsGrid