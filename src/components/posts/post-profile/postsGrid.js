import { useGetPostsByUserIdQuery } from '../../../services/posts/postsApi'

import PostPreview from '../post-explore/postPreview'
import SpinnerLoader from '../../spinner-loader/spinnerLoader'

const MIN_WIDTH = 900

const PostsGrid = ({ userId, width }) => {
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

	const trueWidth = width <= MIN_WIDTH + 128 ? MIN_WIDTH + 128 : width //128 is margin.

	const gapSize = Math.floor(trueWidth / (window.screen.availWidth / 8)) //8 is the maximum gap (gap-8).
	const postSize = Math.floor(trueWidth / 3 - gapSize * 3 * 4) //3 posts per row with spaces for gap.

	let content

	if (isLoading || isFetching) content = <SpinnerLoader />

	if (isSuccess && !isFetching) {
		const { ids } = posts
		const postsGrid = ids?.length
			? ids.map((_, index) => (
					<PostPreview
						key={ids[ids.length - 1 - index]}
						postId={ids[ids.length - 1 - index]}
						postSize={postSize}
					/>
			  ))
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
