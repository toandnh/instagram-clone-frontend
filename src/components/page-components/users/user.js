import { useGetUsersQuery } from '../../services/users/usersApi'

import ButtonFollow from '../buttons/buttonFollow'
import SpinnerLoader from '../spinner-loader/spinnerLoader'


const LINK = 'http://localhost:3500/'

const User = ({ userId }) => {
    const { user, isLoading, isSuccess } = useGetUsersQuery(undefined, {
        selectFromResult: ({ data, isLoading, isSuccess }) => ({
            user: data?.entities[userId],
            isLoading, 
            isSuccess
        }),
        pollingInterval: 3 * 60 * 1000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) 
        content = <SpinnerLoader />

    if (isSuccess) {
        const img_link = LINK + user.avatar

        let desc
        if (user.name) {
            desc = (
                <div className='grid grid-rows-3 font-sans text-white gap-0'>
                    <div className=''>{user.username}</div>
                    <div className=''>{user.name}</div>
                    <div className=''></div>
                </div>
            )
        } else {
            desc = (
                <div className='grid grid-rows-2 font-sans text-white gap-0'>
                    <div className=''>{user.username}</div>
                    <div className=''></div>
                </div>
            )
        }

        content = (
            <div className='h-16 grid grid-cols-2 p-4 items-center'>
                <div className='h-10 flex justify-start items-center gap-4'>
                    <img src={img_link} alt='avatar' className='h-[45px] w-[45px] rounded-full' />
                    {desc}
                </div>
                
                <div className='flex justify-end'>
                    <ButtonFollow userId={userId} />
                </div>
            </div>
        )
    }

    return content
}

export default User