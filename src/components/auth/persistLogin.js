import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

import { useRefreshMutation } from '../services/auth/authApi'
import { currentToken } from '../features/auth/authSlice'

import usePersist from '../hooks/usePersist'

import SpinnerLoader from '../page-components/spinner-loader/spinnerLoader'

const PersistLogin = () => {
	const [persist] = usePersist()

	const token = useSelector(currentToken)
	const effectRan = useRef(false)

	const [trueSuccess, setTrueSuccess] = useState(false)
	const [refresh, { isUninitialized, isLoading, isSuccess }] = useRefreshMutation()

	useEffect(() => {
		if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
			//react 18 strict mode.
			const verifyRefreshToken = async () => {
				console.log('Verifying refresh token...')
				try {
					await refresh()
					setTrueSuccess(true)
				} catch (err) {
					console.error(err)
				}
			}

			if (!token && persist) verifyRefreshToken()
		}

		return () => (effectRan.current = true)
		//eslint-disable-next-line
	}, [])

	let content

	if (isLoading) content = <SpinnerLoader size='screen' />

	if ((isSuccess && trueSuccess) || (token && isUninitialized)) content = <Outlet />

	return content
}

export default PersistLogin
