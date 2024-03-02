import React, { useState, useCallback } from 'react';
import Player from './Player';
import SongCard from './SongCard';
import Toast from './Toast';
import { useContext } from 'react';
import SongContext from '../context/SongContext';

function SongQueue() {
  const { songList, setSongList } = useContext(SongContext);
  const [toast, setToast] = useState({ show: false, message: '' });

  const showToast = useCallback((message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 3000); // Hide after 3 seconds
  }, []);

  const handleDrop = useCallback((event) => {
    event.preventDefault();
    const sourceId = parseInt(event.dataTransfer.getData("text/plain"), 10);

    const files = event.dataTransfer.files;
    let isValidFile = false;

    if (files.length > 0)
    { 
      const newSongs = Array.from(files).filter(file => {
      if (file.type == "audio/mpeg"){
        isValidFile = true;
        return true;
      }
      else {
        showToast("Invalid file type, upload an audio file");
        return false;
      }
    }).map((file) => {
      return {
        url: URL.createObjectURL(file),
        name: file.name.split(".")[0],
      };
    });

      
      
      setSongList((prevSongs) => [...prevSongs, ...newSongs]);
      console.log([...songList])
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
  }, [showToast]);


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


  return (
    <>
      <div className='flex flex-col'>      
      {toast.show && 
        <Toast message={toast.message} />
      }
     
      <div className='text-center flex flex-col border-8 rounded-lg border-gray-900 mx-[40px] mt-[40px] relative'>
      <div className='text-white text-[20px] bg-black py-2 '>Song Queue</div>
        <div draggable className='h-[50vh] bg-gray-500 flex flex-row' onDrop={handleDrop} onDragOver={handleDragOver}>
          {songList.map((song, index) => (       
            <>
            {index > 0 ? null : (
              <div 
                  data-id={index} 
                  onDragOver={handleReorderDragOver} 
                  onDragLeave={handleDragLeave}
                  onDrop={handleReorder}
                  className="w-[5px] h-[100%] flex bg-white justify-center items-center"
              />
            )} 
                
              <SongCard title={song.name} onDragStart={handleDragStart} id={index}/>
              <div 
                    data-id={index+1} 
                    onDragOver={handleReorderDragOver} 
                    onDragLeave={handleDragLeave}
                    onDrop={handleReorder}
                    className="w-[5px] h-[100%] flex bg-white justify-center items-center"
                />
            </>
          ))}
        </div>
      </div>
      </div>
    </>
  );
}

export default SongQueue;
