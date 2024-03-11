import * as React from "react";
import useAuthStore from "../../store/authStore";
import EditProfilePage from "../../pages/EditProfilePage";
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
import { useSearchParams } from "react-router-dom";

export default function BottomActionsCard({uid}) {
  let [imgSrc, setImgSrc] = useState("");
  let [userObj, setUserObj] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  let selfUserObj = useAuthStore((state) => state.user());

  useEffect(() => {
    let internalUserObj = userObj;
    //Load in user profile pictures
    const loadUser = async () => {
      let uid = searchParams.get("uid")
      if (uid == null) {
        // load the user's own profile
        internalUserObj = selfUserObj;
      } else {
        // load the uid's profile
        const q = query(collection(firestore, "users"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);

        if(querySnapshot.empty) {
          console.log("user not found");
          internalUserObj = null;
        }
        querySnapshot.forEach((doc) => {
          internalUserObj = doc.data();
        });
      }

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
          width: 250
        }}
      >
        <Avatar src={imgSrc} size="" 
          sx={{
            width: 250,
            height: 250,
          }}
        />
      </Box>
      <Stack 
        direction="column" 
      >
        <Stack sx={{mb: 2}} direction="row" spacing={2}>
          {
            userObj.uid == selfUserObj.uid ?
            <EditProfilePage></EditProfilePage> /* I own this profile */
            : null
          }
          <IconButton variant="outlined" color="neutral">
            <FavoriteBorder />
          </IconButton>
        </Stack>
        <Typography level="h1">{userObj.fullName}</Typography>
        <Typography level="h4">@{userObj.username}</Typography>
        <Typography sx={{mt: 2, mb: 2}}>{userObj.bio}</Typography>
        <Stack direction="row" alignItems="center" spacing={10}>
          <Stack sx={{mt: 1, mb: 0.5}} direction="row" alignItems="center" spacing={1}>
              <BackpackOutlined sx={{ fontSize: 30 }} />
              <Typography>
                  {userObj.major}
              </Typography>
          </Stack>
          <Stack sx={{mt: 0.5, mb: 2}} direction="row" alignItems="center" spacing={1}>
              <SchoolOutlined sx={{ fontSize: 30 }} />
              <Typography>
                  Class of '{userObj.year}
              </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  }</>;
}
