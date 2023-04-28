import { useGetPostsQuery } from '../../../services/posts/postsApi'
import { useGetUsersQuery } from '../../../services/users/usersApi'

import useAuth from '../../../hooks/useAuth'

import PostPreview from './postPreview'
import SpinnerLoader from '../../spinner-loader/spinnerLoader'

const MIN_WIDTH = 900

const PostsGrid = ({ width }) => {
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

	const trueWidth = width <= MIN_WIDTH + 128 ? MIN_WIDTH + 128 : width //128 is margin.

	const gapSize = Math.floor(trueWidth / (window.screen.availWidth / 8)) //8 is the maximum gap (gap-8).
	const postSize = Math.floor(trueWidth / 3 - gapSize * 3 * 4) //3 posts per row with spaces for gap.

	let content

	if (isLoading || isFetching) content = <SpinnerLoader />

	if (isSuccess && !isFetching) {
		const { ids } = posts
		const postsGrid = ids?.length
			? ids.map(
					(postId) =>
						!user?.posts.includes(postId) && (
							<PostPreview key={postId} postId={postId} postSize={postSize} />
						)
			  )
			: null

		content = (
			<div
				className={`min-w-[${MIN_WIDTH}px] flex flex-row gap-${gapSize} flex-wrap my-4 mx-16`}
			>
				{postsGrid}
			</div>
		)
	}

	return content
}

export default PostsGrid
