import { useState } from 'react'

import { Button, Modal } from '@mui/material'

import SettingOptions from './settingOptions'
import SettingOptionsAlt from './settingOptionsAlt'

import more from '../../images/more.png'


const ButtonSettingPost = ({ postId, isAuthorizedUserPost }) => {
    const [opened, setOpened] = useState(false)

    const handleOpen = () => {setOpened(true)}
    const handleClose = () => {setOpened(false)}

    return (
        <>
            <Button 
                onClick={handleOpen}
                sx={{ 
                    maxWidth: '30px', 
                    maxHeight: '30px', 
                    minWidth: '30px', 
                    minHeight: '30px', 
                    margin: '0.5rem 0.5rem', 
                    padding: '0' 
                }}
            >
                <img src={more} alt='more' className='h-[30px] w-[30px]' />
            </Button>
            <Modal
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                open={opened}
                onClose={handleClose}
            >
                <div className='h-[50%] w-[25%] flex justify-center items-center'>
                    {isAuthorizedUserPost ? 
                        <SettingOptions postId={postId} /> :
                        <SettingOptionsAlt />
                    }
                </div>
            </Modal>
        </>
    )
}

export default ButtonSettingPost