import * as React from "react";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import CardContent from "@mui/joy/CardContent";
import CardActions from "@mui/joy/CardActions";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import useAuthStore from "../../store/authStore";
import { Stack, Typography, IconButton } from "@mui/joy";
import { FavoriteRounded, FavoriteBorderRounded, SchoolOutlined, BackpackOutlined } from '@mui/icons-material';

export default function BottomActionsCard() {
  let userObj = useAuthStore((state) => state.user);
  console.log(userObj)
  let major = "Computer Science";
  let year = "24";

  return (
    <Stack 
      sx={{mt: 5, mb: 5}}
      direction="row" 
      alignItems="center" 
      justifyContent="center" 
      spacing={5}
    >
      <Box
        sx={{
          width: 250
        }}
      >
        <Avatar src="/static/images/avatar/1.jpg" size="" 
          sx={{
            width: 250,
            height: 250,
          }}
        />
      </Box>
      <Stack 
        direction="column" 
      >
        <Stack sx={{mb: 2}} direction="row" spacing={2}>
          <Button variant="outlined" color="neutral">
            Edit Profile
          </Button>
          <IconButton variant="outlined" color="neutral">
            <FavoriteBorder />
          </IconButton>
        </Stack>
        <Typography level="h1">{userObj.fullName}</Typography>
        <Typography level="h4">@{userObj.username}</Typography>
        <Typography sx={{mt: 2, mb: 2}}>This is where bio goes. I don't know what to type here</Typography>
        <Stack direction="row" alignItems="center" spacing={10}>
          <Stack sx={{mt: 1, mb: 0.5}} direction="row" alignItems="center" spacing={1}>
              <BackpackOutlined sx={{ fontSize: 30 }} />
              <Typography>
                  {major}
              </Typography>
          </Stack>
          <Stack sx={{mt: 0.5, mb: 2}} direction="row" alignItems="center" spacing={1}>
              <SchoolOutlined sx={{ fontSize: 30 }} />
              <Typography>
                  Class of '{year}
              </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
