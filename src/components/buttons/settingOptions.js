import { useNavigate } from 'react-router-dom'

import { List, ListItem, ListItemButton, ListItemText } from '@mui/material'

import { useDeletePostMutation } from '../../services/posts/postsApi'

const style = {
	list: {
		padding: 0
	},
	button: {
		height: '3rem',
		padding: '0 1rem',
		':hover': {
			backgroundColor: 'rgb(23, 23, 23)'
		}
	},
	text: {
		color: 'white'
	}
}

const SettingOptions = ({ postId }) => {
	const [deletePost] = useDeletePostMutation()

	const navigate = useNavigate()

	const onDeletePostClick = () => {
		deletePost({ id: postId })
		navigate(-1)
	}

	return (
		<div className='h-[350px] w-[250px] flex flex-col justify-center bg-neutral-800 rounded-xl'>
			<List sx={style.list}>
				<ListItem disablePadding>
					<ListItemButton
						onClick={onDeletePostClick}
						disableGutters
						sx={{ ...style.button, ...{ color: 'red' } }}
					>
						<ListItemText primary='Delete post' sx={style.text} />
					</ListItemButton>
				</ListItem>

				<ListItem disablePadding>
					<ListItemButton disableGutters sx={style.button}>
						<ListItemText primary='Some' sx={style.text} />
					</ListItemButton>
				</ListItem>

				<ListItem disablePadding>
					<ListItemButton disableGutters sx={style.button}>
						<ListItemText primary='Other' sx={style.text} />
					</ListItemButton>
				</ListItem>

				<ListItem disablePadding>
					<ListItemButton disableGutters sx={style.button}>
						<ListItemText primary='Functions' sx={style.text} />
					</ListItemButton>
				</ListItem>

				<ListItem disablePadding>
					<ListItemButton disableGutters sx={style.button}>
						<ListItemText primary='Not' sx={style.text} />
					</ListItemButton>
				</ListItem>
			</List>

			<List sx={style.list}>
				<ListItem disablePadding>
					<ListItemButton disableGutters sx={style.button}>
						<ListItemText primary='Implemented' sx={style.text} />
					</ListItemButton>
				</ListItem>

				<ListItem disablePadding>
					<ListItemButton disableGutters sx={style.button}>
						<ListItemText primary='Yet' sx={style.text} />
					</ListItemButton>
				</ListItem>
			</List>
		</div>
	)
}

export default SettingOptions
