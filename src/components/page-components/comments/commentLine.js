import { Link } from 'react-router-dom'

import { Button } from '@mui/material'

const CommentLine = ({ userId, userAvatar, username, text }) => {
	return (
		<div className='flex flex-row gap-2 my-2'>
			<Button
				component={Link}
				to={`/profile/${userId}`}
				sx={{
					maxWidth: '30px',
					maxHeight: '30px',
					minWidth: '30px',
					minHeight: '30px',
					margin: '0 0.5rem',
					padding: '0'
				}}
			>
				<img src={userAvatar} alt='avatar' className='h-[30px] w-[30px] rounded-full' />
			</Button>
			<div className='flex flex-row items-center font-sans text-white'>
				<Button
					component={Link}
					to={`/profile/${userId}`}
					sx={{
						height: '100%',
						display: 'flex',
						justifyContent: 'start',
						textTransform: 'none',
						fontSize: '14px',
						fontWeight: '700',
						color: 'white',
						padding: '0 0.5rem 0 0'
					}}
				>
					{username}
				</Button>
				{text}
			</div>
		</div>
	)
}

export default CommentLine
