import Cards from '../components/Profile/Cards'
import AddPostButton from '../components/Profile/AddPost'
import NavBar from '../components/NavBar/NavBar';
import ProfileDetails from '../components/Profile/ProfileDetails'



function ProfilePage() {
    const addedPost = () => {
        window.location.reload(); 
    }

    return (
        <>
            <NavBar/>
            <ProfileDetails />
            <AddPostButton 
            addedPost={() => {addedPost()}}
            />
            <Cards />
        </>
        
    );
}
export default ProfilePage;

