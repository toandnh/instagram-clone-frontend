import LoginForm from '../../components/forms/login-form/loginForm'
import AltLogin1 from '../../components/forms/alt-login/altLogin1'
import GetApp from '../../components/forms/get-app/getApp'
import Footer from '../../components/footer/footer'

import image from '../../images/image.png'

const Login1 = () => {
	return (
		<div className='bg-neutral-50 h-screen w-screen grid grid-rows-[5fr_110px] gap-2.5'>
			<div className='grid grid-cols-2 gap-2.5 mt-10 pb-10'>
				<div className='h-full justify-self-end'>
					<img src={image} alt='intro' />
				</div>

				<div className='grid grid-rows-[5fr_1fr_1fr] gap-2.5 h-full w-[380px] justify-self-start'>
					<LoginForm />
					<AltLogin1 />
					<GetApp />
				</div>
			</div>

			<Footer />
		</div>
	)
}

export default Login1
