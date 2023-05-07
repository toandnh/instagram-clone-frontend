import { Link } from 'react-router-dom'

const AltLogin1 = () => {
	return (
		<div className='h-[80px] grid justify-items-center items-center border border-solid border-stone-300 font-sans'>
			<div>
				Don't have an account?
				<Link to='/signup' className='font-semibold'>
					{' '}
					Sign up
				</Link>
			</div>
		</div>
	)
}

export default AltLogin1
