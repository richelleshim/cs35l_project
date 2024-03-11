// import homepagewidget
import HomePageWidget from "../components/Home/HomePageWidget";
import FilterButton from "../components/Home/FilterButton";

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
import { useNavigate } from "react-router-dom";

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
    
const handleGoToProfile =(uid)=>{
  console.log('click')
  navigate(`/profile?uid=${uid}`)
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
                        year={user.year}
                        imageSrc={user.profilePicURL}
                        handleGoToProfile={() => handleGoToProfile(user.id)}
                      />  
                    
                ))}
              </div>
      <Stack>
        <FilterButton />
      </Stack>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          pb: 5,
          pt: 5, // Add a left margin to the content based on the navbar's width
        }}
      >
        <Stack direction="column" alignItems="flex-start" spacing={3}>
          <Stack
            direction="row"
            spacing={3}
            alignItems="flex-start"
            justifyContent="center"
          >
            <HomePageWidget
              name="Daniel Fenex"
              desc="Likes cats."
              major="Computer Science"
              year="25"
              imageSrc="daniel"
            />
            <HomePageWidget
              name="Jennifer Lee"
              desc="I don't think YRL is good."
              major="Cognitive Science"
              year="26"
              imageSrc="jennifer"
            />
          </Stack>
          <Stack
            direction="row"
            spacing={3}
            alignItems="flex-start"
            justifyContent="center"
          >
            <HomePageWidget
              name="Richelle Shim"
              desc="Hates dogs."
              major="Chicano Studies"
              year="26"
              imageSrc="richelle"
            />
            <HomePageWidget
              name="Michael J. Jordan"
              desc="Takes things personally."
              major="Chemical Sciences"
              year="24"
              imageSrc="mjj"
            />
          </Stack>
          <Stack
            direction="row"
            spacing={3}
            alignItems="flex-start"
            justifyContent="center"
          >
            <HomePageWidget
              name="Michael B. Jordan"
              desc='"Whats ur number bb"'
              major="Colorado Studies"
              year="26"
              imageSrc="mjb"
            />
            <HomePageWidget
              name="Chai Chai"
              desc="I eat hamburgers."
              major="Cantonese Studies"
              year="26"
              imageSrc="chai"
            />
          </Stack>
          <Stack
            direction="row"
            spacing={3}
            alignItems="flex-start"
            justifyContent="center"
          >
            <HomePageWidget
              name="Elizabeth Moh"
              desc="👍"
              major="Calligraphy Sciences"
              year="26"
              imageSrc="elizabeth"
            />
          </Stack>
        </Stack>
      </Box>
    </>
  );
}

export default HomePage;
