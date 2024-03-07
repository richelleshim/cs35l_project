import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import Home from '@mui/icons-material/Home';
import Person from '@mui/icons-material/Person';
import { FavoriteRounded } from '@mui/icons-material';

const NavBar = () => {
   const navigate = useNavigate();
   return( 
   <Box component="nav" aria-label="My site" sx={{ flexGrow: 1 }}>
   <List role="menubar" orientation="horizontal">
     <ListItem role="none"> 
       <ListItemButton onClick={()=>navigate('/home')}
         role="menuitem"
         component="a"
         href="#horizontal-list"
         aria-label="Home"
       >
         <Home />
       </ListItemButton>
     </ListItem>
     <ListDivider />
     <ListItem role="none">
     <ListItemButton onClick={()=>navigate('/favorites')}
         role="menuitem"
         component="a"
         href="#horizontal-list"
         aria-label="Favorite"
       >
         <FavoriteRounded />
       </ListItemButton>
     </ListItem>
     <ListDivider />
     <ListItem role="none">
     <ListItemButton onClick={()=>navigate('/profile')}
         role="menuitem"
         component="a"
         href="#horizontal-list"
         aria-label="Profile"
       >
         <Person />
       </ListItemButton>
     </ListItem>
   </List>
 </Box>
   );
}

export default NavBar