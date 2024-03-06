import { useContext, useEffect, useState } from "react";
import { SongContext } from "../context/SongContext";

const SongCard = ({ title, onDragStart, id }) => {

    const { longestTrackDuration, songList } = useContext(SongContext);
    const [cardStyle, setCardStyle] = useState({width: "100%", left: "0%", position: "relative"});
    
    const song = songList.find((song) => song.id === id);
    const songLeftPosition = song ? song.leftPosition : "0";
    const duration = song ? song.duration : "1";
    
    // Decide width
    const safeLongestDuration = Math.max(longestTrackDuration || 0, 1);
    const trackWidthPercent = (duration / safeLongestDuration) * 100;
    


    useEffect(() => {
        setCardStyle({            
            left: `${songLeftPosition}%`,
            width: `${trackWidthPercent}%`,
            position: `relative`
        });
    }, [trackWidthPercent, longestTrackDuration, songLeftPosition, songList]); 


    return (
        <> 
            <div className="flex flex-row h-[100%] items-center ">
                <div 
                    className="cursor-move h-[10vh] flex bg-primary text-sm text-font-dark justify-center items-center font-serif border-0 border-outline rounded-full cursor-grab"
                    draggable
                    onDragStart={(e) => onDragStart(e, id)}
                    style={cardStyle}
                >
                    {title}     
                </div>
            </div>
            
        </>
    );
};

export default SongCard;