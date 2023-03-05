import { useState } from 'react'

import { Box, Tabs, Tab } from '@mui/material'

import PostsGrid from '../posts/post-profile/postsGrid'


const TabPanel = (props) => {
    const { children, value, index, ...other } = props
  
    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            {...other}
        >
            {value === index && (
            <Box sx={{ px: 15 }}>
                {children}
            </Box>
            )}
        </div>
    )
}

const UserTab = ({ userId }) => {
    const [value, setValue] = useState(0)

    const handleChange = (event, newValue) => {setValue(newValue)}

    return (
        <>
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
                <PostsGrid key={userId} userId={userId} />
            </TabPanel>
            <TabPanel value={value} index={1}>

            </TabPanel>
            <TabPanel value={value} index={2}>
                
            </TabPanel>
        </>
    )
}

export default UserTab