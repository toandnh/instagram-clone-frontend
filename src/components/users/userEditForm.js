import { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import useAuth from '../../hooks/useAuth'

import { useUpdateUserMutation } from '../../services/users/usersApi'

import { useLogoutMutation } from '../../services/auth/authApi'

const UserEditForm = ({ user }) => {
	const { userId } = useAuth()

	const navigate = useNavigate()

	const [updateUser, { isSuccess: isUpdateSuccess }] = useUpdateUserMutation()

	const [logout, { isSuccess: isLogoutSuccess }] = useLogoutMutation()

	const [show, setShow] = useState(false)

	const [username, setUsername] = useState('')
	const [name, setName] = useState('')
	const [bio, setBio] = useState('')
	const [password, setPassword] = useState('')

	const isValid =
		username !== '' || name !== '' || bio !== '' || password !== ''

	useEffect(() => {
		if (isLogoutSuccess) navigate('/login-alt')
	}, [isLogoutSuccess, navigate])

	useEffect(() => {
		if (isUpdateSuccess) {
			setShow(true)
		}
	}, [isUpdateSuccess, navigate])

	useEffect(() => {
		setTimeout(() => {
			setShow(false)
		}, 2000)
	}, [show])

	const handleUsernameChange = (e) => {
		setUsername(e.target.value)
	}
	const handleNameChange = (e) => {
		setName(e.target.value)
	}
	const handleBioChange = (e) => {
		setBio(e.target.value)
	}
	const handlePasswordChange = (e) => {
		setPassword(e.target.value)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			updateUser({ id: userId, username, name, bio, password })
			if (password !== '') {
				logout()
			}
			setUsername('')
			setName('')
			setBio('')
			setPassword('')
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<>
			{show && (
				<div className='w-screen h-screen fixed bg-black/50 inset-0'>
					<p className='fixed top-1/2 left-1/2 text-white text-2xl font-semibold'>
						Updated
					</p>
				</div>
			)}
			<form onSubmit={handleSubmit}>
				<div className='w-full flex gap-6 mb-6'>
					<div className='flex flex-col gap-10 mt-5'>
						<label className='block uppercase tracking-wide text-xs font-bold mb-2 mr-1'>
							Username
						</label>
						<label className='block uppercase tracking-wide text-xs font-bold mb-2 mr-1'>
							Name
						</label>
						<label className='block uppercase tracking-wide text-xs font-bold mb-2 mr-1'>
							Bio
						</label>
						<label className='block uppercase tracking-wide text-xs font-bold mb-2 mr-1'>
							Password
						</label>
					</div>
					<div className='grow flex flex-col gap-4'>
						<input
							className='bg-inherit w-full rounded-md border border-neutral-600 p-3 focus:outline-none focus:border-white'
							type='text'
							value={username}
							onChange={handleUsernameChange}
							placeholder={user.username}
						/>
						<input
							className='bg-inherit w-full rounded-md border border-neutral-600 p-3 focus:outline-none focus:border-white'
							type='text'
							value={name}
							onChange={handleNameChange}
							placeholder={user.name}
						/>
						<input
							className='bg-inherit w-full rounded-md border border-neutral-600 p-3 focus:outline-none focus:border-white'
							type='text'
							value={bio}
							onChange={handleBioChange}
							placeholder={user.bio ?? 'bio'}
						/>
						<input
							className='bg-inherit w-full rounded-md border border-neutral-600 p-3 focus:outline-none focus:border-white'
							type='password'
							value={password}
							onChange={handlePasswordChange}
							placeholder='No way!'
						/>
					</div>
				</div>
				<div>
					<input
						type='submit'
						className='bg-blue-500 hover:cursor-pointer hover:bg-blue-600 py-3 px-5 rounded-md disabled:bg-blue-400'
						value='Submit'
						disabled={!isValid}
					/>
				</div>
			</form>
		</>
	)
}

export default UserEditForm
