import { useState } from "react";
import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";
import Box from "@mui/joy/Box";
import { styled } from "@mui/joy/styles";
import {
  AspectRatio,
  Card,
  CardContent,
  Typography,
  Sheet,
  IconButton,
} from "@mui/joy";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import NavBar from "../components/NavBar/NavBar";

const Title = styled("h2")({
  fontFamily: "Lobster, cursive",
  fontWeight: "bold",
  textAlign: "center",
  marginTop: "10px", // Adjust as needed
  color: "black",
});

const UserCard = ({ user }) => {
  const { name, major, year, imageUrl } = user;
  const [isFavorite, setIsFavorite] = useState(true); // State to track favorite status

  // Function to toggle favorite status
  const handleFavoriteToggle = () => {
    setIsFavorite((prev) => !prev);
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative",
        // width: '120%',
        minWidth: "500px",
        maxWidth: "800px",
        mb: 2,
        p: 2,
      }}
    >
      {/* Absolute positioned heart icon */}
      <IconButton
        sx={{ position: "absolute", top: "8px", right: "8px" }} // Adjust position
        size="small"
        onClick={handleFavoriteToggle} // Toggle favorite status on click
      >
        {isFavorite ? <Favorite /> : <FavoriteBorder />}
      </IconButton>

      <AspectRatio flex ratio="16/9" sx={{ minWidth: 200, maxWidth: 300 }}>
        <img
          src={imageUrl}
          loading="lazy"
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
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

const Item = styled("div")(({ theme }) => ({
  ...theme.typography["body-sm"],
  textAlign: "center",
  fontWeight: theme.fontWeight.md,
  color: theme.vars.palette.text.secondary,
  border: "1px solid",
  borderColor: theme.palette.divider,
  padding: theme.spacing(2),
  borderRadius: theme.radius.md,
}));

const FavoritesPage = () => {
  // Define an array of user data (for demonstration purposes)
  const users = [
    {
      name: "Happy Name",
      major: "Theater Studies",
      year: "Class of 26",
      imageUrl:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286",
    },
    // Add more user data as needed
  ];

  return (
    <>
      <NavBar />
      <div className="FavoritesPage">
        <Favorite
          sx={{
            position: "absolute",
            top: "25px",
            right: "25px",
            fontSize: 45,
            color: "black",
          }}
        />
        {/* <Title>Bruinstagram</Title> */}
        <img src="./Bruingram.png" />
        <Stack spacing={3}>
          {users.map((user, index) => (
            <UserCard key={index} user={user} />
          ))}

          {users.map((user, index) => (
            <UserCard key={index} user={user} />
          ))}

          {users.map((user, index) => (
            <UserCard key={index} user={user} />
          ))}

          {users.map((user, index) => (
            <UserCard key={index} user={user} />
          ))}

          {users.map((user, index) => (
            <UserCard key={index} user={user} />
          ))}
        </Stack>
      </div>
    </>
  );
};

export default FavoritesPage;
