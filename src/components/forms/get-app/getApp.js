import appStore from '../../../images/app-store.png'
import playStore from '../../../images/play-store.png'

const GetApp = () => {
	return (
		<div className='h-[80px] grid justify-items-center items-center grid-rows-2 gap-1'>
			<div className='font-sans'>Get the app.</div>
			<div className='w-4/5 grid grid-cols-2 gap-2.5'>
				<img src={appStore} alt='App Store' />
				<img src={playStore} alt='Play Store' />
			</div>
		</div>
	)
}

export default GetApp
