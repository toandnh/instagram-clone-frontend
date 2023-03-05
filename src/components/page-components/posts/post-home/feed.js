import { useGetUsersQuery } from '../../../services/users/usersApi'

import useAuth from '../../../hooks/useAuth'

import Sugestions from './suggestions'
import PostsList from './postsList'
import SpinnerLoader from '../../spinner-loader/spinnerLoader'


const Feed = () => {
    const { userId } = useAuth()

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

    let content
    
    if (isLoading)
        content = <SpinnerLoader />

    if (isSuccess) {
        const isFollowing = user?.following?.length

        content = isFollowing ? <PostsList /> : <Sugestions />
    }

    return content
}

export default Feed