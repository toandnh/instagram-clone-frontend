import { useGetPostsQuery } from '../../../services/posts/postsApi'
import { useGetUsersQuery } from '../../../services/users/usersApi'

import useAuth from '../../../hooks/useAuth'

import Post from './post'

import SpinnerLoader from '../../spinner-loader/spinnerLoader'

const PostsList = () => {
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

	if (isLoading || isFetching) content = <SpinnerLoader />

	if (isSuccess) {
		const { ids } = posts
		const postsList = ids?.length
			? ids.map(
					(postId) =>
						!user?.posts.includes(postId) &&
						user?.following.includes(posts.entities[postId].user) && (
							<Post key={postId} postId={postId} />
						)
			  )
			: null
		content = (
			<div className='max-w-[800px] h-screen aspect-[3/5] flex flex-col gap-3 my-8 mx-16'>
				{postsList}
			</div>
		)
	}

	return content
}

export default PostsList
