import { Outlet } from 'react-router-dom'

import Footer from '../../page-components/footer/footer'

const Profile = () => {
	return (
		<div className='bg-neutral-900 grid grid-rows-[5fr_110px] overflow-y-auto'>
			<Outlet />
			<Footer />
		</div>
	)
}

export default Profile
