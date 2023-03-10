import { Link } from 'react-router-dom'

import { Button } from '@mui/material'


const LINK = 'http://localhost:3500/'

const SearchResult = ({ user }) => {
    const { _id: userId, username, name, avatar } = user

    const img_link = LINK + avatar

    return (
        <Button
            component={Link}
            to={`/profile/${userId}`}
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
                    <img src={img_link} alt='avatar' className='h-[45px] w-[45px] rounded-full' />
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