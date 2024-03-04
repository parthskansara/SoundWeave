import './App.css';
import 'react-h5-audio-player/lib/styles.css';
import Player from './components/Player';
import SongQueue from './components/SongQueue';
import { SongProvider } from './context/SongContext';
import { useState } from 'react';

function App() {
  const [songList, setSongList] = useState([]);
  const [downloadURL, setDownloadURL] = useState();
  const [playbackProgress, setPlaybackProgress] = useState({ currentTime: 0, duration: 0 });

  const value = {
    songList, 
    setSongList,
    downloadURL, 
    setDownloadURL,
    playbackProgress, 
    setPlaybackProgress
  };

  return (
    <>
      
      <div className='bg-primary h-[100vh]'>
      <div className='font-serif italic text-center text-header pt-[10px] text-[40px]'>SoundWeave</div>
      <div className='font-serif text-center text-header text-[18px]'>The iMovie for your Audio Tracks</div>  
        <SongProvider>
          <div className='flex flex-col'>
            <SongQueue />  
            <Player /> 
          </div> 
        </SongProvider>
      </div>
    </>
  );
}

export default App;
