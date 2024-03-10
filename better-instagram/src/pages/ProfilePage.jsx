import Cards from "../components/Profile/Cards";
import AddPostButton from "../components/Profile/AddPost";
import NavBar from "../components/NavBar/NavBar";
import ProfileDetails from "../components/Profile/ProfileDetails";
import { Box, Stack } from "@mui/joy";

function ProfilePage() {
  const addedPost = () => {
    window.location.reload();
  };

  return (
    <>
      <Stack direction="row">
        <NavBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <ProfileDetails />
          <AddPostButton
            addedPost={() => {
              addedPost();
            }}
          />
          <Cards />
        </Box>
      </Stack>
    </>
  );
}
export default ProfilePage;
