import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { MobileStepper, Button } from '@mui/material'

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'

import { useAddNewPostMutation } from '../../services/posts/postsApi'
import { useUploadMutation } from '../../services/uploads/uploadsApi'

import { setCreateOpened } from '../../features/modal/modalSlice'

import useAuth from '../../hooks/useAuth'

const CreatePost = () => {
	const { userId } = useAuth()

	const [addNewPost] = useAddNewPostMutation()

	const [upload] = useUploadMutation()

	const fileInputRef = useRef()
	const captionRef = useRef()

	const [images, setImages] = useState([])
	const [uploads, setUploads] = useState()
	const [activeSlide, setActiveSlide] = useState(0)
	const [showDiv, setShowDiv] = useState(false)
	const [caption, setCaption] = useState('')

	const navigate = useNavigate()
	const dispatch = useDispatch()

	const handleNext = () => {
		setActiveSlide((prevSlide) => prevSlide + 1)
	}
	const handleBack = () => {
		setActiveSlide((prevSlide) => prevSlide - 1)
	}

	const handleOnSelectclick = () => {
		fileInputRef.current.click()
	}
	const handleCaptionInput = (e) => {
		setCaption(e.target.value)
	}
	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			let formData = new FormData()
			formData.append('userId', userId)
			Object.entries(uploads).forEach((image) => formData.append('images', image[1]))
			const { filenames } = await upload(formData).unwrap()

			await addNewPost({ user: userId, images: filenames, caption })

			setImages((prev) => (prev = []))
			setShowDiv(false)
			setCaption('')

			navigate(`/profile/${userId}`)
			dispatch(setCreateOpened(false))
		} catch (err) {
			console.log(err)
		}
	}

	let maxStep = images.length

	const onImagesChange = (e) => {
		if (e.target.files) {
			setUploads((prev) => (prev = e.target.files))
			Object.entries(e.target.files).forEach((file) =>
				setImages((prev) => [...prev, URL.createObjectURL(file[1])])
			)
			maxStep = e.target.files.length
			setShowDiv(true)
		}
	}

	return (
		<form
			className='h-full w-full bg-neutral-800 grid grid-rows-[1fr_10fr] font-sans text-white rounded-xl'
			onSubmit={handleSubmit}
		>
			<div className='w-full flex flex-row justify-center items-center font-semibold border-b border-neutral-700'>
				<div className='grow flex justify-center m-2'>Create new post</div>
				<input
					type='submit'
					className={
						!showDiv
							? 'hidden'
							: 'grow-0 text-sky-600 enabled:cursor-pointer enabled:hover:text-white disabled:opacity-75 m-2'
					}
					value='Share'
				/>
			</div>

			<div className={showDiv ? 'hidden' : 'flex flex-col gap-4 justify-center items-center'}>
				<img alt='add' />
				<h1 className='text-xl'>Drag photos and videos here</h1>
				<input type='file' name='images' multiple hidden ref={fileInputRef} onChange={onImagesChange} />
				<input
					type='button'
					className='h-8 w-52 bg-sky-500 font-sans font-semibold text-white my-2.5 rounded cursor-pointer hover:bg-sky-600'
					onClick={handleOnSelectclick}
					value='Select from computer'
				/>
			</div>

			<div className={!showDiv ? 'hidden' : 'flex flex-row overflow-hidden'}>
				<div className='w-2/3 grid grid-rows-[9fr_1fr]'>
					<div className='max-w-full h-auto w-auto flex justify-center items-center overflow-hidden grow'>
						<img src={showDiv ? images[activeSlide] : ''} alt='slideshow' />
					</div>
					<MobileStepper
						steps={maxStep}
						position='static'
						activeStep={activeSlide}
						sx={{
							bgcolor: 'inherit',
							'& .MuiMobileStepper-dot': {
								backgroundColor: 'gray'
							},
							'& .MuiMobileStepper-dotActive': {
								backgroundColor: 'white'
							},
							display: !showDiv ? 'none' : 'flex'
						}}
						nextButton={
							<Button onClick={handleNext} disabled={activeSlide === maxStep - 1}>
								<KeyboardArrowRightIcon sx={{ color: 'white' }} />
							</Button>
						}
						backButton={
							<Button onClick={handleBack} disabled={activeSlide === 0}>
								<KeyboardArrowLeftIcon sx={{ color: 'white' }} />
							</Button>
						}
					/>
				</div>

				<div className='w-1/3 border-l border-neutral-700'>
					<input
						type='text'
						className='h-1/2 w-full bg-inherit focus:outline-none p-2'
						ref={captionRef}
						value={caption}
						onChange={handleCaptionInput}
						autoComplete='off'
						placeholder='Write a caption...'
					/>
				</div>
			</div>
		</form>
	)
}

export default CreatePost
