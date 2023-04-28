import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import store from '../features/store'

import { usersApi } from '../services/users/usersApi'
import { postsApi } from '../services/posts/postsApi'

const Prefectch = () => {
	useEffect(() => {
		console.log('prefetching...')
		store.dispatch(
			usersApi.util.prefetch('getUsers', undefined, { force: true })
		)
		store.dispatch(
			postsApi.util.prefetch('getPosts', undefined, { force: true })
		)
	}, [])

	return <Outlet />
}

export default Prefectch
