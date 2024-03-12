import React, { useState } from "react";
import Home from "@mui/icons-material/Home";
import FavoriteIcon from '@mui/icons-material/Favorite';
import Person from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  ListItem,
  ListItemButton,
  Paper,
  Stack,
} from "@mui/material";
import useLogout from "../../hooks/logout";

export function NavBar() {
  // const [selected, setSelected] = useState("/home");
  const navigate = useNavigate();
  const logout = useLogout();
  const handleChange = (newRoute) => {
    navigate(newRoute);
    setValue(newRoute);
  };

  // const [value, setValue] = React.useState(0);
  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };
  const [value, setValue] = React.useState("/home");

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  return (
    <Paper
      sx={{ 
        position: "fixed",
        bottom: 0, 
        left: 0, 
        right: 0, 
        zIndex: 9999, 
        height: 80, 
        border: "1px solid #e0e0e0",
        display: "flex",
        justifyContent: "center", 
        alignItems: "center" }}
      elevation={3}
    >
      <Stack direction="row" justifyContent="center" alignContent='center'>
   
        <BottomNavigation
          showLabels
          value={value}
          sx={{ width: 500 }}
          onChange={handleChange}
        >
          
          <BottomNavigationAction
            value="/favorites"
            icon={<FavoriteIcon style={{color: "#000000", fontSize:36}}/>}
            onClick={() => handleChange("/favorites")}
          />

          <BottomNavigationAction
            value="/home"
            icon={<Home style={{color: "#000000", fontSize:40}}/>}
            onClick={() => handleChange("/home")}
          />

          <BottomNavigationAction
            value="/profile"
            icon={<Person style={{color: "#000000", fontSize:40}}/>}
            onClick={() => handleChange("/profile")}
          />
        </BottomNavigation>

        <Button onCLick={logout}>Logout</Button>
      </Stack>
    </Paper>
  );
}

export default NavBar;
