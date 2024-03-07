import Cards from '../components/Profile/Cards'
import AddPost from '../components/Profile/AddPost'
import ProfileDetails from '../components/Profile/ProfileDetails'
import { Stack, Box } from "@mui/joy";

function ProfilePage() {
    return (
        <>
            <Box sx={{ pb: 5 }}>
                <img
                src="public/Bruingram.png"
                loading="lazy"
                alt=""
                />
            </Box>
            <ProfileDetails />
            <AddPost />
            <Cards />
        </>
        
    );
}
export default ProfilePage;
