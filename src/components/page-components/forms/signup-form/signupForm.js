import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAddNewUserMutation } from '../../../services/users/usersApi'

import Logo from '../logo/logo'
import Divider from '../divider/divider'

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{3,12}$/

const SignupForm = () => {
	const [username, setUsername] = useState('')
	const [validUsername, setValidUsername] = useState(false)
	const [password, setPassword] = useState('')
	const [validPassword, setValidPassword] = useState(false)
	const [name, setName] = useState('')
	const [contact, setContact] = useState('')

	useEffect(() => {
		setValidUsername(USER_REGEX.test(username))
	}, [username])

	useEffect(() => {
		setValidPassword(PWD_REGEX.test(password))
	}, [password])

	const [addNewUser, { isLoading, isSuccess }] = useAddNewUserMutation()

	const navigate = useNavigate()

	useEffect(() => {
		if (isSuccess) {
			setUsername('')
			setPassword('')
			setName('')
			setContact('')
			navigate('/')
		}
	}, [isSuccess, navigate])

	const handleUsernameChanged = (e) => {
		setUsername(e.target.value)
	}
	const handlePasswordChanged = (e) => {
		setPassword(e.target.value)
	}
	const handleNameChanged = (e) => {
		setName(e.target.value)
	}
	const handleContactChanged = (e) => {
		setContact(e.target.value)
	}

	const canSave = [validUsername, validPassword].every(Boolean) && !isLoading

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (canSave) await addNewUser({ username, password, name, contact })
	}

	return (
		<div className='h-[560px] grid grid-rows-[2fr_1fr_7fr] border border-solid border-stone-300'>
			<Logo />

			<div className='grid justify-items-center items-center'>
				<div className='w-72 px-0.5 font-sans font-semibold text-s text-center'>
					Sign up to see photos and videos from your friends.
				</div>
				<input
					type='submit'
					className='h-8 w-72 bg-sky-500 font-sans font-semibold text-white my-2.5 rounded cursor-pointer hover:bg-sky-600'
					value='Log in with Facebook'
				/>
				<Divider />
			</div>

			<form
				className='grid justify-items-center items-center'
				onSubmit={handleSubmit}
			>
				<div className='h-[160px] grid grid-rows-4'>
					<input
						type='text'
						className='h-9 w-72 p-3 border border-solid border-stone-300 rounded'
						placeholder='Mobile Number or Email'
						value={contact}
						onChange={handleContactChanged}
					/>
					<input
						type='text'
						className='h-9 w-72 p-3 border border-solid border-stone-300 rounded'
						placeholder='Full Name'
						value={name}
						onChange={handleNameChanged}
					/>
					<input
						type='text'
						className='h-9 w-72 p-3 border border-solid border-stone-300 rounded'
						placeholder='Username'
						value={username}
						onChange={handleUsernameChanged}
						required
					/>
					<input
						type='password'
						className='h-9 w-72 p-3 border border-solid border-stone-300 rounded'
						placeholder='Password'
						value={password}
						onChange={handlePasswordChanged}
						required
					/>
				</div>
				<div className='w-72 px-3 font-sans text-xs text-center'>
					People who use our service may have uploaded your contact information
					to Instagram.
					<a href='https://www.w3schools.com/' target='_blank' rel='noreferrer'>
						{' '}
						Learn More
					</a>
				</div>
				<div className='w-72 px-3 font-sans text-xs text-center'>
					By signing up, you agree to our
					<a href='https://www.w3schools.com/' target='_blank' rel='noreferrer'>
						{' '}
						Terms
					</a>
					,
					<a href='https://www.w3schools.com/' target='_blank' rel='noreferrer'>
						{' '}
						Privacy Policy{' '}
					</a>{' '}
					and
					<a href='https://www.w3schools.com/' target='_blank' rel='noreferrer'>
						{' '}
						Cookies Policy
					</a>
					.
				</div>
				<input
					type='submit'
					className='h-8 w-72 bg-sky-500 font-sans font-semibold text-white my-2.5 rounded cursor-pointer hover:bg-sky-600'
					value='Sign up'
					disabled={!canSave}
				/>
			</form>
		</div>
	)
}

export default SignupForm
