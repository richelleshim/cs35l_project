import { useState } from 'react'

// import all custom styling from MUI
import { Card, Stack, Typography, AspectRatio, Grid, IconButton, Divider } from "@mui/joy";
import { Favorite, FavoriteBorder, School, Backpack } from '@mui/icons-material';

function LikeIcon ({ liked }) {
    if (liked) {
        return <Favorite sx={{ fontSize: 30, color: "red" }} />;
    } else {
        return <FavoriteBorder sx={{ fontSize: 30 }} />;
    }
}

function HomePageWidget ({ name, major, year }) {
    const [liked, setLiked] = useState(false);

    return <>
    <Card 
        sx={{
            boxShadow: 'lg',
            px: 3,
            py: 5
        }}
    >
        <Grid container spacing={2}>
            <Grid item>
                <Stack direction="row" spacing={5} sx={{ width: 500, height: 200 }}>
                    <AspectRatio
                        ratio="1"
                        sx={{ flex: 1, maxWidth: 200, borderRadius: '100%' }}
                    >
                        <img
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
                        srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
                        loading="lazy"
                        alt=""
                        />
                    </AspectRatio>
                    <Stack direction="column" alignItems="flex-start" justifyContent="center">
                        <Typography level="h2" textAlign="start" sx={{ pb: 2 }}>
                            {name}
                        </Typography>
                        <Stack direction="row" spacing={2}>
                            <Backpack sx={{ fontSize: 30 }} />
                            <Typography level="p">
                                {major}
                            </Typography>
                        </Stack>
                        <Stack direction="row" spacing={2}>
                            <School sx={{ fontSize: 30 }} />
                            <Typography level="p">
                                Class of '{year}
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Grid>
            <Grid item>
                <IconButton onClick={() => { setLiked(!liked); }} variant="plain">
                    <LikeIcon liked={liked}></LikeIcon>
                </IconButton>
            </Grid>
        </Grid>
    </Card>
    </>;
}

export default HomePageWidget;