import Cards from '../components/Profile/Cards'
import AddPost from '../components/Profile/AddPost'
import NavBar from '../components/NavBar/NavBar';



function ProfilePage() {
    return (
        <>
            <NavBar/>
            <AddPost />
            <Cards />
        </>
        
    );
}
export default ProfilePage;
