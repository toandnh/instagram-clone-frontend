import { List, ListItem, ListItemButton, ListItemText } from '@mui/material'

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

const SettingOptionsAlt = ({ postId }) => {
	return (
		<div className='h-[350px] w-[250px] flex flex-col justify-center bg-neutral-800 rounded-xl z-[1000]'>
			<List sx={style.list}>
				<ListItem disablePadding>
					<ListItemButton disableGutters sx={style.button}>
						<ListItemText primary='Just' sx={style.text} />
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

export default SettingOptionsAlt
