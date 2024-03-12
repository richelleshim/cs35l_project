import * as React from "react";
import useAuthStore from "../../store/authStore";
import EditProfilePage from "../../pages/EditProfilePage";
import AddPostButton from "../../components/Profile/AddPost";
import { Box, Avatar, Stack, Typography, IconButton } from "@mui/joy";
import { useState, useEffect } from 'react';
import {
  getStorage,
  ref,
  getDownloadURL,
} from "firebase/storage";
import { query, collection, where, getDocs } from 'firebase/firestore'
import { firestore } from "../../firebase/firebase";
import { SchoolOutlined, BackpackOutlined, FavoriteBorder } from '@mui/icons-material';

export default function BottomActionsCard({ uid, setProfileDetails }) {
  let [imgSrc, setImgSrc] = useState("");
  let [userObj, setUserObj] = useState({});
  let selfUserObj = useAuthStore((state) => state.user());

  const addedPost = () => {
    window.location.reload();
  };

  useEffect(() => {
    let internalUserObj = userObj;
    //Load in user profile pictures
    const loadUser = async () => {
      // load the uid's profile
      const q = query(collection(firestore, "users"), where("uid", "==", uid));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("user not found");
        internalUserObj = null;
      }
      querySnapshot.forEach((doc) => {
        internalUserObj = doc.data();
      });

      // load profile picture
      const storage = getStorage();
      let url
      if (internalUserObj.profilePicURL) {
        url = await getDownloadURL(ref(storage, internalUserObj.profilePicURL));
      }
      setUserObj(internalUserObj);
      setImgSrc(url);
    };

    loadUser();
    
}, []);

  useEffect(()=>{
    if(userObj){
        setProfileDetails(userObj.username, imgSrc, userObj.uid == selfUserObj.uid)
    }
  }, [userObj])

  return <>{
    (userObj == {} || userObj == null) ?
    <h1>Not logged in, or invalid uid</h1> :
    
    <Stack 
      sx={{mt: 5, mb: 5}}
      direction="row" 
      alignItems="center" 
      justifyContent="center" 
      spacing={5}
    >
      <Box
        sx={{
          width: 225
        }}
      >
        <Avatar src={imgSrc} size="" 
          sx={{
            width: 200,
            height: 200,
          }}
        />
      </Box>
      <Stack 
        direction="column" 
      > 
        <Typography level="h1">{userObj.fullName}</Typography>
        <Typography level="h4">@{userObj.username}</Typography>
        <Typography sx={{mt: 2, mb: 2}}>{userObj.bio}</Typography>
        <Box sx={{width:450}}>
          <Stack direction="row" alignItems="center" spacing={10} sx={{mt: 1, mb: 0.5 }}>
            <Stack direction="row" alignItems="center" spacing={1}>
                <BackpackOutlined sx={{ fontSize: 30 }} />
                <Typography>
                    {userObj.major}
                </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
                <SchoolOutlined sx={{ fontSize: 30 }} />
                <Typography>
                    Class of '{userObj.year}
                </Typography>
            </Stack>
          </Stack>
        </Box>
        
        <Stack sx={{mb: 2, mt: 3}} direction="row" spacing={2}>
          {
            userObj.uid == selfUserObj.uid &&
            <>
            <AddPostButton
            addedPost={() => {
              addedPost();
            }}
            />
            <EditProfilePage></EditProfilePage>
            </>
            
          }
        </Stack>
      </Stack>
    </Stack>
  }</>;
}
