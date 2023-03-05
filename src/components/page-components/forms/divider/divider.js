const Divider = () => {
    return (
        <div className="relative flex w-72 py-2 items-center">
            <div className="flex-grow border-t border-gray-400" />
            <span className="flex-shrink mx-4 text-gray-400 font-sans font-semibold text-xs">OR</span>
            <div className="flex-grow border-t border-gray-400" />
        </div>
    )
}

export default Divider