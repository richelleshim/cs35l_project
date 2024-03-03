import Cards from '../components/Profile/Cards'
import AddPost from '../components/Profile/AddPost'
import NavBar from '../components/NavBar/NavBar';
import ProfileDetails from '../components/Profile/ProfileDetails'



function ProfilePage() {
    return (
        <>
            <NavBar/>
            <ProfileDetails />
            <AddPost />
            <Cards />
        </>
        
    );
}
export default ProfilePage;
