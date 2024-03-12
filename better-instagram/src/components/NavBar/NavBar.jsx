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
import useLogout from "../../hooks/logout";

export default function DrawerMobileNavigation() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const logout = useLogout();
  return (
    <Fragment>
      <Box
        onClick={() => setOpen(true)}
        sx={{ "&:hover": { cursor: "pointer" } }}
      >
        <Stack direction="row" spacing={1}>
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

          <ListItem>
            <ListItemButton
            onClick={logout}
            > Testing Logout </ListItemButton>
          </ListItem>
        
            
          </Stack>
        </List>
      </Drawer>
    </Fragment>
  );
}

{
  /* <IconButton
variant="outlined"
color="neutral"
onClick={() => setOpen(true)}
>
<Menu />
</IconButton> */
}
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import Box from "@mui/joy/Box";
// import Drawer from "@mui/joy/Drawer";
// import List from "@mui/joy/List";
// import ListItemButton from "@mui/joy/ListItemButton";
// import Typography from "@mui/joy/Typography";
// import ModalClose from "@mui/joy/ModalClose";
// import { ListDivider, ListItem, Stack } from "@mui/joy";
// import { FavoriteRounded, Home, Person } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";

// export default function DrawerMobileNavigation() {
//   const [open, setOpen] = useState(false);
//   const navigate = useNavigate();

//   return (
//     <Fragment>
//       <Box
//         onClick={() => setOpen(true)}
//         sx={{ "&:hover": { cursor: "pointer" } }}
//       >
//         <Stack direction="row" spacing={2}>
//           <img src="./bruinicon.png" alt="Bruingram" width={40} height={40} />
//           <Box>
//             <img
//               src="public/Bruingram.png"
//               loading="lazy"
//               alt=""
//               // height={xs:}
//             />
//           </Box>
//         </Stack>
//       </Box>
//       <Drawer open={open} onClose={() => setOpen(false)}>
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             gap: 0.5,
//             ml: "auto",
//             mt: 1,
//             mr: 2,
//           }}
//         >
//           <Typography
//             component="label"
//             htmlFor="close-icon"
//             fontSize="sm"
//             fontWeight="lg"
//             sx={{ cursor: "pointer" }}
//           >
//             Close
//           </Typography>
//           <ModalClose id="close-icon" sx={{ position: "initial" }} />
//         </Box>

//         <List
//           size="lg"
//           component="nav"
//           sx={{
//             flex: "none",
//             fontSize: "xl",
//             "& > div": { justifyContent: "center" },
//           }}
//           role="menubar"
//         >
//           <Stack direction="column">
//             <ListItem role="none">
//               <ListItemButton
//                 onClick={() => navigate("/home")}
//                 role="menuitem"
//                 component="a"
//                 aria-label="Home"
//               >
//                 <Home /> Home
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
//                 <FavoriteRounded /> Favorites
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
//                 <Person /> Profile
//               </ListItemButton>
//             </ListItem>
//           </Stack>
//         </List>
//       </Drawer>
//     </Fragment>
//   );
// }

// {
//   /* <IconButton
// variant="outlined"
// color="neutral"
// onClick={() => setOpen(true)}
// >
// <Menu />
// </IconButton> */
// }
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import Box from "@mui/joy/Box";
// import List from "@mui/joy/List";
// import ListDivider from "@mui/joy/ListDivider";
// import ListItem from "@mui/joy/ListItem";
// import ListItemButton from "@mui/joy/ListItemButton";
// import { FavoriteRounded, Person, Home } from "@mui/icons-material";
// import { Stack } from "@mui/joy";

// // const NavBar = () => {
// //   const navigate = useNavigate();
// //   return (
// //     <Box component="nav" aria-label="My site" sx={{ flexGrow: 1 }}>
// //       <Box
// //         onClick={() => navigate("/home")}
// //         sx={{ "&:hover": { cursor: "pointer" } }}
// //       >
// //         <Stack direction="row" spacing={2}>
// //           <img src="./bruinicon.png" alt="Bruingram" width={40} height={40} />
// //           <Box>
// //             <img
// //               src="public/Bruingram.png"
// //               loading="lazy"
// //               alt=""
// //               // height={xs:}
// //             />
// //           </Box>
// //         </Stack>
// //       </Box>
// // <List role="menubar">
// //   <Stack direction="column">
// //     <ListItem role="none">
// //       <ListItemButton
// //         onClick={() => navigate("/home")}
// //         role="menuitem"
// //         component="a"
// //         aria-label="Home"
// //       >
// //         <Home /> Home
// //       </ListItemButton>
// //     </ListItem>
// //     <ListDivider />
// //     <ListItem role="none">
// //       <ListItemButton
// //         onClick={() => navigate("/favorites")}
// //         role="menuitem"
// //         component="a"
// //         aria-label="Favorite"
// //       >
// //         <FavoriteRounded /> Favorites
// //       </ListItemButton>
// //     </ListItem>
// //     <ListDivider />
// //     <ListItem role="none">
// //       <ListItemButton
// //         onClick={() => navigate("/profile")}
// //         role="menuitem"
// //         component="a"
// //         aria-label="Profile"
// //       >
// //         <Person /> Profile
// //       </ListItemButton>
// //     </ListItem>
// //   </Stack>
// // </List>
// //     </Box>
// //   );
// // };

// // export default NavBar;
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// import { FavoriteRounded, Home, Person } from "@mui/icons-material";
// import {
//   BottomNavigation,
//   BottomNavigationAction,
//   Box,
//   ListItem,
//   ListItemButton,
//   Paper,
//   Stack,
// } from "@mui/material";
// import { ListDivider } from "@mui/joy";

