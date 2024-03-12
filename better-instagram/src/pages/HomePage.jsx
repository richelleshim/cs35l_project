import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, Box, Typography } from "@mui/joy";
import NavBar from "../components/NavBar/NavBar";
import HomePageWidget from "../components/Home/HomePageWidget";
import FilterButton from "../components/Home/FilterButton";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getDocs, collection } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import logo from '../../public/bruingram_home.png';

function HomePage() {
  const [usersList, setUsersList] = useState([]);
  const [userWithImageList, setUserWithImageList] = useState([]);
  const [filteredUserList, setFilteredUserList] = useState([]);
  const [nameInput, setNameInput] = useState(''); // New state for searching by name
  const usersCollectionRef = collection(firestore, 'users');
  const navigate = useNavigate();

  useEffect(() => {
    const getUsersList = async () => {
      try {
        const data = await getDocs(usersCollectionRef);
        const users = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id
        }));
        
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
      } catch(err) {
        console.error(err)
      }
    };
    getUsersList();
  }, []);

  useEffect(() => {
    const loadImages = async () => {
      const storage = getStorage();
      const newUsersList = [];
      for (const user of usersList) {
        try {
          let url;
          if (user.profilePicURL) {
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
      setFilteredUserList(newUsersList);
    };
    loadImages();
  }, [usersList]);

  const handleGoToProfile = (uid) => {
    navigate(`/profile?uid=${uid}`)
  };

  const handleSearch = (nameInput, majorInput, gradYearInput) => {
    const filteredUsers = userWithImageList.filter(user => {
      const nameMatch = nameInput === '' || user.fullName.toLowerCase().includes(nameInput.toLowerCase());
      const majorMatch = majorInput === '' || user.major.toLowerCase().includes(majorInput.toLowerCase());
      const yearMatch = gradYearInput === '' || user.year.toString().includes(gradYearInput) || user.year.toString().includes(gradYearInput.slice(-2));
      return nameMatch && majorMatch && yearMatch;
    });
    setFilteredUserList(filteredUsers);
  };

  const handleResetSearch = () => {
    setFilteredUserList(userWithImageList); 
  };

  return (
    <>
      <NavBar />

<img src={logo} style={{height: '180px', marginTop: 30, marginBottom: -20}} />
      
      <FilterButton onSearch={handleSearch} onReset={handleResetSearch} setNameInput={setNameInput} />
      <Box height={50}></Box>
      
      <Stack direction="row">
       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
        {filteredUserList.map((user) => (
          <HomePageWidget
            key={user.id}
            uid={user.id}
            name={user.fullName}
            desc={user.bio}
            major={user.major}
            year={user.year}
            imageSrc={user.profilePicURL}
            postImages={user.postImages || []}
            handleGoToProfile={() => handleGoToProfile(user.id)}
          />
        ))}
        </div>
      </Stack>
      <Box sx={{height:100}}/>
  </>
  );
}

export default HomePage;
