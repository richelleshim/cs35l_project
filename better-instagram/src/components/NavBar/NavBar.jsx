// import React from "react";
// import { useNavigate } from "react-router-dom";
// import Box from "@mui/joy/Box";
// import List from "@mui/joy/List";
// import ListDivider from "@mui/joy/ListDivider";
// import ListItem from "@mui/joy/ListItem";
// import ListItemButton from "@mui/joy/ListItemButton";
// import Home from "@mui/icons-material/Home";
// import Person from "@mui/icons-material/Person";
// import { FavoriteRounded } from "@mui/icons-material";
// import { Stack } from "@mui/joy";

// const NavBar = () => {
//   const navigate = useNavigate();
//   return (
//     <Stack direction="row">
//       <Box component="nav" aria-label="My site" sx={{ flexGrow: 1 }}>
//         <List role="menubar" orientation="horizontal">
//           <Stack direction="row">
//             <ListItem role="none">
//               <ListItemButton
//                 onClick={() => navigate("/home")}
//                 role="menuitem"
//                 component="a"
//                 aria-label="Home"
//               >
//                 <Home />
//               </ListItemButton>
//             </ListItem>
//             <ListDivider />
//             <ListItem role="none">
//               <ListItemButton
//                 onClick={() => navigate("/favorites")}
//                 role="menuitem"
//                 component="a"
//                 aria-label="Favorite"
//               >
//                 <FavoriteRounded />
//               </ListItemButton>
//             </ListItem>
//             <ListDivider />
//             <ListItem role="none">
//               <ListItemButton
//                 onClick={() => navigate("/profile")}
//                 role="menuitem"
//                 component="a"
//                 aria-label="Profile"
//               >
//                 <Person />
//               </ListItemButton>
//             </ListItem>
//           </Stack>
//         </List>
//       </Box>
//     </Stack>
//   );
// };

// export default NavBar;

import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Stack
} from "@mui/joy";
import Box from "@mui/joy/Box";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import Home from "@mui/icons-material/Home";
import Person from "@mui/icons-material/Person";
import { FavoriteRounded } from "@mui/icons-material";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <Stack direction="row" sx={{ width: "100%", height: "100vh" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          position: "fixed", // This makes the navbar fixed
          left: 0, // Stick to the left side
          top: 0, // Stick to the top
          height: "100%", // Full height
          width: "max-content", // Width of the content
          padding: "16px",
          gap: "8px",
          bgcolor: "background.surface",
          zIndex: 1200, // Ensures it's above other content
        }}
      >
        {/* Bruingram Logo */}
        <Box
          onClick={() => navigate("/home")}
          sx={{ "&:hover": { cursor: "pointer" } }}
        >
          <Stack direction="row" spacing={2}>
            <img src="./bruinicon.png" alt="Bruingram" width={40} height={40} />
            <img src="public/Bruingram.png" loading="lazy" alt="" height={50} />
          </Stack>
        </Box>
        <List sx={{ width: "100%" }} role="menubar" orientation="vertical">
          <Stack spacing={3}>
            <ListItem role="none">
              <ListItemButton
                onClick={() => navigate("/home")}
                role="menuitem"
                component="a"
                aria-label="Home"
              >
                <Home />
                <Box component="span" sx={{ marginLeft: "8px" }}>
                  Home
                </Box>
              </ListItemButton>
            </ListItem>
            {/* <ListDivider /> */}
            <ListItem role="none">
              <ListItemButton
                onClick={() => navigate("/favorites")}
                role="menuitem"
                component="a"
                aria-label="Favorite"
              >
                <FavoriteRounded />
                <Box component="span" sx={{ marginLeft: "8px" }}>
                  Favorites
                </Box>
              </ListItemButton>
            </ListItem>
            {/* <ListDivider /> */}
            <ListItem role="none">
              <ListItemButton
                onClick={() => navigate("/profile")}
                role="menuitem"
                component="a"
                aria-label="Profile"
              >
                <Person />{" "}
                <Box component="span" sx={{ marginLeft: "8px" }}>
                  Profile
                </Box>
              </ListItemButton>
            </ListItem>
          </Stack>
        </List>
        ;{/* Navigation List */}
        {/* <List sx={{ width: "100%" }}>
          <ListItemButton onClick={() => navigate("/home")}>
            <Home />
            <Box component="span" sx={{ marginLeft: "8px" }}>
              Home
            </Box>
          </ListItemButton>
          <ListItemButton onClick={() => navigate("/favorites")}>
            <FavoriteRounded />
            <Box component="span" sx={{ marginLeft: "8px" }}>
              Favorites
            </Box>
          </ListItemButton>
          <ListItemButton onClick={() => navigate("/profile")}>
            <AccountCircle />
            <Box component="span" sx={{ marginLeft: "8px" }}>
              Profile
            </Box>
          </ListItemButton>
        </List>
        ; */}
      </Box>

      {/* Rest of the page content */}
      <Box sx={{ flexGrow: 1, bgcolor: "background.default" }}>
        {/* Your page content goes here */}
      </Box>
    </Stack>
  );
};

export default NavBar;
