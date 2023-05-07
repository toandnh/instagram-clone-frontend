import { Link } from 'react-router-dom'

const AltLogin2 = () => {
	return (
		<div className='h-[80px] grid justify-items-center items-center border border-solid border-stone-300 font-sans'>
			<div>
				Have an account?
				<Link to='/login' className='font-semibold'>
					{' '}
					Log in
				</Link>
			</div>
		</div>
	)
}

export default AltLogin2
