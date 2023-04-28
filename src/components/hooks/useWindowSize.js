import { useEffect, useState } from 'react'

const useWindowSize = () => {
	const [size, setSize] = useState({
		activeHeight: window.innerHeight,
		activeWidth: window.innerWidth
	})

	useEffect(() => {
		const updateSize = () => {
			setSize({
				activeHeight: window.innerHeight,
				activeWidth: window.innerWidth
			})
		}
		window.addEventListener('resize', updateSize)
		updateSize()
		return () => window.removeEventListener('resize', updateSize)
	}, [])

	return size
}

export default useWindowSize
