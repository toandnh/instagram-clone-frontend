import { Link, useParams } from 'react-router-dom'

import { Button } from '@mui/material'

import { useGetUsersQuery } from '../../services/users/usersApi'

import useAuth from '../../hooks/useAuth'

import UserTab from './userTab'
import ButtonFollow from '../buttons/buttonFollow'
import SpinnerLoader from '../spinner-loader/spinnerLoader'

import setting from '../../images/setting.png'

const LINK = process.env.BASE_URL

const UserPage = () => {
	const { userId: authorizedUserId } = useAuth()
	const { userId } = useParams()

	const { user, isLoading, isSuccess } = useGetUsersQuery(undefined, {
		selectFromResult: ({ data, isLoading, isSuccess }) => ({
			user: data?.entities[userId],
			isLoading,
			isSuccess
		}),
		pollingInterval: 3 * 60 * 1000,
		refetchOnFocus: true,
		refetchOnMountOrArgChange: true
	})

	const isAuthorizedUserPage = authorizedUserId === userId

	let content

	if (isLoading) content = <SpinnerLoader />

	if (isSuccess) {
		const img_link = LINK + user.avatar
		const username = user.username
		const num_posts = user.posts?.length ? user.posts.length : 0
		const num_following = user.following?.length ? user.following.length : 0
		const num_followers = user.followers?.length ? user.followers.length : 0

		content = (
			<div className='h-full w-full flex flex-col p-8'>
				<div className='grid grid-cols-[1fr_2fr_5fr] gap-8 justify-items-center border-b border-neutral-700 px-8 pb-8'>
					<div />

					<img
						src={img_link}
						alt='avatar'
						className='max-h-[150px] aspect-square rounded-full'
					/>

					<div className='grid grid-rows-3 h-full w-full'>
						<div className='flex gap-4 items-center font-sans text-white'>
							<p>{username}</p>

							<div
								className={
									isAuthorizedUserPage
										? 'flex flex-row gap-4 items-center'
										: 'hidden'
								}
							>
								<Button
									component={Link}
									to='/edit'
									sx={{
										textTransform: 'none',
										height: '30px',
										fontSize: '14px',
										fontWeight: '600',
										color: 'black',
										backgroundColor: 'white',
										borderRadius: '5px',
										':hover': {
											backgroundColor: 'rgb(212 212 212)'
										}
									}}
								>
									Edit profile
								</Button>
								<img
									src={setting}
									alt='home'
									className='h-[25px] aspect-square'
								/>
							</div>

							<div
								className={
									!isAuthorizedUserPage
										? 'flex flex-row gap-4 items-center'
										: 'hidden'
								}
							>
								<ButtonFollow followId={userId} />
								<Button
									sx={{
										textTransform: 'none',
										height: '30px',
										fontSize: '14px',
										fontWeight: '600',
										color: 'black',
										backgroundColor: 'white',
										borderRadius: '5px',
										':hover': {
											backgroundColor: 'rgb(212 212 212)'
										}
									}}
								>
									Message
								</Button>
							</div>
						</div>

						<div className='flex gap-4 items-center font-sans text-white'>
							<p>{num_posts} posts</p>
							<p>{num_followers} followers</p>
							<p>{num_following} following</p>
						</div>

						<div></div>
					</div>
				</div>

				<div className='flex flex-col gap-2'>
					<UserTab key={userId} userId={userId} />
				</div>
			</div>
		)
	}

	return content
}

export default UserPage
