import { useContext, useCallback } from 'react';
import { SongContext } from '../context/SongContext';
import { ToastContext } from '../context/ToastContext';
import { v4 as uuidv4 } from 'uuid';

export const useFileProcessor = () => {
  const { setSongList, longestTrackDuration, setLongestTrackDuration } = useContext(SongContext); 
  const { showToast } = useContext(ToastContext);

  async function getFileAudioBuffer(file) {
    const audioContext = new AudioContext();
    const arrayBuffer = await file.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);  
    return [audioBuffer, audioBuffer.duration];
  }

  const processFiles = useCallback((files) => {
    
    const audioFiles = Array.from(files).filter(file => {
      if (file.type !== "audio/mpeg") {
        showToast("Invalid file type, upload an audio file");
        return false;        
      } 
      return true;
    });

    const filePromises = audioFiles.map(async file => {
      const url = URL.createObjectURL(file);
      const [songBuffer, songDuration] = await getFileAudioBuffer(file);

      return {
        id: uuidv4(),
        url,
        name: file.name.split(".")[0],
        duration: songDuration,
        startTime: 0,
        width: '100',
        leftPosition: '0',
        buffer: songBuffer
      };
    });
    
    Promise.all(filePromises).then(newSongs => {
      setSongList(prevSongs => [...prevSongs, ...newSongs]);
      const maxDuration = newSongs.reduce((max, song) => Math.max(max, song.duration), longestTrackDuration);

      if (maxDuration > longestTrackDuration){
        setLongestTrackDuration(maxDuration);
      }

    }).catch(error => {
      showToast("An error occurred while processing the files");
      console.error(error);
    });
    

    
  }, [setSongList, showToast, longestTrackDuration, setLongestTrackDuration]);

  return processFiles;
};
