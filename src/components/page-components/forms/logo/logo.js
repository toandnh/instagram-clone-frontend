import { Link } from 'react-router-dom'

import vector from '../../../images/vector1.png'

const Logo = () => {
	return (
		<div className='flex justify-center items-center'>
			<Link to={`/`}>
				<img src={vector} alt='logo' className='h-[50px] w-[200px]' />
			</Link>
		</div>
	)
}

export default Logo
