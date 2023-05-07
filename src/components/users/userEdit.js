import { useState } from 'react'

import {
	Button,
	Modal,
	ListItem,
	ListItemButton,
	ListItemText
} from '@mui/material'

import useAuth from '../../hooks/useAuth'

import { useGetUsersQuery } from '../../services/users/usersApi'

import UserAvatarChange from './userAvatarChange'
import UserEditForm from './userEditForm'
import SpinnerLoader from '../spinner-loader/spinnerLoader'

const LINK = process.env.BASE_URL

const UserEdit = () => {
	const { userId } = useAuth()

	const [postOpened, setPostOpened] = useState(false)

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

	const handleModalOpen = () => {
		setPostOpened(true)
	}
	const handleModalClose = () => {
		setPostOpened(false)
	}

	let content

	if (isLoading) content = <SpinnerLoader />

	if (isSuccess) {
		const img_link = LINK + user.avatar

		return (
			<div className='bg-neutral-900 h-screen flex flex-col justify-center font-sans text-white p-8 overflow-y-scroll'>
				<p className='font-semibold text-2xl'>Settings</p>
				<div className='bg-black h-full w-full flex flex-col border border-neutral-700 my-8'>
					<p className='text-2xl p-8'>Edit Profile</p>
					<div className='h-full w-full flex flex-col justify-start gap-4 px-36'>
						<div className='flex justify-start gap-8 mt-8'>
							<img
								src={img_link}
								alt='avatar'
								className='h-[45px] aspect-square rounded-full'
							/>

							<div className='flex flex-col'>
								<div>{user.username}</div>
								<Button
									onClick={handleModalOpen}
									sx={{
										display: 'flex',
										justifyContent: 'start',
										textTransform: 'none',
										color: 'rgb(2 132 199)',
										fontSize: '14px',
										fontWeight: 500,
										margin: 0,
										padding: 0
									}}
								>
									Change profile photo
								</Button>
								<Modal
									sx={{
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center'
									}}
									open={postOpened}
									onClose={handleModalClose}
								>
									<div className='h-1/3 w-1/3 flex flex-col bg-neutral-800 rounded-xl'>
										<UserAvatarChange />
										<ListItem disablePadding>
											<ListItemButton
												disableGutters
												onClick={handleModalClose}
												sx={{
													paddingTop: 0,
													':hover': {
														backgroundColor: 'inherit'
													}
												}}
											>
												<ListItemText
													primary='Cancel'
													sx={{
														display: 'flex',
														justifyContent: 'center',
														color: 'white'
													}}
												/>
											</ListItemButton>
										</ListItem>
									</div>
								</Modal>
							</div>
						</div>

						<UserEditForm user={user} />
					</div>
				</div>
			</div>
		)
	}

	return content
}

export default UserEdit
