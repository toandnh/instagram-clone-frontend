import { useParams } from 'react-router-dom'

import { useGetPostsQuery } from '../../../services/posts/postsApi'
import { useGetUsersQuery } from '../../../services/users/usersApi'

import useAuth from '../../../hooks/useAuth'

import CommentLine from '../../comments/commentLine'
import CommentsList from '../../comments/commentsList'
import CreateComment from '../../comments/createComment'

import PostImages from './postImages'
import PostHeader from '../postHeader'

import ButtonsPost from '../../buttons/buttonGroupPost'

import SpinnerLoader from '../../spinner-loader/spinnerLoader'

const LINK = process.env.REACT_APP_BASE_URL

const PostModal = () => {
	const { userId: authorizedUserId } = useAuth()
	const { postId } = useParams()

	const {
		post,
		isLoading: isPostLoading,
		isSuccess: isPostSuccess
	} = useGetPostsQuery(undefined, {
		selectFromResult: ({
			data,
			isLoading: isPostLoading,
			isSuccess: isPostSuccess
		}) => ({
			post: data?.entities[postId],
			isLoading: isPostLoading,
			isSuccess: isPostSuccess
		}),
		pollingInterval: 3 * 60 * 1000,
		refetchOnFocus: true,
		refetchOnMountOrArgChange: true
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
			user: data?.entities[post?.user],
			isLoading: isUserLoading,
			isSuccess: isUserSuccess
		}),
		pollingInterval: 3 * 60 * 1000,
		refetchOnFocus: true,
		refetchOnMountOrArgChange: true
	})

	let content

	if (isPostLoading || isUserLoading) content = <SpinnerLoader />

	if (isPostSuccess && isUserSuccess) {
		const username = user.username
		const userAvatar = LINK + user.avatar
		const userId = user._id

		const postLikes = post.likes.length
		const postDate = post.createdAt.split('T')[0]

		const isAuthorizedUserPost = authorizedUserId === userId
		const liked = post.likes.includes(authorizedUserId)

		content = (
			<div className='h-full w-full bg-black flex flex-row'>
				<div className='w-1/2 grid grid-rows-[9fr_1fr]'>
					<PostImages postId={postId} />
				</div>

				<div className='w-1/2 grid grid-rows-[1fr_8fr_2fr_1fr] border-l border-neutral-900'>
					<PostHeader
						userId={userId}
						username={username}
						userAvatar={userAvatar}
						postId={postId}
						isAuthorizedUserPost={isAuthorizedUserPost}
					/>

					<div className='flex flex-col gap-2 my-2 mx-2'>
						<CommentLine
							userId={userId}
							userAvatar={userAvatar}
							username={user.username}
							text={post.caption}
						/>

						<CommentsList key={postId} postId={postId} />
					</div>

					<div className='flex flex-col gap-2 border-y border-neutral-900 mx-2'>
						<ButtonsPost key={postId} postId={postId} liked={liked} />

						<div className='mx-3 font-sans font-semibold text-sm text-white'>
							{postLikes} likes
						</div>

						<div className='mx-3 mb-2 font-sans text-xs text-white'>
							{postDate}
						</div>
					</div>

					<CreateComment key={userId} postId={postId} userId={userId} />
				</div>
			</div>
		)
	}

	return content
}

export default PostModal
