import PostsGrid from '../../page-components/posts/post-explore/postsGrid'


const Explore = () => {
    return (
        <div className='bg-neutral-900 h-screen grid p-5 justify-items-center overflow-y-scroll'>
            <div className='h-full w-4/5 flex flex-col'>
                <div className='h-1/6'></div>
                <PostsGrid />
            </div>
        </div>
    )
}

export default Explore