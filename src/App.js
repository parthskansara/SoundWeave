import './index.css';
import 'react-h5-audio-player/lib/styles.css';
import Player from './components/Player';
import SongQueue from './components/SongQueue';
import { SongProvider } from './context/SongContext';
import { ToastProvider } from './context/ToastContext';

function App() {

  return (
    <>
      
      <div className='bg-primary h-[100vh]'>
        <div className='font-serif italic text-center text-header pt-[10px] text-[40px]'>SoundWeave</div>
        <div className='font-serif text-center text-header text-[18px]'>The iMovie for your Audio Tracks</div>  
        <ToastProvider>
          <SongProvider>
            <div className='flex flex-col'>
              <SongQueue />  
              <Player /> 
            </div> 
          </SongProvider>
        </ToastProvider>
      </div>
    </>
  );
}

export default App;
