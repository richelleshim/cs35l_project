import {
    Button,
    Box,
    Typography,
    FormControl,
    FormLabel,
    Input,
    Avatar,
    IconButton,
    Grid,
    Modal
  } from '@mui/joy';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useRef } from 'react';
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const EditProfilePage =()=>{
    const [inputs, setInputs] = useState({
        name: '',
        username: '',
        bio: '',
        major: '',
        year: ''

    })
    const [imgSrc, setImgSrc] = useState('');

    // load the image based off of the image key
    const updateImage = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()

        reader.onloadend =()=>{
            setImgSrc(reader.result)
        }
        reader.readAsDataURL(file)
    };


    //const authUser = useAuthStore((state) => state.user)
    //useGetUserProfileByUsername ??

    /**/
    console.log(imgSrc)

    const handleEditProfile =()=>{
        console.log(inputs)
    }

    const fileRef = useRef(null)

    return(
        <>
            <Box
            sx={{
                bgcolor: '#FFFFFF',
                borderRadius: 10,
                p: 1.5,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
                <FormControl id="userPhoto">
                    <Stack direction={['column', 'row']} spacing={6}>
                        <Box display="flex" justifyContent='center'>
                            <Avatar src={imgSrc} sx={{ width: 100, height: 100}}/>
                        </Box>
                        <Stack direction={'column'}>
                            <Button onClick={() => fileRef.current.click()}>Change Photo</Button>
                            <Button sx={{ color: '#464646', bgcolor: 'transparent',  '&:hover': { bgcolor: '#bfbfbf' }}}>Remove Photo</Button>
                            <input type="file" ref={fileRef} style={{ display: 'none' }} onChange={updateImage}/>
                        </Stack>
                        
                    </Stack>
                </FormControl>

                <FormControl id="userName" required>
                    <FormLabel>Username</FormLabel>
                    <Input 
                        placeholder="Username" 
                        value={inputs.username}
                        /*value={inputs.username || authUser.username}*/
                        onChange={(e) => setInputs({...inputs, username: e.target.value})}
                    />
                </FormControl>

                <FormControl id="Name" required>
                    <FormLabel>Name</FormLabel>
                    <Input 
                        placeholder="Name" 
                        value={inputs.name}
                        onChange={(e) => setInputs({...inputs, name: e.target.value})}
                    />
                </FormControl>

                <FormControl id="bio">
                <FormLabel>Bio</FormLabel>
                    <Input
                        placeholder="Bio"
                        value={inputs.bio}
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

                <Stack direction={['column', 'row']} spacing={2}>
                    <Button>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleEditProfile}>
                        Save changes
                    </Button>
                </Stack>
            </Box>
        </>
    )
}
export default EditProfilePage

