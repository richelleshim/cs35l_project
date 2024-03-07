import * as React from "react";
import Avatar from "@mui/joy/Avatar";
import Grid from "@mui/joy/Grid";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import CardContent from "@mui/joy/CardContent";
import CardActions from "@mui/joy/CardActions";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import useAuthStore from "../../store/authStore";

export default function BottomActionsCard() {
  let userObj = useAuthStore((state) => state.user);
  console.log(userObj)

  return (
    <Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center", // Center align the content horizontally
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Avatar src="/static/images/avatar/1.jpg" size="" 
          sx={{
            width: 200,
            height: 200,
          }}
        />
      </Box>
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "center", // Center align the content horizontally
          alignItems: "center",
          flexDirection: "column",
          textAlign: "center", // Center align the text
        }}
      >
        <Typography level="h1">{userObj.fullName}</Typography>
        <Typography level="h2">@{userObj.username}</Typography>
        <Typography level="p">Insert bio here</Typography>
        <Typography level="p">Major</Typography>
        <Typography level="p">Year</Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "center", // Center align the buttons horizontally
        }}
      >
        <IconButton variant="outlined" color="neutral">
          <FavoriteBorder />
        </IconButton>
        <Button variant="outlined" color="neutral">
          Edit Profile
        </Button>
      </CardActions>
    </Grid>
  );
}
