import { useRef, useState, useEffect } from 'react';
import { firestore } from '../../firebase/firebase';
import { setDoc, addDoc, collection } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";

// import all custom styling from MUI
import { Card, Stack, Typography, AspectRatio, Grid, IconButton } from "@mui/joy";
import { FavoriteRounded, FavoriteBorderRounded, SchoolOutlined, BackpackOutlined } from '@mui/icons-material';

const storage = getStorage();

function HomePageWidget ({ name, desc, major, year, imageSrc , isFavorited }) {
    const [favorited, setFavorited] = useState(isFavorited);
    const imageSrcFull = `assets/profilepics/${imageSrc}.png`

    useEffect(() => {
        // Get favorited status from localStorage
        const isFavorited = localStorage.getItem(name) === 'true';
        setFavorited(isFavorited);
    }, [name]);
    
    const favoriteddata = async () => {
        try {
            await addDoc(collection(firestore, "favoritedprofiles"), {
                favoriteduid: name, // Assuming `name` holds the UID of the profile
                personaluid: "TODO" // Assuming this is the user's UID
            });
            localStorage.setItem(name, 'true'); // Set favorited status in localStorage
            setFavorited(true); // Update local state to reflect favorited status
        } catch (error) {
            console.error("Error adding favorited profile: ", error);
        }
    };


    return <>
    <Card 
        sx={{
            boxShadow: 'lg',
            px: 4,
            py: 4
        }}
    >
        <Grid container spacing={2}>
            <Grid item>
                <Stack direction="row" alignItems="center" spacing={5} sx={{ width: 500, height: 200 }}>
                    <AspectRatio
                        ratio="1"
                        sx={{ flex: 1, maxWidth: 180, borderRadius: '100%' }}
                    >
                        <img
                        src={imageSrcFull}
                        loading="lazy"
                        alt=""
                        />
                    </AspectRatio>
                    <Stack direction="column" alignItems="flex-start" justifyContent="center" spacing={1}>
                        <Typography level="h2" textAlign="start">
                            {name}
                        </Typography>
                        <Typography level="p" textAlign="start" sx={{ pb: 1.5 }}>
                            {desc}
                        </Typography>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <BackpackOutlined sx={{ fontSize: 30 }} />
                            <Typography level="p">
                                {major}
                            </Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <SchoolOutlined sx={{ fontSize: 30 }} />
                            <Typography level="p">
                                Class of '{year}
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Grid>
            <Grid item>
            <IconButton variant="plain" onClick={favoriteddata}>
                    {favorited ? (
                        <FavoriteRounded sx={{ fontSize: 30, color: "red" }} />
                    ) : (
                        <FavoriteBorderRounded sx={{ fontSize: 30 }} />
                    )}
                </IconButton>
            </Grid>
        </Grid>
    </Card>
    </>;
}

export default HomePageWidget;