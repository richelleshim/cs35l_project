// import homepagewidget
import HomePageWidget from "../components/Home/HomePageWidget";

// import from MUI
import { Stack } from "@mui/joy";
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
  //const navigate = useNavigate();
  

  useEffect(()=>{ 
    //Get list of all users
    const getUsersList= async () => {
      try{
        const data = await getDocs(usersCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id
      }))
        setUsersList(filteredData);
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
    
const handleGoToProfile =()=>{
  console.log('click')
  //navigate("/profile")
}

  return (
    <>
      <Stack direction="row">
        <NavBar />

     
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                
                {userWithImageList.map((user) => (
                    
                      <HomePageWidget
                        key={user.id}
                        name={user.fullName}
                        desc={user.bio}
                        major={user.major}
                        uid = {user.uid}
                        year={user.year}
                        imageSrc={user.profilePicURL}
                        handleGoToProfile={handleGoToProfile}
                      />  
                    
                ))}
              </div>
      </Stack>
    </>
  );
}

export default HomePage;
