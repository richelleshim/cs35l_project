// import homepagewidget
import HomePageWidget from "../components/Home/HomePageWidget";
import FilterButton from "../components/Home/FilterButton";
import { useNavigate } from 'react-router-dom';

// import from MUI
import { Stack, Box } from "@mui/joy";
import NavBar from "../components/NavBar/NavBar";
import {
  getStorage,
  ref,
  getDownloadURL,
} from "firebase/storage";
import { getDocs, collection} from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import { useState, useEffect } from 'react'
//import FilterButton from "../components/Home/FilterButton";

function HomePage() {
  const [usersList, setUsersList] = useState([])
  const [userWithImageList, setUserWithImageList] = useState([]) //List of users with profile pictures loaded
  const usersCollectionRef = collection(firestore, 'users')
  const navigate = useNavigate();
  

  useEffect(()=>{ 
    //Get list of all users
    const getUsersList= async () => {
      try{
        const data = await getDocs(usersCollectionRef);
        const users = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id
        }))

        // load the post previews
        const q = collection(firestore, "posts");
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(async (doc) => {
          let post = doc.data()
            for (let i = 0; i < users.length; i++) {
              if (!users[i].postImages) {
                users[i].postImages= [];
              }
              if (users[i].uid === post.userId) {
                users[i].postImages.push(post.image);
              }
            }
        });

        setUsersList(users);
      } catch(err){
        console.error(err)
      }
    };

    getUsersList();
  }, []);

  useEffect(() => {
    //Load in user profile pictures
    const loadImages = async () => {
        const storage = getStorage();
        const newUsersList = []; 

        for (const user of usersList) {
            try {
                let url
                if(user.profilePicURL){
                  url = await getDownloadURL(ref(storage, user.profilePicURL));      
                }  
                const newUser = {
                    ...user,
                    profilePicURL: url 
                };
                newUsersList.push(newUser);
            } catch (error) {
                console.error('Error fetching profile picture for user:', user.id);
            }
        }
        setUserWithImageList(newUsersList);
    };

    loadImages();
}, [usersList]);
    
const handleGoToProfile =(uid)=>{
  console.log('click')
  navigate(`/profile?uid=${uid}`)
}
  return (
    <>
      <NavBar />
      <FilterButton />
      <Stack direction="row">
       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>

        {userWithImageList.map((user) => (

        <HomePageWidget
          key={user.id}
          name={user.fullName}
          desc={user.bio}
          major={user.major}
          year={user.year}
          uid={user.uid}
          imageSrc={user.profilePicURL}
          postImages={user.postImages || []}
          handleGoToProfile={() => handleGoToProfile(user.id)}
        />

      ))}
    </div>
  </Stack>;
  </>
  );
}

export default HomePage;
