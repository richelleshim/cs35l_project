import React, { useState, Fragment } from "react";
import Box from "@mui/joy/Box";
import Drawer from "@mui/joy/Drawer";
import List from "@mui/joy/List";
import ListItemButton from "@mui/joy/ListItemButton";
import Typography from "@mui/joy/Typography";
import ModalClose from "@mui/joy/ModalClose";
import { ListDivider, ListItem, Stack } from "@mui/joy";
import { FavoriteRounded, Home, Person } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function Logo() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <Fragment sx={{ pt: "10nppx" }}>
      <Box
        onClick={() => setOpen(true)}
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
      <Drawer open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            ml: "auto",
            mt: 1,
            mr: 2,
          }}
        >
          <Typography
            component="label"
            htmlFor="close-icon"
            fontSize="sm"
            fontWeight="lg"
            sx={{ cursor: "pointer" }}
          >
            Close
          </Typography>
          <ModalClose id="close-icon" sx={{ position: "initial" }} />
        </Box>

        <List
          size="lg"
          component="nav"
          sx={{
            flex: "none",
            fontSize: "xl",
            "& > div": { justifyContent: "center" },
          }}
          role="menubar"
        >
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
      </Drawer>
    </Fragment>
  );
}