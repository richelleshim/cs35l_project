import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import NavBar from '../components/NavBar/NavBar';
import FilterButton from '../components/Home/FilterButton';
import HomePageWidget from '../components/Home/HomePageWidget';
import { Stack } from '@mui/joy';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [usersList, setUsersList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getUsersList = async () => {
      try {
        const data = await getDocs(collection(firestore, 'users'));
        const userListData = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setUsersList(userListData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    getUsersList();
  }, []);

  const handleSearch = (major, gradYear) => {
    // Implement your search logic here
    const filteredUsers = usersList.filter(user => {
      const majorMatch = user.major.toLowerCase().includes(major.toLowerCase());
      const yearMatch = user.year.toString() === gradYear.toString();
      return majorMatch && yearMatch;
    });
    // Update the state with filtered users
    setUsersList(filteredUsers);
  };

  const handleGoToProfile = (uid) => {
    navigate(`/profile?uid=${uid}`);
  };

  return (
    <>
      <NavBar />
      <FilterButton onSearch={handleSearch} />
      <Stack direction="row">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
          {usersList.map((user) => (
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
      </Stack>
    </>
  );
}

export default HomePage;
