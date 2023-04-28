import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { List, ListItem, ListItemButton, ListItemText } from '@mui/material'

import { useLogoutMutation } from '../../services/auth/authApi'

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

const More = () => {
	const navigate = useNavigate()

	const [logout, { isSuccess }] = useLogoutMutation()

	useEffect(() => {
		if (isSuccess) navigate('/login-alt')
	}, [isSuccess, navigate])

	const onLogoutClicked = () => {
		logout()
	}

	return (
		<div className='h-[350px] w-[250px] flex flex-col justify-center bg-neutral-800 rounded-xl'>
			<List sx={style.list}>
				<ListItem disablePadding>
					<ListItemButton disableGutters sx={style.button}>
						<ListItemText primary='Settings' sx={style.text} />
					</ListItemButton>
				</ListItem>

				<ListItem disablePadding>
					<ListItemButton disableGutters sx={style.button}>
						<ListItemText primary='Saved' sx={style.text} />
					</ListItemButton>
				</ListItem>

				<ListItem disablePadding>
					<ListItemButton disableGutters sx={style.button}>
						<ListItemText primary='Switch appearance' sx={style.text} />
					</ListItemButton>
				</ListItem>

				<ListItem disablePadding>
					<ListItemButton disableGutters sx={style.button}>
						<ListItemText primary='Your activity' sx={style.text} />
					</ListItemButton>
				</ListItem>

				<ListItem disablePadding>
					<ListItemButton disableGutters sx={style.button}>
						<ListItemText primary='Report a problem' sx={style.text} />
					</ListItemButton>
				</ListItem>
			</List>

			<List sx={style.list}>
				<ListItem disablePadding>
					<ListItemButton disableGutters sx={style.button}>
						<ListItemText primary='Switch accounts' sx={style.text} />
					</ListItemButton>
				</ListItem>

				<ListItem disablePadding>
					<ListItemButton
						onClick={onLogoutClicked}
						disableGutters
						sx={style.button}
					>
						<ListItemText primary='Log out' sx={style.text} />
					</ListItemButton>
				</ListItem>
			</List>
		</div>
	)
}

export default More
