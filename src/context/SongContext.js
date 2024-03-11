import Crunker from "crunker";
import React, { useEffect, useState } from "react";

export const SongContext = React.createContext();

export const SongProvider = ({ children }) => {
const [songList, setSongList] = useState([]);
const [downloadURL, setDownloadURL] = useState();
const [playbackProgress, setPlaybackProgress] = useState({ currentTime: 0, duration: 0 });
const [longestTrackDuration, setLongestTrackDuration] = useState(0);
const [mergedURL, setMergedURL] = useState('');
const [isPlaying, setIsPlaying] = useState(false);
console.log("Inside the SongProvider in SongContext");  


const updateSongById = (id, updates) => {
    
    setSongList(currentList =>
        currentList.map((song) =>
            song.id === id ? { ...song, ...updates } : song
        )
    );
};

useEffect(() => {
    console.log("Inside SongContext, songList updated")
    if (songList.length > 0) {
        const crunker = new Crunker();

        crunker.fetchAudio(...songList.map(song => song.url))
        .then(buffers => {
            const paddedBuffersPromises = buffers.map((buffer, index) => {
            const startTime = songList[index].startTime;
            return crunker.padAudio(buffer, 0, startTime); 
        });

            return Promise.all(paddedBuffersPromises);
        })
        .then(paddedBuffers => crunker.mergeAudio(paddedBuffers))
        .then(merged => crunker.export(merged, 'audio/mp3'))
        .then(output => {
            setMergedURL(output.url);
            setDownloadURL(output.blob);         
        })
        .catch(error => console.error(error));

        const maxDuration = songList.reduce((max, song) => Math.max(max, song.duration), 0);
        setLongestTrackDuration(maxDuration);

    }
    else {
        setMergedURL(null);
    }
}, [songList, setDownloadURL]);

const value = {
    isPlaying, 
    setIsPlaying,
    songList,
    setSongList,
    updateSongById,        
    mergedURL, 
    setMergedURL,
    downloadURL, 
    setDownloadURL,
    playbackProgress,
    setPlaybackProgress,
    longestTrackDuration, 
    setLongestTrackDuration,
};

return <SongContext.Provider value={value}>{children}</SongContext.Provider>;
};
