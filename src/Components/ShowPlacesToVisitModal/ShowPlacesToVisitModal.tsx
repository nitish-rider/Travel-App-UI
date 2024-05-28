import React, {useEffect} from 'react';
import {Modal, Box, Typography, Breadcrumbs} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface PlacesToVisit{
  name: string;
  description: string;
}


interface MyModalProps {
  open: boolean;
  handleClose: () => void;
  array: PlacesToVisit[];
  city: string;
}

const MyModal: React.FC<MyModalProps> = ({ open, handleClose, array,city }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"

    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        padding: 2
      }}>
        <div style={{
          display: 'flex',
            justifyContent: 'space-between',
          borderBottom: '1px solid silver',
        }}>
          <h3 style={{marginTop: 0}}>Places to visit in {city}</h3>
          <div onClick={handleClose} style={{
            cursor: 'pointer'
          }}>
            <CloseIcon/>
          </div>
        </div>
        {array.map((item, index) => (
            <Typography id={`item-${index}`} key={index} sx={{ mt: 2 }}>
            {item.name} - {item.description}
          </Typography>
        ))}
      </Box>
    </Modal>
  );
};

export default MyModal;