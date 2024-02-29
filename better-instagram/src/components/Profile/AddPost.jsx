import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';
import {useRef, useState} from 'react';
import Modal from '@mui/joy/Modal';
import Textarea from '@mui/joy/Textarea';

export default function AddPost() {
    const[openModal, setOpenModal] = useState(false);
  const inputRef = useRef(null);
  const handleFileInputClick = () => {
    //when clicked, the button will trigger the computer's file database to open
    inputRef.current.click();
  };

  const toggleModal = () => {
    setOpenModal(!openModal)
  }
  /*<Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <input
        type="file"
        ref={inputRef}
        style={{ display: 'none' }}
      />
      <Button onClick={handleFileInputClick}>+</Button>
    </Box>*/

  return (
    <>
        <Button onClick={toggleModal}>
                Create post
        </Button>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <input
                type="file"
                ref={inputRef}  // Ref used to access the input element
                style={{ display: 'none' }}  // Hide the input element
            />
        </Box>
        <Modal 
            open={openModal} 
            onClose={toggleModal}
            sx={{
                display: 'flex', 
                justifyContent:'center', 
                alignItems: 'center'
            }}>
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
                        alignItems: 'center'}}>
                    <Box
                        height={'50vh'}
                        width={'50vh'}
                        my={3}
                        sx={{
                            border: '1px dashed grey',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                        
                        <Button onClick={handleFileInputClick}>Add image</Button>

                    </Box>
                    
                    <Textarea
                    placeholder="Add a caption" 
                    minRows={4}
                    maxRows={4}
                
                    sx={{
                        
                        borderRadius: '10px',
                        minWidth: '300px',
                        
                    }}/>
                </Box>
        </Modal>
    </> 
    
  );
}