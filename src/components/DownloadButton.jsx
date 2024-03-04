import React, { useContext } from "react";
import DownloadIcon from '@mui/icons-material/Download';
import { SongContext } from "../context/SongContext";
import Crunker from "crunker";

const DownloadButton = () => {

    const { songList, downloadURL } = useContext(SongContext);

    const downloadSong = () => {

        const crunker = new Crunker();

        crunker.download(downloadURL);

    };
    
    const isDisabled = songList.length === 0;

    return (
        <>
            <div className="">
                <button 
                    className={`download-button`}
                    onClick={downloadSong} 
                    disabled={isDisabled}
                >
                    <DownloadIcon color={`${isDisabled ? 'disabled' : ''}`} />
                </button>

            </div>
        </>
    );
};

export default DownloadButton;