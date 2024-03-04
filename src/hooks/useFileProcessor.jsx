import { useContext, useCallback } from 'react';
import { SongContext } from '../context/SongContext';
import { ToastContext } from '../context/ToastContext';

export const useFileProcessor = () => {
  const { setSongList } = useContext(SongContext); 
  const { showToast } = useContext(ToastContext);


  const processFiles = useCallback((files) => {
    let isValidFile = false;
    const newSongs = Array.from(files).filter(file => {
      if (file.type === "audio/mpeg") {
        isValidFile = true;
        return true;
      } else {
        showToast("Invalid file type, upload an audio file");
        return false;
      }
    }).map(file => ({
      url: URL.createObjectURL(file),
      name: file.name.split(".")[0],
    }));
    
    if (isValidFile) {
      setSongList(prevSongs => [...prevSongs, ...newSongs]);
    }
  }, [setSongList, showToast]);

  return processFiles;
};
