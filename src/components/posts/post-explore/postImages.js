import { useState } from 'react'

import { Button, MobileStepper } from '@mui/material'

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'

import { useGetPostsQuery } from '../../../services/posts/postsApi'
import SpinnerLoader from '../../spinner-loader/spinnerLoader'

const LINK = process.env.BASE_URL + 'uploads/'

const PostImages = ({ postId }) => {
	const [activeSlide, setActiveSlide] = useState(0)

	const handleNext = () => {
		setActiveSlide((prevSlide) => prevSlide + 1)
	}
	const handleBack = () => {
		setActiveSlide((prevSlide) => prevSlide - 1)
	}

	const { post, isLoading, isSuccess } = useGetPostsQuery(undefined, {
		selectFromResult: ({ data, isLoading, isSuccess }) => ({
			post: data?.entities[postId],
			isLoading,
			isSuccess
		}),
		pollingInterval: 3 * 60 * 1000,
		refetchOnFocus: true,
		refetchOnMountOrArgChange: true
	})

	const images = []
	post.images.forEach((image) => {
		images.push(LINK + image)
	})
	const maxStep = images.length

	let content

	if (isLoading) content = <SpinnerLoader />

	if (isSuccess) {
		content = (
			<>
				<div className='max-w-full h-auto w-auto flex justify-center items-center grow overflow-hidden'>
					<img src={images[activeSlide]} alt='slideshow' />
				</div>
				<MobileStepper
					steps={maxStep}
					position='static'
					activeStep={activeSlide}
					sx={{
						bgcolor: 'black',
						'& .MuiMobileStepper-dot': {
							backgroundColor: 'gray'
						},
						'& .MuiMobileStepper-dotActive': {
							backgroundColor: 'white'
						}
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
			</>
		)
	}

	return content
}

export default PostImages
