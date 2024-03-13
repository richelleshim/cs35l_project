import { Box, Button, Modal, Textarea, Typography } from '@mui/joy';
import { useRef, useState } from 'react';
import { firestore } from '../../firebase/firebase';
import { setDoc, addDoc, collection, serverTimestamp, } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";
import useAuthStore from "../../store/authStore";
import AddIcon from '@mui/icons-material/Add';


const storage = getStorage();

export function PostWidget({ close, addedPost }) {
  const [selectedFileURL, setSelectedFileURL] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [caption, setCaption] = useState("");
  const inputRef = useRef(null);

  let userObj = useAuthStore((state) => state.user());
  if (userObj == null) {
      return <h1>Not Logged In</h1>;
  }

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
      userId: userObj.uid, 
      timestamp: serverTimestamp() //time of posting
    });
    console.log('hello')
    // set image id of the post to the post id
    let imageId = postRef.id
    setDoc(postRef, { image: `images/${imageId}.png` }, { merge: true });

    // Create the file metadata
    /** @type {any} */
    const metadata = {
      contentType: 'image/png'
    };

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
      (error) => {},
      () => {
        addedPost();
        console.log("gg")
        console.log("gg")
        window.location.reload();
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
        height:500,
        p: 1.5,
        width: '60vh',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: -10
      }}
    >
      <Typography level="h4" sx={{mt:1.5}}>
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
          
          {/*File selection window*/}
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
            <Button variant="outlined" color="neutral" onClick={() => inputRef.current.click()} >Add image</Button>
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
          <Button 
            sx={{ mt: 3, width: 100, mr: 2}} onClick={() => post()}>Post!</Button>
        }
        <Button sx={{ mt: 3, width: 100 }} variant="outlined" color="neutral" onClick={close}>
          Cancel
        </Button>
        
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
      <Button variant="outlined" color="neutral" sx={{ m: 5 }} onClick={() => { click() }}>
        Create post
        <AddIcon/>
      </Button>
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