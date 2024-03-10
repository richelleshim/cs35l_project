import {
    Button,
    Box, FormControl,
    FormLabel,
    Input,
    Avatar,
    Modal,
    Textarea,
    Divider
} from '@mui/joy';
import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import Stack from '@mui/material/Stack';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable
} from "firebase/storage";

export function EditProfilePage ({ close }) {

  const navigate = useNavigate();
    let userObj = useAuthStore((state) => state.user());
    if (userObj == null) {
        return <h1>Not Logged In</h1>;
    }
    const [inputs, setInputs] = useState({
        fullName: userObj.fullName,
        username: userObj.username,
        bio: userObj.bio,
        major: userObj.major,
        year: userObj.year

    });

    const [imgSrc, setImgSrc] = useState('')
    const fileRef = useRef(null);

    const updateImage = async (e) => {
        const file = e.target.files[0]

        if (file) {
            // set image id of the post to the post id
            let imageId = userObj.uid
            const userRef = doc(firestore, 'users', userObj.uid)
            let profilePicURL = `profilePictures/${imageId}.png`;
            updateDoc(userRef, {profilePicURL: profilePicURL });

            // Create the file metadata
            /** @type {any} */
            const metadata = {
                contentType: 'image/png'
            };

            const storage = getStorage();
            const storageRef = ref(storage, `profilePictures/${imageId}.png`);
            const uploadTask = uploadBytesResumable(storageRef, file, metadata);
            setImgSrc(profilePicURL);
            const docSnap = await getDoc(userRef);
            localStorage.setItem("user-info", JSON.stringify(docSnap.data()));
            window.location.reload();
            console.log("done");
        }
    };

    const deleteImage =()=>{
        setImgSrc('')
        fileRef.current.value = ''
    }

    useEffect(() => {
        let internalUserObj = userObj;
        //Load in user profile pictures
        const loadUser = async () => {
            // load profile picture
            const storage = getStorage();
            let url
            if (internalUserObj.profilePicURL) {
                url = await getDownloadURL(ref(storage, internalUserObj.profilePicURL));
            }
            setImgSrc(url);
        };

        loadUser();
    }, []);
    
    const handleSaveChanges = async()=>{
        const userDocRef = doc(firestore, 'users', userObj.uid)

        const updatedUser = {
            fullName: inputs.fullName, 
            username: inputs.username,
            bio: inputs.bio,
            major: inputs.major,
            year: inputs.year,
        }

        await updateDoc(userDocRef, updatedUser);

        const docSnap = await getDoc(userDocRef);
        localStorage.setItem("user-info", JSON.stringify(docSnap.data()));
        window.location.reload();
        close();
    }

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
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                p: 8
            }}
        >
            <Stack 
                direction="column" 
                spacing={2}
            >
                <FormControl id="userPhoto">
                    <Stack direction='row' justifyContent="center" spacing={6} sx={{mb: 2}}>
                        <Box display="flex" justifyContent='center'>
                            <Avatar src={imgSrc} sx={{ width: 150, height: 150}}/>
                        </Box>
                        <Stack direction={'column'} justifyContent="center" spacing={1}>
                            <Button onClick={() => fileRef.current.click()} variant="outlined" color="neutral">Change Photo</Button>
                            <input type="file" ref={fileRef} style={{ display: 'none' }} onChange={updateImage}/>
                        </Stack>
                    </Stack>
                </FormControl>

                <Stack direction={'row'} justifyContent="center" spacing={1}>
                    <FormControl id="Username" required>
                        <FormLabel>Username</FormLabel>
                        <Input 
                            placeholder="Username" 
                            value={`@${inputs.username}`}
                            onChange={(e) => setInputs({...inputs, username: e.target.value.substring(1,e.target.value.length)})}
                        />
                    </FormControl>
                    <FormControl id="Name" required>
                        <FormLabel>Name</FormLabel>
                        <Input 
                            placeholder="Name" 
                            value={inputs.fullName}
                            onChange={(e) => setInputs({...inputs, fullName: e.target.value})}
                        />
                    </FormControl>
                </Stack>

                <Divider />

                <FormControl id="bio">
                <FormLabel>Bio</FormLabel>
                    <Textarea
                        placeholder='Write a long bio here...'
                        value={inputs.bio}
                        minRows={3}
                        maxRows={3}
                        onChange={(e) => setInputs({...inputs, bio: e.target.value})}
                    />
                </FormControl>

                <FormControl id="major" required>
                <FormLabel>Major</FormLabel>
                    <Input
                        placeholder="Major"
                        value={inputs.major}
                        onChange={(e) => setInputs({...inputs, major: e.target.value})}
                    />
                </FormControl>

                <FormControl id="year" required>
                <FormLabel>Year</FormLabel>
                    <Input
                        placeholder="Year"
                        value={inputs.year}
                        onChange={(e) => setInputs({...inputs, year: e.target.value})}
                    />
                </FormControl>

                <Stack direction='row' spacing={2} sx={{pt: 2}}>
                    <Button
                        onClick={handleSaveChanges}>
                        Save changes
                    </Button>
                    <Button variant="outlined" color="neutral" onClick={close}>
                        Cancel
                    </Button>
                </Stack>
            </Stack>
        </Box>
    </Modal>;
    
}

export default function EditProfilePageButton({ inputs }) {
  const [openModal, setOpenModal] = useState(false);

  const click = () => {
    setOpenModal(!openModal);
  }

  return (
    <>
      <Button 
        sx={{ m: 5 }} 
        onClick={() => { click() }}
        variant="outlined" color="neutral"
      >Edit profile</Button>
      {openModal && <EditProfilePage
        close={() => { click() }}
      />}
    </>
  );
}

