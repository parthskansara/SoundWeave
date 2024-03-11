import { useContext, useRef, useState } from "react";
import SongCard from "./SongCard";
import { SongContext } from "../context/SongContext";

const Track = ({ title, id }) => {

    const { updateSongById, songList, longestTrackDuration } = useContext(SongContext);
    const songCardRef = useRef(null);
    const TrackRef = useRef(null);
    const [initialCursorXInsideCard, setInitialCursorXInsideCard] = useState(0);
    const [left, setLeft] = useState([]);
    const [totalTrackWidth, setTotalTrackWidth] = useState(0);
    const [dragStarting, setDragStarting] = useState(false);

    const currentSong = songList.find(song => song.id === id);
    const duration = currentSong.duration;

    const handleDragStart = (e, songId) => {
        setDragStarting(true);
        const invisibleElement = document.createElement('div');
        invisibleElement.style.opacity = '0'; 
        document.body.appendChild(invisibleElement);
        e.dataTransfer.setDragImage(invisibleElement, 0, 0);

        e.dataTransfer.setData("text/plain", songId);
        const songCardElement = e.target;
        const cursorXRelativeToPage = e.clientX;
        const songCardStart = songCardElement.getBoundingClientRect().left;
        const cursorXInsideCard = cursorXRelativeToPage - songCardStart;
        setInitialCursorXInsideCard(cursorXInsideCard);

    };


        

    const handleDrop = (e) => {
        if (dragStarting)
        {
            setDragStarting(false);
            e.preventDefault();
            const newStartTime = (left / 100) * longestTrackDuration;
            updateSongById(id, { leftPosition: left, startTime: newStartTime });
            
        }
    };



    const handleDragOver = (e) => {
        if (dragStarting)
        {
        e.preventDefault();
        const trackElement = e.currentTarget;
        const dropPositionXRelativeToPage = e.clientX;
        const trackStart = trackElement.getBoundingClientRect().left + 2;
        const dropPositionXInsideTrack = dropPositionXRelativeToPage - trackStart;

        // Calculate new left position for the song card based on the displacement
        let newCardLeft = dropPositionXInsideTrack - initialCursorXInsideCard;
        setTotalTrackWidth(trackElement.offsetWidth - 4);
        const songCardWidth = (duration / longestTrackDuration) * totalTrackWidth;
        const maxStartPos = totalTrackWidth - songCardWidth;
        const minStartPos = 0;

        if (newCardLeft < minStartPos){
            newCardLeft = 0;
        }
        else if (newCardLeft > maxStartPos){
            newCardLeft = maxStartPos;
        }
        
        const newLeftPositionPercent = (newCardLeft / totalTrackWidth) * 100;
        
        songCardRef.current.style.left = `${newLeftPositionPercent}%`;
        setLeft(newLeftPositionPercent);
    }

        
    };
    

    return (
        <>
            <div ref={TrackRef} onDrop={handleDrop} onDragOver={handleDragOver} className="w-[100%] mx-2 mb-2 bg-outline border-outline border-2 rounded-full">
                <SongCard
                    draggable
                    title={title}
                    onDragStart={(e) => handleDragStart(e, id)}
                    id={id}
                    draggableRef={songCardRef}
                    totalTrackWidth={totalTrackWidth}
                />
            </div>
        </>
    );

};

export default Track;