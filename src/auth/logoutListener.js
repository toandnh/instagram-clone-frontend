import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'

import { useLogoutMutation } from '../services/auth/authApi'
import { expiredStatus } from '../features/auth/authSlice'

const LogoutListener = () => {
	console.log('Listening for logout status...')
	const expired = useSelector(expiredStatus)

	const [logout, { isSuccess }] = useLogoutMutation()

	const navigate = useNavigate()

	useEffect(() => {
		if (expired) logout()
	}, [expired, logout])

	useEffect(() => {
		if (isSuccess) navigate('/login-alt')
	}, [isSuccess, navigate])

	return <Outlet />
}

export default LogoutListener
