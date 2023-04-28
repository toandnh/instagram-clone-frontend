import { useSelector } from 'react-redux'

import jwtDecode from 'jwt-decode'

import { currentToken } from '../features/auth/authSlice'

const useAuth = () => {
	const token = useSelector(currentToken)

	let userId = ''
	let username = ''
	if (token) {
		userId = jwtDecode(token).user.id
		username = jwtDecode(token).user.username
	}

	return { userId, username }
}

export default useAuth
