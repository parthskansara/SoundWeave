import { useContext, useEffect, useState } from "react";
import { SongContext } from "../context/SongContext";

const SongCard = ({ title, onDragStart, id, draggableRef, totalTrackWidth }) => {

    const { longestTrackDuration, songList, updateSongById } = useContext(SongContext);
    const [cardStyle, setCardStyle] = useState({width: "100%", left: "0%", position: "relative"});
    
    const song = songList.find((song) => song.id === id);
    let songLeftPosition = parseInt(song.leftPosition || "0", 10);
    let songStartTime = song.startTime;
    const duration = song ? song.duration: "1"; 
    
    const safeLongestDuration = Math.max(longestTrackDuration || 0, 1);
    let trackWidthPercent = (duration / safeLongestDuration)* 100;
  

    useEffect(() => {
        if (song.duration >= longestTrackDuration)
        {
            songLeftPosition = 0;
            songStartTime = 0;
            trackWidthPercent = trackWidthPercent*(1 - songLeftPosition/100);
        }
        setCardStyle({            
            left: `${songLeftPosition}%`,
            width: `${trackWidthPercent}%`,
            position: `relative`
        });
        updateSongById(id, { leftPosition: songLeftPosition, startTime: songStartTime, width: trackWidthPercent});
    }, [trackWidthPercent, longestTrackDuration, songLeftPosition]); 



    return (
        <> 
            <div className="flex flex-row h-[100%] items-center ">
                <div 
                    ref={draggableRef}
                    className="h-[10vh] px-4 flex bg-primary text-sm text-font-dark justify-center items-center font-serif border-0 border-outline rounded-full"
                    draggable
                    onDragStart={(e) => onDragStart(e, id)}
                    style={cardStyle}
                >
                    <span className="overflow-hidden">{title}     </span>
                </div>
            </div>
            
        </>
    );
};

export default SongCard;