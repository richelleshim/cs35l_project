import Cards from '../components/Profile/Cards'
import AddPostButton from '../components/Profile/AddPost'



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
