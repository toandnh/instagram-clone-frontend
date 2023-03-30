import { useEffect, useRef, useState } from 'react'

import useWindowSize from '../../hooks/useWindowSize'

import PostsGrid from '../../page-components/posts/post-explore/postsGrid'

const Explore = () => {
	const [width, setWidth] = useState(0)
	const ref = useRef(null)

	const size = useWindowSize()

	useEffect(() => {
		setWidth(ref.current.clientWidth)
	}, [size])

	return (
		<div className='bg-neutral-900 h-screen grid p-5 justify-items-center overflow-y-scroll'>
			<div className='h-full w-full flex flex-col' ref={ref}>
				<div className='h-1/6'></div>
				<PostsGrid width={width} />
			</div>
		</div>
	)
}

export default Explore
