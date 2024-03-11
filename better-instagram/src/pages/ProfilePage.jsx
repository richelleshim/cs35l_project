import Cards from "../components/Profile/Cards";
import AddPostButton from "../components/Profile/AddPost";
import NavBar from "../components/NavBar/NavBar";
import ProfileDetails from "../components/Profile/ProfileDetails";
import { Box, Stack } from "@mui/joy";
import { useSearchParams } from "react-router-dom";

function ProfilePage() {
  const addedPost = () => {
    window.location.reload();
  };
  const [searchParams, setSearchParams] = useSearchParams();
  let uid = searchParams.get("uid")

  return (
    <>
      <Stack direction="row">
        <NavBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <ProfileDetails uid={uid} />
          <AddPostButton
            addedPost={() => {
              addedPost();
            }}
          />
          <Cards uid={uid} />
        </Box>
      </Stack>
    </>
  );
}
export default ProfilePage;
