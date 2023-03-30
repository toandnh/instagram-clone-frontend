import { useGetUsersQuery } from '../../services/users/usersApi'

import useAuth from '../../hooks/useAuth'

import User from './user'
import SpinnerLoader from '../spinner-loader/spinnerLoader'

const UsersList = () => {
	const { userId: currentUserId } = useAuth()

	const {
		data: users,
		isLoading,
		isSuccess
	} = useGetUsersQuery(undefined, {
		pollingInterval: 3 * 60 * 1000,
		refetchOnFocus: true,
		refetchOnMountOrArgChange: true
	})

	let content

	if (isLoading) content = <SpinnerLoader />

	if (isSuccess) {
		const { ids } = users
		const currentUser = users.entities[currentUserId]
		const usersList = ids?.length
			? ids.map(
					(userId) =>
						currentUser.id !== userId &&
						!currentUser.following.includes(userId) && <User key={userId} userId={userId} />
			  )
			: null

		content = <div className='bg-black h-full flex flex-col'>{usersList}</div>
	}

	return content
}

export default UsersList
