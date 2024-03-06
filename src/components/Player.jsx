    import { useContext, useEffect } from 'react';
    import AudioPlayer from 'react-h5-audio-player';
    import 'react-h5-audio-player/lib/styles.css';
    import { SongContext } from '../context/SongContext';
    import { useRef } from 'react';
    import '../App.css';

    const Player = () => {
        const { mergedURL, setPlaybackProgress } = useContext(SongContext);
                      
        const audioPlayerRef = useRef(null);

        useEffect(() => {
            if (audioPlayerRef.current) {
                audioPlayerRef.current.audio.current.pause();
            }
        }, [mergedURL]); 

        const handleListen = () => {
            const currentTime = audioPlayerRef.current.audio.current.currentTime;
            const duration = audioPlayerRef.current.audio.current.duration;
            setPlaybackProgress({ currentTime, duration });
        };
     

        return (
        <div className='player-div flex mt-[10px] mx-[40px] border-4 border-outline'>

        <AudioPlayer
            ref={audioPlayerRef}        
            autoPlay={false}
            onListen={handleListen}
            src={mergedURL}
        />
        </div>
        );
    };


    export default Player;
