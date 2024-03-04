import React, { useState } from "react";

export const SongContext = React.createContext();

export const SongProvider = ({ children }) => {
    const [songList, setSongList] = useState([]);
    const [downloadURL, setDownloadURL] = useState();
    const [playbackProgress, setPlaybackProgress] = useState({ currentTime: 0, duration: 0 });

    const value = {
        songList,
        setSongList,
        downloadURL, 
        setDownloadURL,
        playbackProgress,
        setPlaybackProgress,
    };

    return <SongContext.Provider value={value}>{children}</SongContext.Provider>;
};