// export default function NavBar() {
//   const [homeSelected, setHomeSelected] = useState(false);
//   const [favoriteSelected, setFavoriteSelected] = useState(false);
//   const [profileSelected, setProfileSelected] = useState(false);
//   const [selected, setSelected] = useState("home");

//   const navigate = useNavigate();

//   return (
//     <Paper
//       sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
//       elevation={3}
//     >
//       <Stack direction="row" justifyContent={"center"}>
//         <BottomNavigation showLabels sx={{ width: "100vh" }}>
//           <BottomNavigationAction
//             sx={{
//               minWidth: "70px",
//               color: { ...(selected === "home" ? "primary" : "disabled") },
//             }}
//             label="Home"
//             icon={<Home />}
//             onClick={(() => navigate("/home"), setSelected("home"))}
//           />
//           <BottomNavigationAction
//             sx={{ minWidth: "70px" }}
//             label="Favorites"
//             icon={<FavoriteRounded color="error" />}
//             sx={{
//               minWidth: "70px",
//               color: { ...(selected === "favorites" ? "primary" : "disabled") },
//             }}
//             onClick={(() => navigate("/favorites"), setSelected("favorites"))}
//           />
//           <BottomNavigationAction
//             sx={{
//               minWidth: "70px",
//               color: { ...(selected === "profile" ? "primary" : "disabled") },
//             }}
//             label="Profile"
//             icon={<Person />}
//             onClick={() => navigate("/profile", setSelected("profile"))}
//           />
//         </BottomNavigation>
//       </Stack>
{
  /* 
      <Box sx={{ width: "100vh" }}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            label="Home"
            icon={<Home />}
            onClick={() => navigate("/home")}
          />
          <BottomNavigationAction
            label="Favorites"
            icon={<FavoriteRounded />}
            onClick={() => navigate("/favorites")}
          />
          <BottomNavigationAction
            label="Profile"
            icon={<Person />}
            onClick={() => navigate("/profile")}
          />
        </BottomNavigation> */
}
{
  /* </Box> */
}
//     </Paper>
//   );
// }

// <ListItem role="none">
// <ListItemButton
//   onClick={() => navigate("/home")}
//   role="menuitem"
//   component="a"
//   aria-label="Home"
// >
//   <Stack direction="column" alignContent={"center"}>
//     <Home /> Home
//   </Stack>
// </ListItemButton>
// </ListItem>
// <ListDivider />
// <ListItem role="none">
// <ListItemButton
//   onClick={() => navigate("/favorites")}
//   role="menuitem"
//   component="a"
//   aria-label="Favorite"
// >
//   <FavoriteRounded /> Favorites
// </ListItemButton>
// </ListItem>
// <ListDivider />
// <ListItem role="none">
// <ListItemButton
//   onClick={() => navigate("/profile")}
//   role="menuitem"
//   component="a"
//   aria-label="Profile"
// >
//   <Person /> Profile
// </ListItemButton>
// </ListItem>

// <Stack direction="row">
//   <ListItem role="none">
//     <ListItemButton
//       onClick={() => navigate("/home")}
//       role="menuitem"
//       component="a"
//       aria-label="Home"
//     >
//       <Home /> Home
//     </ListItemButton>
//   </ListItem>
//   <ListDivider />
//   <ListItem role="none">
//     <ListItemButton
//       onClick={() => navigate("/favorites")}
//       role="menuitem"
//       component="a"
//       aria-label="Favorite"
//     >
//       <FavoriteRounded /> Favorites
//     </ListItemButton>
//   </ListItem>
//   <ListDivider />
//   <ListItem role="none">
//     <ListItemButton
//       onClick={() => navigate("/profile")}
//       role="menuitem"
//       component="a"
//       aria-label="Profile"
//     >
//       <Person /> Profile
//     </ListItemButton>
//   </ListItem>
// </Stack>;

import React, { useState } from "react";
// import { BottomNavigation, BottomNavigationAction, Stack } from "@mui/material";
import Home from "@mui/icons-material/Home";
import FavoriteRounded from "@mui/icons-material/FavoriteRounded";
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

function NavBar() {
  // const [selected, setSelected] = useState("/home");
  const navigate = useNavigate();

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
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <Stack direction="row" justifyContent="center">
        {/* <BottomNavigation
          showLabels
          sx={{ width: "100vh" }}
          value={value}
          onChange={handleChange}
        > */}
        <BottomNavigation
          showLabels
          value={value}
          sx={{ width: 500 }}
          onChange={handleChange}
        >
          <BottomNavigationAction
            // sx={{
            //   minWidth: "70px",
            //   color: selected === "/home" ? "primary" : "disabled",
            // }}
            label="Home"
            value="/home"
            icon={<Home />}
            onClick={() => handleChange("/home")}
          />
          <BottomNavigationAction
            // sx={{
            //   minWidth: "70px",
            //   color: selected === "/favorites" ? "primary" : "disabled",
            // }}
            label="Favorites"
            value="/favorites"
            icon={<FavoriteRounded color="error" />}
            onClick={() => handleChange("/favorites")}
          />
          <BottomNavigationAction
            // sx={{
            //   minWidth: "70px",
            //   color: selected === "/profile" ? "primary" : "disabled",
            // }}
            label="Profile"
            value="/profile"
            icon={<Person />}
            onClick={() => handleChange("/profile")}
          />
        </BottomNavigation>
      </Stack>
    </Paper>
  );
}

export default NavBar;
