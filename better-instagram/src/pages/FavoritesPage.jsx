import { useState, useEffect } from "react";
import Stack from "@mui/joy/Stack";
import HomePageWidget from "../components/Home/HomePageWidget";
import { styled } from "@mui/joy/styles";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import NavBar from "../components/NavBar/NavBar";
import { firestore } from '../firebase/firebase';
import { collection, getDocs, getDoc, doc, query, where } from 'firebase/firestore'
import {
  getStorage,
  ref,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import useAuthStore from "../store/authStore";


const Item = styled("div")(({ theme }) => ({
  ...theme.typography["body-sm"],
  textAlign: "center",
  fontWeight: theme.fontWeight.md,
  color: theme.vars.palette.text.secondary,
  border: "1px solid",
  borderColor: theme.palette.divider,
  padding: theme.spacing(2),
  borderRadius: theme.radius.md,
}));

const FavoritesPage = () => {
  // Define an array of user data (for demonstration purposes) **not used right now
  
  const[favoritesList, setFavoritesList] = useState([]);
  const[favoriteUsersList, setFavoriteUsersList] = useState([]);
  const favoritesCollectionRef = collection(firestore, 'favoritedprofiles')
  const[newFavoriteUsersList, setNewFavoriteUsersList] = useState([]);
  const [userWithImageList, setUserWithImageList] = useState([]) //List of users with profile pictures loaded
 
  const personaluid = useAuthStore((state) => state.user()?.uid); //get the personal uid
  //console.log(personaluid)

  
  useEffect(() => {
    const fetchFavorites = async () => {
        try {
            const favoritesData = await getDocs(collection(firestore, 'favoritedprofiles'));
            const favorites = favoritesData.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setFavoritesList(favorites);
        } catch (error) {
            console.error('Error fetching favorites:', error);
        }
    };

    fetchFavorites();
}, []);


useEffect(() => {
  const fetchFavoriteUsers = async () => {
    try {

      if (!personaluid) {
        return; // Exit early if personaluid is undefined
      }
      // Construct a query to get favorited profiles for the current user
      const q = query(
        collection(firestore, "favoritedprofiles"),
        where("personaluid", "==", personaluid)
      );
      const querySnapshot = await getDocs(q);
      
      let favoriteUsers = [];
      // Iterate through the query snapshot to extract favorited profiles
      querySnapshot.forEach((doc) => {
        
        const data = doc.data();
        
        // Extract the favorited profile ID (uid) from the document data
        const uid = data.favoriteduid;
        
        //console.log(uid)
        favoriteUsers.push({
          id: doc.id,
          uid: uid,
          ...data,
        });
        console.log(favoriteUsers)
      });
      // Update the state with the favorited profiles
      setFavoriteUsersList(favoriteUsers);
    } catch (error) {
      console.error('Error fetching favorite users:', error);
    }
  };

  //console.log(personaluid);
  fetchFavoriteUsers();
}, [personaluid]);


/*useEffect(() => {
  const fetchTheFavoriteUsers = async() => {
    const newFavoriteUsersList= [];
    try {

        favoriteUsersList.map(async favorite => {
          const userDoc = await getDoc(doc(collection(firestore,'users'), favorite.favoriteduid));
          const filteredUsers = userDoc.data()
          newFavoriteUsersList.push(filteredUsers)
          
        },

        //console.log(newFavoriteUsersList)
      );
    }
    catch (error) {

    }

    setNewFavoriteUsersList(newFavoriteUsersList)
  }
  fetchTheFavoriteUsers();
}, [favoriteUsersList])*/


useEffect(() => {
  const fetchTheFavoriteUsers = async () => {
    try {
      const newFavoriteUsersList = await Promise.all(favoriteUsersList.map(async favorite => {
        const userDoc = await getDoc(doc(collection(firestore, 'users'), favorite.favoriteduid));
        return userDoc.data();
      }));
      setNewFavoriteUsersList(newFavoriteUsersList);
    } catch (error) {
      console.error('Error fetching favorite users:', error);
    }
  };

  fetchTheFavoriteUsers();
}, [favoriteUsersList]);




useEffect(() => {
  //Load in user profile pictures
  const loadImages = async () => {
      const storage = getStorage();
      const newFavUsersList = []; 

      for (const favoriteuser of newFavoriteUsersList) {
          try {
              let url = null;
              if(favoriteuser.profilePicURL){
                url = await getDownloadURL(ref(storage, favoriteuser.profilePicURL));      
              }  
              const newfavUser = {
                  ...favoriteuser,
                  profilePicURL: url 
              };
              newFavUsersList.push(newfavUser);
              //console.log('url', url);
          } catch (error) {
              console.error('Error fetching profile picture for user:', user.id);
          }
      }
      setUserWithImageList(newFavUsersList);
  };

  loadImages();
}, [newFavoriteUsersList]);


console.log(userWithImageList)
  return (
    <>
      <Stack direction="row">
        <NavBar />

        <div className="FavoritesPage">
          <Favorite
            sx={{
              position: "absolute",
              top: "25px",
              right: "25px",
              fontSize: 45,
              color: "black",
            }}
          />
          <>{console.log(userWithImageList.length)}</>
          <Stack spacing={3}>
          {userWithImageList.map(user => (
            <HomePageWidget
            key={user.uid}
            name={user.fullName}
            desc={user.desc}
            major={user.major}
            year={user.year}
            uid={user.uid}
            imageSrc={user.profilePicURL}
            />
          ))}
        </Stack> 
        </div>
      </Stack>
    </>
  );
};

export default FavoritesPage;