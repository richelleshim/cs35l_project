import { Box, Button, Modal, Textarea, IconButton, Typography } from '@mui/joy';
import { useRef, useState } from 'react';

export function PostWidget({ close }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const inputRef = useRef(null);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(URL.createObjectURL(file));
    }
  };

  return <Modal
    open={true}
    onClose={close}
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
      <Typography
        level="h1"
        sx={{ pt: 3 }}
      >
        Create Post
      </Typography>
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
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <input
            type="file"
            ref={inputRef}
            style={{ display: 'none' }}
            onChange={handleFileInputChange}
          />
        </Box>
        {/* Render selected image */}
        {selectedFile && 
          <img style={{width: "100%"}} src={selectedFile} alt="Selected image" />
        }
        {!selectedFile && 
          <Button onClick={() => inputRef.current.click()}>Add image</Button>
        }
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
        {selectedFile && 
          <Button sx={{m: 2}} onClick={() => inputRef.current.click()}>Post!</Button>
        }
    </Box>
  </Modal>;

}

export default function AddPostButton() {
  const [openModal, setOpenModal] = useState(false);

  const handleClose = () =>{
    setSelectedFile(null);
  };

  const click=()=>{
      setOpenModal(!openModal);
  }

  return (
    <>
      <Button sx={{m: 5}} onClick={() => {click()}}>Create post</Button>
      {openModal && <PostWidget
        close={()=>{click()}}
      />}
    </>
  );
}