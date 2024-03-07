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
import { storage, ref, getDownloadURL } from "firebase/storage";

const EditProfilePage =()=>{
    const [inputs, setInputs] = useState({
        name: '',
        username: '',
        bio: '',
        major: '',
        year: ''

    })
    const [imgSrc, setImgSrc] = useState('')
    const fileRef = useRef(null);

    const updateImage = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()

        reader.onloadend =()=>{
            setImgSrc(reader.result)
        }
        reader.readAsDataURL(file)
    };

    const deleteImage =()=>{
        setImgSrc('')
        fileRef.current.value = ''
    }

    const[isUpdating, setIsUpdating] = useState(false)
    
    const handleEditProfile = async()=>{
        console.log('submit')
        /*
        if(isUpdating) return
        setIsUpdating(true)

        const storageRef = ref(storage, 'profilePics/${userIDpath}')
        const userDocRef = doc(firestore, 'profiles', userID)

        let URL = ''
        try{
            if(imgSrc){
                await uploadString(storageRef, imgSrc, 'data_url')
                URL = await getDownloadURL(ref(storage, 'profilePics/${userIDpath}'))
            }

            const updatedUser = {
                ...authUser,
                name: inputs.name || ogName, 
                username: inputs.username || ogUsername,
                bio: inputs.bio || ogBio,
                profilePicURL: URL || ogprofilepic,
            }

            await updateDoc(userDocRef, updatedUser)

        } catch(error){

        }*/
    }

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
                            <Button sx={{ color: '#464646', bgcolor: 'transparent',  '&:hover': { bgcolor: '#bfbfbf' }}}
                                onClick={deleteImage}
                            >Remove Photo</Button>
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

