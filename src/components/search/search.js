import { useState } from 'react'

import { useSearchUserQuery } from '../../services/users/usersApi'

import useAuth from '../../hooks/useAuth'
import useDebounce from '../../hooks/useDebounce'

import SearchResult from './searchResult'
import SpinnerLoader from '../spinner-loader/spinnerLoader'

const Search = () => {
	const { userId: authorizedUserId } = useAuth()

	const [searchQuery, setSearchQuery] = useState('')

	const debounceSearchQuery = useDebounce(searchQuery, 500)

	const {
		data: searchResults,
		isSuccess,
		isLoading,
		isFetching
	} = useSearchUserQuery(debounceSearchQuery, {
		skip: debounceSearchQuery === ''
	})

	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value)
	}

	let results

	if (isLoading || isFetching) results = <SpinnerLoader />

	if (isSuccess) {
		const { ids, entities } = searchResults
		const usersList = ids?.length
			? ids.map(
					(userId) =>
						userId !== authorizedUserId && (
							<SearchResult key={userId} user={entities[userId]} />
						)
			  )
			: null

		results = usersList
	}

	return (
		<div className='bg-black h-screen w-[400px] grid grid-rows-[1fr_4fr] rounded-r-xl border-x border-neutral-900'>
			<div className='grid grid-rows-2 gap-6 p-5 border-b border-neutral-900'>
				<h1 className='font-sans text-white text-2xl font-semibold'>Search</h1>
				<input
					type='text'
					className='bg-neutral-700 h-9 w-full p-3 rounded text-white focus:outline-none'
					value={searchQuery}
					onChange={handleSearchChange}
					placeholder='Search'
				/>
			</div>

			{searchQuery ? (
				<div className='flex flex-col pt-3'>{results}</div>
			) : (
				<div className='grid grid-rows-[1fr_9fr] p-5'>
					<div className='grid grid-cols-2 font-sans text-white'>
						<h1 className='justify-self-start'>Recent</h1>
						<h1 className='justify-self-end'>Clear all</h1>
					</div>

					<div />
				</div>
			)}
		</div>
	)
}

export default Search
