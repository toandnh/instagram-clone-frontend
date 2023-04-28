import LoginForm from '../../components/forms/login-form/loginForm'
import AltLogin1 from '../../components/forms/alt-login/altLogin1'
import GetApp from '../../components/forms/get-app/getApp'
import Footer from '../../components/footer/footer'

const Login2 = () => {
	return (
		<div className='bg-white h-screen w-screen grid grid-rows-[5fr_110px] gap-2.5'>
			<div className='grid grid-cols-[3fr_2fr_3fr] mt-10 pb-10'>
				<div />
				<div className='grid grid-rows-[5fr_1fr_1fr] gap-2.5 h-full w-full'>
					<LoginForm />
					<AltLogin1 />
					<GetApp />
				</div>
				<div />
			</div>

			<Footer />
		</div>
	)
}

export default Login2
