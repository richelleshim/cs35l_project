import { Box, Button, Modal, Textarea, IconButton, Typography } from '@mui/joy';
import { useRef, useState } from 'react';

export function PostWidget({ close }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [caption, setCaption] = useState("");
  const inputRef = useRef(null);

  // handle change in image
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(URL.createObjectURL(file));
    }
  };

  // post the post to backend
  const post = (event) => {
    // TODO: we can sterlize the input or smth
    console.log(caption);
  };

  // set caption value to the input
  const handleCaptionChange = (event) => {
    setCaption(event.target.value);
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
        width={"50vh"}
      >
        <Box
          height={'50vh'}
          my={3}
          sx={{
            border: '1px dashed grey',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5
          }}
        >
          {/* idk what this is */}
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
            <img style={{ width: "100%" }} src={selectedFile} alt="Selected image" />
          }
          {/* Button to upload image */}
          {!selectedFile &&
            <Button onClick={() => inputRef.current.click()}>Add image</Button>
          }
        </Box>

        {/* Caption area */}
        <Textarea
          placeholder="Add a caption"
          minRows={4}
          maxRows={4}
          width={'50vh'}
          sx={{
            borderRadius: '10px',
            width: "100%",
            minWidth: '300px',
          }}
          value={caption}
          onChange={handleCaptionChange}
        />
        {/* Post button !! */}
        {selectedFile &&
          <Button sx={{ mt: 3, pt: 1.5, pb: 1.5, width: "100%" }} onClick={() => post()}>Post!</Button>
        }
        {/* Aesthetic margin */}
        <Box sx={{ mb: 5 }} />
      </Box>
    </Box>
  </Modal>;

}

export default function AddPostButton() {
  const [openModal, setOpenModal] = useState(false);

  const handleClose = () => {
    setSelectedFile(null);
  };

  const click = () => {
    setOpenModal(!openModal);
  }

  return (
    <>
      <Button sx={{ m: 5 }} onClick={() => { click() }}>Create post</Button>
      {openModal && <PostWidget
        close={() => { click() }}
      />}
    </>
  );
}