import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Modal as MuiModal } from '@mui/material'

import { setPostOpened, postOpened } from '../../features/modal/modalSlice'

import PostModal from '../posts/post-explore/postModal'

const Modal = () => {
	const opened = useSelector(postOpened)

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const handleClose = () => {
		dispatch(setPostOpened(false))
		navigate(-1)
	}

	return (
		<>
			{opened ? (
				<MuiModal
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center'
					}}
					open={opened}
					onClose={handleClose}
				>
					<div className='w-[70%] aspect-[9/6] flex justify-center items-center'>
						<PostModal />
					</div>
				</MuiModal>
			) : (
				<div className='bg-neutral-900 h-full w-full flex justify-center items-center overflow-hidden'>
					<div className='w-[80%] aspect-[9/6]'>
						<PostModal />
					</div>
				</div>
			)}
		</>
	)
}

export default Modal
