import { useContext, useState } from "react";
import SongCard from "./SongCard";
import { SongContext } from "../context/SongContext";

const Track = ({ title, id }) => {

    const { updateSongById, songList, longestTrackDuration } = useContext(SongContext);
    

    const [initialCursorXInsideCard, setInitialCursorXInsideCard] = useState(0);
    // You might need to store the initial left position of the song card if it's draggable within the track
    // const [initialCardLeft, setInitialCardLeft] = useState(0);

    const currentSong = songList.find(song => song.id === id);
    const duration = currentSong.duration;

    const handleDragStart = (e, songId) => {
        e.dataTransfer.setData("text/plain", songId);
        const songCardElement = e.target;
        const cursorXRelativeToPage = e.clientX;
        const songCardStart = songCardElement.getBoundingClientRect().left;
        // Calculate and store where inside the song card the cursor started the drag
        const cursorXInsideCard = cursorXRelativeToPage - songCardStart;
        setInitialCursorXInsideCard(cursorXInsideCard);

    };

    const handleDrop = (e) => {
        e.preventDefault();
        const trackElement = e.currentTarget;
        const dropPositionXRelativeToPage = e.clientX;
        const trackStart = trackElement.getBoundingClientRect().left;
        const dropPositionXInsideTrack = dropPositionXRelativeToPage - trackStart;

        // Calculate new left position for the song card based on the displacement
        let newCardLeft = dropPositionXInsideTrack - initialCursorXInsideCard;
        const totalWidth = trackElement.offsetWidth - 2;
        const songCardWidth = (duration / longestTrackDuration) * totalWidth;
        const maxStartPos = totalWidth - songCardWidth;
        const minStartPos = 0;

        if (newCardLeft < minStartPos){
            newCardLeft = 0;
        }
        else if (newCardLeft > maxStartPos){
            newCardLeft = maxStartPos;
        }
        
        const newLeftPositionPercent = (newCardLeft / totalWidth) * 100;
        const newStartTime = (newLeftPositionPercent / 100) * longestTrackDuration;
        updateSongById(id, { leftPosition: newLeftPositionPercent, startTime: newStartTime });
    };



    const handleDragOver = (e) => {
        e.preventDefault();
    };
    

    return (
        <>
            <div onDrop={handleDrop} onDragOver={handleDragOver} className="w-[100%] mx-2 mb-2 bg-outline border-outline border-2 rounded-full">
                <SongCard
                    draggable
                    title={title}
                    onDragStart={(e) => handleDragStart(e, id)}
                    id={id}
                />
            </div>
        </>
    );

};

export default Track;