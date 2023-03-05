import { CircularProgress } from '@mui/material'


const SpinnerLoader = () => {
    return (
        <div className='h-full w-full flex justify-center items-center'>
            <CircularProgress thickness={5} sx={{ color: 'white' }} />
        </div>
    )
}

export default SpinnerLoader