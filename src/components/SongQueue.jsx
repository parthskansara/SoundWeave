import React, { useCallback } from 'react';
import SongCard from './SongCard';
import Toast from './Toast';
import { useContext } from 'react';
import { SongContext } from '../context/SongContext';
import DownloadButton from './DownloadButton';
import DeleteTrack from './DeleteTrack';
import { ToastContext } from '../context/ToastContext';
import { useFileProcessor } from '../hooks/useFileProcessor';
import UploadButton from './UploadButton';

function SongQueue() {
  const { songList, setSongList } = useContext(SongContext);
  const { toast } = useContext(ToastContext);
  const processFiles = useFileProcessor();

  const handleDrop = useCallback((event) => {
    event.preventDefault();
    const sourceId = parseInt(event.dataTransfer.getData("text/plain"), 10);

    const files = event.dataTransfer.files;
    

    if (files.length > 0)
    { 
      processFiles(files);
    }
    else if (!isNaN(sourceId))
    {

      let targetId = parseInt(event.target.getAttribute('data-id'), 10);
      console.log(targetId)

      if (sourceId < targetId){
        targetId--;
      }
      setSongList((prevSongs) => {
        let newSongs = [...prevSongs];          
        const [reorderedSong] = newSongs.splice(sourceId, 1);          
        newSongs.splice(targetId, 0, reorderedSong);
        return newSongs;
      });

    }
  }, [setSongList, processFiles]);


  const handleDragStart = (event, id) => {
    event.dataTransfer.setData("text/plain", id);
  };

  const handleReorderDragOver = (e) => {
    e.preventDefault(); // Necessary to allow for the drop event to fire.
    e.target.style.backgroundColor = 'yellow'; // Change the div color when dragged over.

  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

const handleDragLeave = (e) => {
    e.target.style.backgroundColor = 'white'; // Revert the div color when the drag leaves.
};

const handleReorder = (e) => {
    e.target.style.backgroundColor = 'white'; // Optionally, revert the div color on drop as well.
};

const handleDeleteDragOver = (e) => {
  e.preventDefault();
  e.target.style.backgroundColor = '#C70000';
}

const handleDeleteDragLeave = (e) => {
  e.preventDefault();
  e.target.style.backgroundColor = '#C7000099';
}

const deleteDroppedTrack = (e) => {
  e.preventDefault();
  const sourceId = parseInt(e.dataTransfer.getData("text/plain"), 10);

  setSongList((prevSongs) => {
      const updatedSongs = prevSongs.filter((_, index) => index !== sourceId);
      return updatedSongs;
  });

  e.target.style.backgroundColor = '#C7000099';
};




  return (
    <>
      <div className='flex flex-col'>      
      {toast.show && 
        <Toast message={toast.message} />
      }
     
      <div className='text-center flex flex-col border-4 border-outline mx-[40px] mt-[10px] relative'>
        <div className='flex flex-row items-center justify-center text-font-light font-bold text-[25px] bg-header pb-4 pt-2'>
          <div></div>
          <div className='absolute flex justify-center'>
            <span>Song Queue</span>
          </div>  
          <div className='flex ml-auto '>
            <UploadButton />  
            <div className='ml-8 mr-8'>
              <DownloadButton />  
            </div>
          </div>
          
        </div>
        <div draggable className='h-[40vh] bg-secondary flex flex-row overflow-x-auto' onDrop={handleDrop} onDragOver={handleDragOver}>
          {
            songList.length === 0 ? (
              <div className='text-header text-lg italic flex justify-center items-center w-full'>
                Drag audio tracks here to get started
              </div>
            ) : null

          }
          
          {songList.map((song, index) => (       
            <>
            {index > 0 ? null : (
              <div 
                  data-id={index} 
                  onDragOver={handleReorderDragOver} 
                  onDragLeave={handleDragLeave}
                  onDrop={handleReorder}
                  className="start-bar min-w-[8px] h-[100%] flex bg-white border-2 border-black justify-center items-center"
              />
            )} 
                
              <SongCard title={song.name} onDragStart={handleDragStart} id={index}/>
              <div 
                    data-id={index+1} 
                    onDragOver={handleReorderDragOver} 
                    onDragLeave={handleDragLeave}
                    onDrop={handleReorder}
                    className="end-bar min-w-[8px] h-[100%] flex bg-white border-2 border-black justify-center items-center"
                />
            </>
          ))}
        </div>
        {
          songList.length > 0 && 
          <div draggable onDrop={deleteDroppedTrack} onDragOver={handleDeleteDragOver} onDragLeave={handleDeleteDragLeave}>
            <DeleteTrack />
          </div>
        }
        
      </div>
      </div>
    </>
  );
}

export default SongQueue;
