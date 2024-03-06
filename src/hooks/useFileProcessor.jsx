import { useContext, useCallback, useState } from 'react';
import { SongContext } from '../context/SongContext';
import { ToastContext } from '../context/ToastContext';
import { v4 as uuidv4 } from 'uuid';

export const useFileProcessor = () => {
  const { songList, setSongList, longestTrackDuration, setLongestTrackDuration } = useContext(SongContext); 
  const { showToast } = useContext(ToastContext);


  const processFiles = useCallback((files) => {
    
    const audioFiles = Array.from(files).filter(file => {
      if (file.type !== "audio/mpeg") {
        showToast("Invalid file type, upload an audio file");
        return false;        
      } 
      return true;
    });

    const filePromises = audioFiles.map(file => {
      return new Promise((resolve) => {
        const url = URL.createObjectURL(file);
        const audio = new Audio(url);
        audio.addEventListener('loadedmetadata', () => {
          
          resolve({
            id: uuidv4(),
            url,
            name: file.name.split(".")[0],
            duration: audio.duration,
            startTime: 0,
            width: '100',
            leftPosition: '0'
          });
        }, { once: true });
      });
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
    

    
  }, [setSongList, showToast]);

  return processFiles;
};
