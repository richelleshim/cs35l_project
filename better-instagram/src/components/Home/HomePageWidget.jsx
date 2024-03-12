import CardItem from '../Profile/CardItem'
import { useState, useEffect, Suspense } from 'react';
import { firestore } from '../../firebase/firebase';
import { addDoc, deleteDoc, collection, doc, query, getDocs, where } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { Avatar } from "@mui/joy";
import { Shimmer } from 'react-shimmer'
import useAuthStore from "../../store/authStore";


// import all custom styling from MUI
import { Card, Stack, Typography, AspectRatio, Grid, IconButton, Box } from "@mui/joy";
import { FavoriteRounded, FavoriteBorderRounded, SchoolOutlined, BackpackOutlined } from '@mui/icons-material';

function PostPicture ({ image, handleGoToProfile }) {
    var [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        const getImageUrl = async () => {
            const storage = getStorage()
            let url = await getDownloadURL(ref(storage, image));
            setImageUrl(url);
        };

        getImageUrl();
    });

    if(imageUrl == "") {
        return <Shimmer height={100}></Shimmer>;
    } else {
        return <CardItem sx={{display: "inline"}}small={true} imageUrl={imageUrl} onCardClick={() => handleGoToProfile} />;
    }
}

function PostPreviews ({ postImages, handleGoToProfile }) {
    if (!postImages || postImages.length === 0) return <></>;
    let outputObjects = [];
    for (let i = 0; i < 3; i++) {
        if (i < postImages.length) {
            outputObjects.push(
                <PostPicture image={postImages[i]} handleGoToProfile={handleGoToProfile}/>
            );
        } else {
            outputObjects.push(<Box sx={{ width: 180, height: 150}} />);
        }
    }
    /*

            */
    return <Stack direction="row" sx={{ width: "600px" }} spacing={3}>
        {outputObjects}
    </Stack>;
}

function HomePageWidget ({ name, desc, major, year, uid, imageSrc, postImages, isFavorited, handleGoToProfile }) {
    const [favorited, setFavorited] = useState(false);
    //retreive  personaluid using authstore
    const personaluid = useAuthStore((state) => state.user()?.uid);

    useEffect(() => {
        // Fetch favorited status from local storage
        const isFavoritedLocally = localStorage.getItem(uid) === 'true';
        setFavorited(isFavoritedLocally);
    }, [uid]); // Update whenever the uid changes


    const toggleFavorite = () => {
        console.log("Toggle favorite called");
        const newFavorited = !favorited;
        setFavorited(newFavorited);
        localStorage.setItem(uid, newFavorited ? 'true' : 'false');
        updateFirestore(newFavorited, personaluid); //pass personal uid here
    };
    
    
    const updateFirestore = async (newFavorited, personaluid) => {
        try {
            const favoritedRef = collection(firestore, "favoritedprofiles");
            const favoritedQuery = query(
                favoritedRef,
                where("favoriteduid", "==", uid),
                where("personaluid", "==", personaluid)
            );
            const favoritedSnapshot = await getDocs(favoritedQuery);
            
            // Check if the profile is already favorited
            const isAlreadyFavorited = !favoritedSnapshot.empty;
    
            if (newFavorited && !isAlreadyFavorited) {
                // Profile is not favorited, so add it to Firestore
                await addDoc(favoritedRef, {
                    favoriteduid: uid,
                    personaluid: personaluid
                });
            } else if (!newFavorited && isAlreadyFavorited) {
                // Profile is already favorited, so remove it from Firestore
                favoritedSnapshot.forEach(async (doc) => {
                    await deleteDoc(doc.ref);
                });
            }
    
            // Update local storage and state based on the new favorited status
            localStorage.setItem(uid, newFavorited ? 'true' : 'false');
            setFavorited(newFavorited);
        } catch (error) {
            console.error("Error updating favorited profile in Firestore: ", error);
        }
    };
    


    return <>
    <Card 
        sx={{
            boxShadow: 'lg',
            px: 4,
            py: 4,
            cursor: "pointer"
        }}
    >
        <Grid container spacing={2}>
            <Grid item>
                <Stack direction="row" alignItems="center" sx={{ width: 600, height: 120, mb: 2 }}>
                    <Box sx={{pr: 4}}  onClick={handleGoToProfile}>
                        <AspectRatio
                            ratio="1"
                            sx={{ flex: 1, width: 100, borderRadius: '100%' }}
                        >
                            <Avatar src={imageSrc} sx={{ width: 120, height: 120 }} />
                            
                        </AspectRatio>
                    </Box>
                    <Stack direction="column" alignItems="flex-start" justifyContent="center" sx={{width: 500}}  onClick={handleGoToProfile}>
                        <Typography level="h2" textAlign="start">
                            {name}
                        </Typography>
                        <Typography level="p" textAlign="start" sx={{ pb: 1.5 }}>
                            {desc}
                        </Typography>
                        <Stack direction="row" alignItems="center" spacing={1}>
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
                    <Box sx={{pl: 4}}>
                    <IconButton variant="plain" onClick={(e) => { e.stopPropagation(); toggleFavorite(); }}>
                        {favorited ? (
                            <FavoriteRounded sx={{ fontSize: 30, color: "red" }} />
                        ) : (
                            <FavoriteBorderRounded sx={{ fontSize: 30 }} />
                        )}
                    </IconButton>
                    </Box>
                </Stack>
            </Grid>
            <Box onClick={handleGoToProfile}>
                <PostPreviews  postImages={postImages} handleGoToProfile={handleGoToProfile}/>
            </Box>
        </Grid>
    </Card>
    </>;
}

export default HomePageWidget;