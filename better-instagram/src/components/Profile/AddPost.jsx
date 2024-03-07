import { Box, Button, Modal, Textarea, IconButton, Typography } from '@mui/joy';
import { useRef, useState } from 'react';
import {firestore} from '../../firebase/firebase';
import { getDocs, setDoc, addDoc, collection} from 'firebase/firestore'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const storage = getStorage();

export function PostWidget({ close, addedPost }) {
  const [selectedFileURL, setSelectedFileURL] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [caption, setCaption] = useState("");
  const inputRef = useRef(null);

  // handle change in image
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setSelectedFileURL(URL.createObjectURL(file));
    }
  };

  // post the post to backend
  const post = async (event) => {
    // TODO: we can sterlize the input or smth
    console.log(caption)
    // addPost
    const postRef = await addDoc(collection(firestore, "posts"), {
      caption: caption,
      image: "",  // this is set to id, but is set later on as we don't know id atm
      userId: "", // TODO
    });
    // set image id of the post to the post id
    let imageId = postRef.id
    setDoc(postRef, { image: `images/${imageId}.png` }, { merge: true });

    // Create the file metadata
    /** @type {any} */
    const metadata = {
      contentType: 'image/png'
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, `images/${imageId}.png`);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;
    
          // ...
    
          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      }, 
      () => {
        addedPost();
      }
    );
    console.log("Document written with ID: ", postRef.id);
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
          {selectedFileURL &&
            <img style={{ width: "100%" }} src={selectedFileURL} alt="Selected image" />
          }
          {/* Button to upload image */}
          {!selectedFileURL &&
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
        {selectedFileURL &&
          <Button sx={{ mt: 3, pt: 1.5, pb: 1.5, width: "100%" }} onClick={() => post()}>Post!</Button>
        }
        {/* Aesthetic margin */}
        <Box sx={{ mb: 5 }} />
      </Box>
    </Box>
  </Modal>;

}

export default function AddPostButton({ addedPost }) {
  const [openModal, setOpenModal] = useState(false);

  const click = () => {
    setOpenModal(!openModal);
  }

  return (
    <>
      <Button sx={{ m: 5 }} onClick={() => { click() }}>Create post</Button>
      {openModal && <PostWidget
        addedPost={() => {
          setOpenModal(false);
          addedPost();
        }}
        close={() => { click() }}
      />}
    </>
  );
}