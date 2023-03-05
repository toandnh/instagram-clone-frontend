import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { CircularProgress, Backdrop } from '@mui/material'

import { setCredentials } from '../../../features/auth/authSlice'
import { useLoginMutation } from '../../../services/auth/authApi'

import Logo from '../logo/logo'
import Divider from '../divider/divider'


const style = {
    inputText: 'h-9 w-72 p-3 border border-solid border-stone-300 rounded',
    submit: 'h-8 w-72 bg-sky-500 font-sans font-semibold text-white my-2.5 border-none rounded cursor-pointer hover:bg-sky-600' 
}

const LoginForm = () => {
    const [login, { 
        isLoading 
    }] = useLoginMutation()
    
    const userRef = useRef()
    const errRef = useRef()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errMessage, setErrMessage] = useState('')
    const [backdropOpened, setBackdropOpened] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMessage('')
    }, [username, password])

    useEffect(() => {
        if (isLoading) 
            setBackdropOpened(true)
    }, [isLoading])

    const handleUserInput = (e) => {setUsername(e.target.value)}
    const handlePasswordInput = (e) => {setPassword(e.target.value)}

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { accessToken } = await login({ username, password }).unwrap()
            dispatch(setCredentials({ accessToken }))
            setUsername('')
            setPassword('')
            navigate('/')
        } catch (err) {
            setBackdropOpened(false)
            if (!err.status) {
                setErrMessage('Server not responding!')
            } else if (err.status === 400) {
                setErrMessage('Incorrect username or password!')
            } else if (err.status === 401) {
                setErrMessage('Unauthorized!')
            } else {
                setErrMessage(err.data?.message)
            }
            errRef.current.focus()
        }
    }

    return (
        <div className='grid grid-rows-3 border border-solid border-stone-300'>
            <Logo />

            <form className='grid justify-items-center items-center' onSubmit={handleSubmit}>
                <p
                    ref={errRef}
                    aria-live='assertive'
                >
                    {errMessage}
                </p>
                <div className='h-[80px] grid grid-rows-2'>
                    <input 
                        type='text' 
                        className={style.inputText} 
                        ref={userRef}
                        value={username}
                        onChange={handleUserInput}
                        autoComplete='off'
                        placeholder='Phone number, username, or email' 
                        required
                    />
                    <input 
                        type='password' 
                        className={style.inputText} 
                        value={password}
                        onChange={handlePasswordInput}
                        placeholder='Password' 
                        required
                    />
                </div>
                <input 
                    type='submit' 
                    className={style.submit}
                    value='Log in' 
                />
            </form>

            <div className='grid justify-items-center gap-1'>
                <Divider />

                <div className='font-sans font-semibold'>
                    <a href='https://www.w3schools.com/' target='_blank' rel='noreferrer'>Log in with Facebook!</a>
                </div>
                <div className='font-sans text-xs'>
                    <a href='https://www.w3schools.com/' target='_blank' rel='noreferrer'>Forgot password?</a>
                </div>
            </div>
            <Backdrop
                sx={{ color: 'white', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={backdropOpened}
            >
                <CircularProgress thickness={5} color='inherit' />
            </Backdrop>
        </div>
    )
}

export default LoginForm