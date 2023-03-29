import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Button } from '@mui/material'

import { setLocationChanged } from '../../features/location/locationSlice'


const LINK = 'http://localhost:3500/'

const SearchResult = ({ user }) => {
    const { _id: userId, username, name, avatar } = user

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleOnClick = () => {
        navigate(`/profile/${userId}`)
        dispatch(setLocationChanged(true))
    }

    const img_link = LINK + avatar

    return (
        <Button
            onClick={handleOnClick}
            sx={{
                width: '100%',
                justifyContent: 'start',
                padding: '0.5rem 1.25rem',
                textTransform: 'none',
                ':hover': {
                    backgroundColor: 'rgb(23, 23, 23)' 
                }
            }}
        >
            <div className='flex flex-row gap-4'>
                <div>
                    <img src={img_link} alt='avatar' className='h-[45px] aspect-square rounded-full' />
                </div>
                <div className='flex flex-col font-sans text-base'>
                    <div className='text-white font-semibold'>{username}</div>
                    <div className='text-neutral-500'>{name}</div>
                </div>
            </div>
        </Button>
    )
}

export default SearchResult