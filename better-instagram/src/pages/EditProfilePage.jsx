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
import Stack from '@mui/material/Stack';
import { useState, useRef } from 'react';

export function EditProfilePage ({ close }) {
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
                            <Button sx={{ color: '#464646', bgcolor: 'transparent',  '&:hover': { bgcolor: '#bfbfbf' }}}
                                onClick={deleteImage}
                            >Remove Photo</Button>
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
                            value={inputs.name}
                            onChange={(e) => setInputs({...inputs, name: e.target.value})}
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
                        onClick={handleEditProfile}>
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

export default function EditProfilePageButton({ addedPost }) {
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

