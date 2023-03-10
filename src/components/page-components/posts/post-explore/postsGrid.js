import { useGetPostsQuery } from '../../../services/posts/postsApi'
import { useGetUsersQuery } from '../../../services/users/usersApi'

import useAuth from '../../../hooks/useAuth'

import PostPreview from './postPreview'
import SpinnerLoader from '../../spinner-loader/spinnerLoader'


const PostsGrid = () => {
    const { userId } = useAuth()

    const {
        data: posts,
        isLoading,
        isSuccess
    } = useGetPostsQuery(undefined, {
        pollingInterval: 3 * 60 * 1000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    const { user, isFetching } = useGetUsersQuery(undefined, {
        selectFromResult: ({ data, isFetching }) => ({
            user: data?.entities[userId],
            isFetching
        }),
        pollingInterval: 3 * 60 * 1000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })
    
    let content

    if (isLoading) 
        content = <SpinnerLoader />
        
    if (isSuccess) {
        const { ids } = posts
        const postsGrid = ids?.length
            ? ids.map((postId) => !user?.posts.includes(postId) && <PostPreview key={postId} postId={postId} />)
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