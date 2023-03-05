import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Modal as MuiModal } from '@mui/material'

import { setModalOpened, modalOpened } from '../features/modal/modalSlice'

import PostModal from '../page-components/posts/post-explore/postModal'


const Modal = () => {
    const opened = useSelector(modalOpened)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleClose = () => {
        dispatch(setModalOpened(false))
        navigate(-1)
    }

    return (
        <MuiModal
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            open={opened}
            onClose={handleClose}
        >
            <div className='h-[95%] w-[70%] flex justify-center items-center'>
                <PostModal />
            </div>
        </MuiModal>
    )
}

export default Modal