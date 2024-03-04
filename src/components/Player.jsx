    import { useContext, useEffect, useState } from 'react';
    import AudioPlayer from 'react-h5-audio-player';
    import 'react-h5-audio-player/lib/styles.css';
    import { SongContext } from '../context/SongContext';
    import Crunker from 'crunker';
    import { useRef } from 'react';
    import '../App.css';

    const Player = () => {
        const { songList, setDownloadURL, setPlaybackProgress } = useContext(SongContext);
        const [concatURL, setConcatURL] = useState('');

        
        
        const audioPlayerRef = useRef(null);

        useEffect(() => {
            if (audioPlayerRef.current) {
                audioPlayerRef.current.audio.current.pause();
            }
        }, [concatURL]); 

        const handleListen = () => {
            const currentTime = audioPlayerRef.current.audio.current.currentTime;
            const duration = audioPlayerRef.current.audio.current.duration;
            setPlaybackProgress({ currentTime, duration });
        };

        useEffect(() => {
        
            if (songList.length > 0) {
                const crunker = new Crunker();
        
                crunker.fetchAudio(...songList.map(song => song.url)) // Adjust according to your `songList` structure
                .then(buffers => crunker.concatAudio(buffers))
                .then(concatenated => crunker.export(concatenated, 'audio/mp3'))
                .then(output => {
                    setConcatURL(output.url);
                    setDownloadURL(output.blob);            
                })
                .catch(error => console.error(error));
            }
        }, [songList, setDownloadURL]);

        return (
        <div className='player-div flex mt-[40px] mx-[40px] border-4 border-outline'>

        <AudioPlayer
            ref={audioPlayerRef}        
            autoPlay={false}
            onListen={handleListen}
            src={concatURL}
        />
        </div>
        );
    };


    export default Player;
