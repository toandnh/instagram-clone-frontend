import { List, ListItem, ListItemButton, ListItemText } from '@mui/material'

const style = {
	title: {
		display: 'flex',
		flexGrow: 1,
		color: 'white'
	},
	item: {
		borderBottomWidth: '1px',
		borderColor: 'rgb(64 64 64)'
	},
	button: {
		':hover': {
			backgroundColor: 'inherit'
		}
	},
	text: {
		display: 'flex',
		justifyContent: 'center'
	}
}

const UserAvatarChange = () => {
	return (
		<List
			sx={{
				height: '100%',
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center'
			}}
		>
			<ListItem disablePadding sx={{ ...style.title, ...style.item }}>
				<ListItemText
					primary='Change Profile Photo'
					primaryTypographyProps={{ fontSize: 20 }}
					sx={style.text}
				/>
			</ListItem>

			<ListItem disablePadding sx={style.item}>
				<ListItemButton disableGutters sx={style.button}>
					<ListItemText
						primary='Upload Photo'
						primaryTypographyProps={{
							color: 'rgb(2 132 199)',
							fontWeight: 700
						}}
						sx={style.text}
					/>
				</ListItemButton>
			</ListItem>

			<ListItem disablePadding sx={style.item}>
				<ListItemButton disableGutters sx={style.button}>
					<ListItemText
						primary='Remove Current Photo'
						primaryTypographyProps={{
							color: 'rgb(225 29 72)',
							fontWeight: 700
						}}
						sx={style.text}
					/>
				</ListItemButton>
			</ListItem>
		</List>
	)
}

export default UserAvatarChange
