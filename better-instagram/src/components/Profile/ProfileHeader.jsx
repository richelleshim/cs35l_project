import { useState } from 'react'
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Box from '@mui/joy/Box';
import { styled } from '@mui/joy/styles';
import { AspectRatio, Card, CardContent, Typography, Sheet, IconButton } from '@mui/joy';
import { FavoriteRounded, FavoriteBorderRounded, SchoolOutlined, BackpackOutlined } from '@mui/icons-material';

//styling for the Bruinstagram title but change later
const Title = styled('h2')({
  fontFamily: 'Lobster, cursive',
  fontWeight: 'bold',
  textAlign: 'center',
  marginTop: '10px', // Adjust as needed
  color: 'black',
});

const UserCard = ({ user }) => {
  const { name, major, year, imageUrl } = user;
  

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
       // width: '120%',
        minWidth: '500px',
        maxWidth: '800px',
        mb: 2,
        p: 2,
      }}
    >
  

      <AspectRatio flex ratio="16/9" sx={{ minWidth: 200, maxWidth: 300 }}>
        <img src={imageUrl} loading="lazy" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </AspectRatio>
      <CardContent sx={{ flex: 1 }}>
        <Typography fontSize="xl" fontWeight="lg">
          {name}
        </Typography>
        <Typography level="body-sm" fontWeight="lg" textColor="text.tertiary">
          {major}
        </Typography>
        <Typography level="body-sm" fontWeight="lg" textColor="text.tertiary">
          {year}
        </Typography>
      </CardContent>
    </Card>
  );
};

const Item = styled('div')(({ theme }) => ({
  ...theme.typography['body-sm'],
  textAlign: 'center',
  fontWeight: theme.fontWeight.md,
  color: theme.vars.palette.text.secondary,
  border: '1px solid',
  borderColor: theme.palette.divider,
  padding: theme.spacing(2),
  borderRadius: theme.radius.md,
}));


const ProfileHeader = () => {

  // Manual user data for now
  const users = [
    {
      name: 'Happy Name',
      major: 'Theater Studies',
      year: 'Class of 26', 
      imageUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286',
    },
    // Add more user data as needed
  ];

  return (
    <div className="ProfileHeader">
    
       <Title>Bruinstagram</Title>


          {users.map((user, index) => (
          <UserCard key={index} user={user} />
        ))}
    </div>
  );
};

export default ProfileHeader;



