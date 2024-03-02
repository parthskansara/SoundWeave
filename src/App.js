import './App.css';
import 'react-h5-audio-player/lib/styles.css';
import Player from './components/Player';
import SongQueue from './components/SongQueue';
import SongContext from './context/SongContext';
import { useState } from 'react';

function App() {
  const [songList, setSongList] = useState([]);

  return (
    <>
      <div className='bg-slate-300 h-[100vh]'>
        <SongContext.Provider value={{ songList, setSongList }} >
          <div className='flex flex-col'>
            <SongQueue />  
            <Player /> 
          </div> 
        </SongContext.Provider>
      </div>
    </>
  );
}

export default App;
