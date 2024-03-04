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
