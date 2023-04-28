import { Button } from '@mui/material'

import { useGetUsersQuery } from '../../services/users/usersApi'
import { useUpdateFollowMutation } from '../../services/users/usersApi'

import useAuth from '../../hooks/useAuth'

const ButtonFollow = ({ followId }) => {
	const { userId } = useAuth()

	const { user } = useGetUsersQuery(undefined, {
		selectFromResult: ({ data, isFetching }) => ({
			user: data?.entities[userId],
			isFetching
		}),
		pollingInterval: 3 * 60 * 1000,
		refetchOnFocus: true,
		refetchOnMountOrArgChange: true
	})

	const [updateFollow] = useUpdateFollowMutation()

	const handleOnclick = async (e) => {
		e.preventDefault()
		try {
			await updateFollow(followId)
		} catch (err) {
			console.log(err)
		}
	}

	const isFollowing = user.following.includes(followId)

	return (
		<Button
			onClick={handleOnclick}
			sx={{
				textTransform: 'none',
				height: '30px',
				fontSize: '14px',
				fontWeight: '600',
				color: 'white',
				backgroundColor: 'rgb(14 165 233)',
				borderRadius: '5px',
				':hover': {
					backgroundColor: 'rgb(2 132 199)'
				}
			}}
		>
			{isFollowing ? 'Unfollow' : 'Follow'}
		</Button>
	)
}

export default ButtonFollow
