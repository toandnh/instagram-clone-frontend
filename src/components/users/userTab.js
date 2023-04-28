import { useEffect, useRef, useState } from 'react'

import { Box, Tabs, Tab } from '@mui/material'

import PropTypes from 'prop-types'

import useWindowSize from '../../hooks/useWindowSize'

import PostsGrid from '../posts/post-profile/postsGrid'

const TabPanel = (props) => {
	const { children, value, index, ...other } = props

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box sx={{ px: 0 }}>{children}</Box>}
		</div>
	)
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired
}

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`
	}
}

const UserTab = ({ userId }) => {
	const [value, setValue] = useState(0)
	const [width, setWidth] = useState(0)

	const ref = useRef(null)

	const size = useWindowSize()

	useEffect(() => {
		setWidth(ref.current.clientWidth)
	}, [size])

	const handleChange = (event, newValue) => {
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
					<Tab
						label={<span className='text-white'>POSTS</span>}
						{...a11yProps(0)}
					/>
					<Tab
						label={<span className='text-white'>SAVED</span>}
						{...a11yProps(1)}
					/>
					<Tab
						label={<span className='text-white'>TAGGED</span>}
						{...a11yProps(2)}
					/>
				</Tabs>
			</Box>
			<TabPanel value={value} index={0}>
				<PostsGrid key={userId} userId={userId} width={width} />
			</TabPanel>
			<TabPanel value={value} index={1}></TabPanel>
			<TabPanel value={value} index={2}></TabPanel>
		</div>
	)
}

export default UserTab
