import { useEffect, useRef, useState } from 'react'

import { Box, Tabs, Tab } from '@mui/material'

import useWindowSize from '../../hooks/useWindowSize'

import PostsGrid from '../posts/post-profile/postsGrid'

const TabPanel = (props) => {
	const { children, value, index, ...other } = props

	return (
		<div role='tabpanel' hidden={value !== index} {...other}>
			{value === index && <Box sx={{ px: 0 }}>{children}</Box>}
		</div>
	)
}

const UserTab = ({ userId }) => {
	const [value, setValue] = useState(0)
	const [width, setWidth] = useState(0)

	const ref = useRef(null)

	const size = useWindowSize()

	useEffect(() => {
		setWidth(ref.current.clientWidth)
	}, [size])

	const handleChange = (newValue) => {
		setValue(newValue)
	}

	return (
		<div ref={ref}>
			<Box sx={{ display: 'flex', justifyContent: 'center', padding: '0' }}>
				<Tabs
					value={value}
					onChange={handleChange}
					TabIndicatorProps={{ style: { background: 'white' } }}
				>
					<Tab label={<span className='text-white'>POSTS</span>} />
					<Tab label={<span className='text-white'>SAVED</span>} />
					<Tab label={<span className='text-white'>TAGGED</span>} />
				</Tabs>
			</Box>
			<TabPanel value={value} index={0}>
				<PostsGrid key={userId} userId={userId} width={width} />
			</TabPanel>
			<TabPanel value={value} index={1}>
				Nothing to display!
			</TabPanel>
			<TabPanel value={value} index={2}>
				Nothing to display!
			</TabPanel>
		</div>
	)
}

export default UserTab
