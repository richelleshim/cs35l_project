import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/joy/Box";
import List from "@mui/joy/List";
import ListDivider from "@mui/joy/ListDivider";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import { FavoriteRounded, Person, Home } from "@mui/icons-material";
import { Stack } from "@mui/joy";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <Box component="nav" aria-label="My site" sx={{ flexGrow: 1 }}>
      <Box
        onClick={() => navigate("/home")}
        sx={{ "&:hover": { cursor: "pointer" } }}
      >
        <Stack direction="row" spacing={2}>
          <img src="./bruinicon.png" alt="Bruingram" width={40} height={40} />
          <Box>
            <img
              src="public/Bruingram.png"
              loading="lazy"
              alt=""
              // height={xs:}
            />
          </Box>
        </Stack>
      </Box>
      <List role="menubar">
        <Stack direction="column">
          <ListItem role="none">
            <ListItemButton
              onClick={() => navigate("/home")}
              role="menuitem"
              component="a"
              aria-label="Home"
            >
              <Home /> Home
            </ListItemButton>
          </ListItem>
          <ListDivider />
          <ListItem role="none">
            <ListItemButton
              onClick={() => navigate("/favorites")}
              role="menuitem"
              component="a"
              aria-label="Favorite"
            >
              <FavoriteRounded /> Favorites
            </ListItemButton>
          </ListItem>
          <ListDivider />
          <ListItem role="none">
            <ListItemButton
              onClick={() => navigate("/profile")}
              role="menuitem"
              component="a"
              aria-label="Profile"
            >
              <Person /> Profile
            </ListItemButton>
          </ListItem>
        </Stack>
      </List>
    </Box>
  );
};

export default NavBar;
