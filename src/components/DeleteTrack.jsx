import DeleteIcon from '@mui/icons-material/Delete';

const DeleteTrack = () => {

    return (
        <div className="bg-delete-inactive text-primary text-sm py-[5px]">
            <DeleteIcon /> Drag here to remove track 
        </div>
    );
};

export default DeleteTrack;