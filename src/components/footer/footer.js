const Footer = () => {
	return (
		<div className='h-[80px] grid justify-items-center grid-rows-2 mb-10 font-sans text-gray-500 text-xs'>
			<div className='flex gap-4 items-center'>
				<div>Meta</div>
				<div>About</div>
				<div>Blog</div>
				<div>Jobs</div>
				<div>Help</div>
				<div>API</div>
				<div>Privacy</div>
				<div>Terms</div>
				<div>Top Accounts</div>
				<div>Locations</div>
				<div>Instagram Lite</div>
				<div>Contact Uploading & Non-Users</div>
			</div>

			<div className='grid grid-cols-2 gap-3 items-center'>
				<select name='language' className='bg-inherit'>
					<option value='english'>English</option>
					<option value='french'>French</option>
					<option value='chinese'>Chinese</option>
				</select>

				<div>Copyright</div>
			</div>
		</div>
	)
}

export default Footer
