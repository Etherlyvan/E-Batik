const LoadingOverlay = ({
    bgColor = 'bg-white bg-opacity-80',
    spinnerColor = 'border-[#5a2b2b]',
}) => (
    <div
        className={`fixed inset-0 flex items-center justify-center ${bgColor} backdrop-blur-sm z-50`}
    >
        <div
            className={`w-16 h-16 border-4 ${spinnerColor} border-t-transparent rounded-full animate-spin`}
        ></div>
    </div>
);

export default LoadingOverlay;
