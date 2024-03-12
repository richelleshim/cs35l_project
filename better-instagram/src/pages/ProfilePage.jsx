import Cards from "../components/Profile/Cards";
import NavBar from "../components/NavBar/NavBar";
import ProfileDetails from "../components/Profile/ProfileDetails";
import useAuthStore from "../store/authStore";
import { Box, Stack } from "@mui/joy";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

function ProfilePage() {
  const addedPost = () => {
    window.location.reload();
  };
  const [searchParams, setSearchParams] = useSearchParams();
  let uid = searchParams.get("uid")
  if (uid == null) {
    // use self user id
    let selfUserObj = useAuthStore((state) => state.user());
    uid = selfUserObj.uid;
  }

  const [username, setUsername] = useState('');
  const [profilePictureUrl, setProfilePictureUrl] = useState('');
  const [isInternalUser, setInternalUser] = useState(false)

  const getProfileDetails =(username, profilePictureUrl, isInternalUser)=>{
      setUsername(username)
      setProfilePictureUrl(profilePictureUrl)
      setInternalUser(isInternalUser)
  }

  return (
    <>
      <ProfileDetails uid={uid} setProfileDetails={getProfileDetails}/>
      <Stack direction="row">
        <NavBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Cards uid={uid} username={username} profilePictureUrl={profilePictureUrl} isInternalUser={isInternalUser}/>
        </Box>
      </Stack>
      <Box sx={{height:100}}/>
    </>
  );
}
export default ProfilePage;