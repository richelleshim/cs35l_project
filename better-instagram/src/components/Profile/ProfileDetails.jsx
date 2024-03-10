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
import { useNavigate } from "react-router-dom";

export default function BottomActionsCard() {
  const navigate = useNavigate();
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
        <Avatar src="/static/images/avatar/1.jpg" size="" />
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
        <Typography level="title-lg">Name</Typography>
        <Typography level="title-sm">@username</Typography>
        <Typography level="body-sm">Insert bio here</Typography>
        <Typography level="body-sm">Major</Typography>
        <Typography level="body-sm">Year</Typography>
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
        <Button onClick={() => navigate("/editprofile")} variant="outlined" color="neutral">
          Edit Profile
        </Button>
      </CardActions>
    </Grid>
  );
}
