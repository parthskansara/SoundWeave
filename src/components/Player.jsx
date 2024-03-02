import { useContext, useEffect, useState } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import SongContext from '../context/SongContext';
import Crunker from 'crunker';
import { useRef } from 'react';

const Player = () => {
    const { songList } = useContext(SongContext);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [concatURL, setConcatURL] = useState('');

    useEffect(() => {
        setCurrentSongIndex(0);
    }, [songList]);

    const handleSongEnded = () => {
        setCurrentSongIndex(prevSongIndex => {
            const nextSongIndex = prevSongIndex + 1;
            return nextSongIndex < songList.length ? nextSongIndex : 0;
        });
    };
    
    const audioPlayerRef = useRef(null);

    useEffect(() => {
        if (audioPlayerRef.current) {
            audioPlayerRef.current.audio.current.pause();
        }
    }, [concatURL]); 

    useEffect(() => {
        setCurrentSongIndex(0);
    
        if (songList.length > 0) {
            const crunker = new Crunker();
    
            crunker.fetchAudio(...songList.map(song => song.url)) // Adjust according to your `songList` structure
            .then(buffers => crunker.concatAudio(buffers))
            .then(concatenated => crunker.export(concatenated, 'audio/mp3'))
            .then(output => setConcatURL(output.url))
            .catch(error => console.error(error));
        }
    }, [songList]);

    return (
    <div className='flex my-[40px] mx-[40px]'>

    <AudioPlayer
        ref={audioPlayerRef}        
        autoPlay={false}
        src={concatURL}
        onEnded={handleSongEnded}
        onPlay={() => console.log("onPlay")}
    />
    </div>
    );
};


export default Player;
