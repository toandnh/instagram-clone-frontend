const Search = () => {
    return (
        <div className='bg-black h-screen w-[400px] grid grid-rows-[1fr_4fr] rounded-r-xl border-x border-neutral-900'>
            <div className='grid grid-rows-2 gap-6 p-5 border-b border-neutral-900'>
                <h1 className='font-sans text-white text-2xl font-semibold'>Search</h1>
                <input type='text' className='bg-neutral-700 h-9 w-full p-3 rounded' placeholder='Search' />
            </div>

            <div className='grid grid-rows-[1fr_9fr] p-5'>
                <div className='grid grid-cols-2 font-sans text-white'>
                    <h1 className='justify-self-start'>Recent</h1>
                    <h1 className='justify-self-end'>Clear all</h1>
                </div>

                <div />
            </div>
        </div>
    )
}

export default Search