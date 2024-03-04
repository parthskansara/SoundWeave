const SongCard = ({ title, onDragStart, id, isFirstSong, isLastSong }) => {

    


    return (
        <> 
            <div className="flex flex-row h-[100%] items-center">
                <div 
                    className="cursor-move h-[50px] flex w-[20vw] bg-primary text-sm text-font-dark justify-center items-center font-serif border-2 border-outline rounded-lg"
                    draggable
                    onDragStart={(e) => onDragStart(e, id)}
                >
                    {title}     
                </div>
            </div>
            
        </>
    );
};

export default SongCard;