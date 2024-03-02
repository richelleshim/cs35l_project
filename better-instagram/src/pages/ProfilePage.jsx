import Cards from '../components/Profile/Cards'
import AddPost from '../components/Profile/AddPost'
import ProfileDetails from '../components/Profile/ProfileDetails'


function ProfilePage() {
    return (
        <>
            <ProfileDetails />
            <AddPost />
            <Cards />
        </>
        
    );
}
export default ProfilePage;
