import { useContext, useEffect, useState } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { SongContext } from '../context/SongContext';
import { useRef } from 'react';
import '../App.css';

const Player = () => {
    const { mergedURL, setPlaybackProgress } = useContext(SongContext);
    const [lastPlaybackPosition, setLastPlaybackPosition] = useState(0);
                    
    const audioPlayerRef = useRef(null);

    useEffect(() => {
        const audioElement = audioPlayerRef.current.audio.current;
        
        if (audioElement) {
            if (!mergedURL){
                audioElement.currentTime = 0;                    
                audioElement.src="";     
                audioElement.pause();
            }
            else{
                audioElement.preload = "none";
                audioElement.currentTime = lastPlaybackPosition;
                audioElement.play();
            }              
        }
        
    }, [mergedURL]); 

    const handleListen = () => {
        const currentTime = audioPlayerRef.current.audio.current.currentTime;
        const duration = audioPlayerRef.current.audio.current.duration;
        if (duration) {
            setPlaybackProgress({ currentTime, duration });

            // added this line
            setLastPlaybackPosition(currentTime);
        }
    };

    // const handlePause = () => {
    //     const player = audioPlayerRef.current.audio.current;
    //     setLastPlaybackPosition(player.currentTime);
    // };
    

    return (
    <div className='player-div flex mt-[10px] mx-[40px] border-4 border-outline'>

    <AudioPlayer
        ref={audioPlayerRef}        
        autoPlay={false}
        onListen={handleListen}
        src={mergedURL}
        progressUpdateInterval={1}
    />
    </div>
    );
};


export default Player;
