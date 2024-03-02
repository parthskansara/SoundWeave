const Toast = ({message}) => {
    return (
        <>
            <div className="absolute top-[20px] z-50 right-[40px] bg-red-600 text-white px-4 py-4">
                {message}
            </div>
            
        </>
    );
};

export default Toast;