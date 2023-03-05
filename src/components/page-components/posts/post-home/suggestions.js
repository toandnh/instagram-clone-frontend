import UsersList from '../../users/usersList'


const Suggestions = () => {
    return (
        <div className='w-[500px]'>
            <div className='w-max text-start text-white mt-5 mb-3'>Suggestions For You</div>
            <UsersList />
        </div>
    )
}

export default Suggestions