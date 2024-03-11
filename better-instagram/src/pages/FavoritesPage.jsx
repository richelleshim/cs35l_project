import { useState, useEffect } from "react";
import Stack from "@mui/joy/Stack";
import Box from "@mui/joy/Box";
import HomePageWidget from "../components/Home/HomePageWidget";
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
import { firestore } from "../firebase/firebase";
import { getDocs, collection } from "firebase/firestore";
import {
  getStorage,
  ref,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

//not using for now, because will pull from homepagewidget styling
const UserCard = ({ user }) => {
  const { name, major, year, imageUrl } = user;
  const [isFavorite, setIsFavorite] = useState(true); // State to track favorite status
  //const[favoritedProfilesList, setfavoritedProfilesList] = useState([]); //list of which profiles you favorited; fetch from firestore field

  // Function to toggle favorite status (for now get rid of: only show the favorited profiles from firestore; enable deleting later)
  /*const handleFavoriteToggle = () => {
    setIsFavorite((prev) => !prev);
  };*/

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
        //onClick={handleFavoriteToggle} // Toggle favorite status on click (update later)
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
  // Define an array of user data (for demonstration purposes) **not used right now

  const [favoritesList, setFavoritesList] = useState([]);
  const favoritesCollectionRef = collection(firestore, "favoritedprofiles");
  //const [currentIndex, setCurrentIndex] = useState(null);

  useEffect(() => {
    const getFavoritedList = async () => {
      try {
        const data = await getDocs(favoritesCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setFavoritesList(filteredData);
      } catch (err) {
        console.error(err);
      }
    };

    getFavoritedList();
  }, []);

  return (
    <>
      <Stack direction="row">
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
          <Stack spacing={3}>
            {favoritesList.map((favorite, index) => (
              <HomePageWidget key={index} uid={favorite.favoriteuid} />
            ))}
          </Stack>
        </div>
        <NavBar />
      </Stack>
    </>
  );
};

export default FavoritesPage;
