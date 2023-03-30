import UsersList from '../../users/usersList'

const Suggestions = () => {
	return (
		<div className='h-screen aspect-[3/5] mx-16'>
			<div className='w-max text-start text-white mt-5 mb-3'>Suggestions For You</div>
			<UsersList />
		</div>
	)
}

export default Suggestions
