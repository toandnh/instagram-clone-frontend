import SignupForm from '../../page-components/forms/signup-form/signupForm'
import AltLogin2 from '../../page-components/forms/alt-login/altLogin2'
import GetApp from '../../page-components/forms/get-app/getApp'
import Footer from '../../page-components/footer/footer'

const Signup = () => {
	return (
		<div className='bg-white w-screen grid grid-rows-[5fr_110px] gap-2.5'>
			<div className='grid grid-cols-[3fr_2fr_3fr] mt-5 pb-10'>
				<div />

				<div className='w-[380px] grid grid-rows-[5fr_80px_80px] gap-2.5'>
					<SignupForm />
					<AltLogin2 />
					<GetApp />
				</div>

				<div />
			</div>

			<Footer />
		</div>
	)
}

export default Signup
