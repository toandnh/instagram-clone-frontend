import { useOutlet } from 'react-router-dom'

import Sidebar from '../../page-components/sidebar/sidebar'
import Feed from '../../page-components/posts/post-home/feed'

const Home = () => {
	const outlet = useOutlet()

	return (
		<div className='bg-black min-h-[600px] h-screen w-screen grid grid-cols-[250px_1fr]'>
			<Sidebar />

			{outlet || (
				<div className='bg-neutral-900 grid justify-items-center overflow-y-auto'>
					<Feed />
				</div>
			)}
		</div>
	)
}

export default Home
