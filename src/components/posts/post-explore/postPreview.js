import { useDispatch } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

import { Button } from '@mui/material'

import { useGetPostsQuery } from '../../../services/posts/postsApi'

import { setPostOpened } from '../../../features/modal/modalSlice'

const LINK = process.env.BASE_URL + 'uploads/'

const PostPreview = ({ postId, postSize }) => {
	const { post, isFetching, isSuccess } = useGetPostsQuery(undefined, {
		selectFromResult: ({ data, isFetching, isLoading, isSuccess }) => ({
			post: data?.entities[postId],
			isFetching,
			isLoading,
			isSuccess
		}),
		pollingInterval: 3 * 60 * 1000,
		refetchOnFocus: true,
		refetchOnMountOrArgChange: true
	})

	const dispatch = useDispatch()
	const location = useLocation()

	const handleOpen = () => {
		dispatch(setPostOpened(true))
	}

	let content

	if (isSuccess && !isFetching) {
		const preview = LINK + post?.images[0]

		content = (
			<>
				<Button
					component={Link}
					to={`/posts/${postId}`}
					state={{ background: location }}
					onClick={handleOpen}
					sx={{
						height: `${postSize}px`,
						minHeight: '300px',
						aspectRatio: '1 / 1',
						padding: '0'
					}}
				>
					<img
						src={preview}
						alt='preview'
						className={`h-[${postSize}px] aspect-square`}
					/>
				</Button>
			</>
		)
	}

	return content
}

export default PostPreview
