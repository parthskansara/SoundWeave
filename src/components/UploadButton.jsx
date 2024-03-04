import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useFileProcessor } from '../hooks/useFileProcessor';


const UploadButton = () => {

    const processFiles = useFileProcessor();

    const handleFileChange = (event) => {
        processFiles(event.target.files);        
    };

    return (
        <>
            <div className='upload-button-container'>
                <input
                    type="file"
                    id="fileInput"
                    multiple
                    accept="audio/mpeg"
                    onChange={handleFileChange}
                    className="hidden"
                />
                    <button
                        className='bg-primary rounded-sm text-outline text-sm px-2 py-2' 
                        onClick={() => document.getElementById('fileInput').click()}
                    >
                        Upload File <UploadFileIcon />
                    </button>
            </div>
        </>
    );
};

export default UploadButton;