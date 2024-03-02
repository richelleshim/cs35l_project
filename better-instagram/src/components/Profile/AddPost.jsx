import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';
import { useRef, useState } from 'react';
import Modal from '@mui/joy/Modal';
import Textarea from '@mui/joy/Textarea';
import IconButton from '@mui/joy/IconButton';


export default function AddPost() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const inputRef = useRef(null);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(URL.createObjectURL(file));
    }
  };

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  const handleClose = () =>{
    setSelectedFile(null);
  };

  return (
    <>
      <Button onClick={toggleModal}>Create post</Button>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <input
          type="file"
          ref={inputRef}
          style={{ display: 'none' }}
          onChange={handleFileInputChange}
        />
      </Box>

      {/* Render selected image */}
      {selectedFile && (
        <Box display="flex" justifyContent="center" alignItems="center" mt={5} w={'full'} position={'relative'}>
          <img src={selectedFile} alt="Selected image" />
         <IconButton onClick={handleClose}>
          x
         </IconButton> 
        </Box>
      )}

      <Modal
        open={openModal}
        onClose={toggleModal}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            bgcolor: '#FFFFFF',
            borderRadius: 10,
            p: 1.5,
            height: '75vh',
            width: '60vh',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            height={'50vh'}
            width={'50vh'}
            my={3}
            sx={{
              border: '1px dashed grey',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Button onClick={() => inputRef.current.click()}>Add image</Button>
          </Box>

          <Textarea
            placeholder="Add a caption"
            minRows={4}
            maxRows={4}
            sx={{
              borderRadius: '10px',
              minWidth: '300px',
            }}
          />
        </Box>
      </Modal>
    </>
  );
}