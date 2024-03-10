import { useState } from 'react'
import Avatar from "@mui/joy/Avatar";

// import all custom styling from MUI
import { Card, Stack, Typography, AspectRatio, Grid, IconButton } from "@mui/joy";
import { FavoriteRounded, FavoriteBorderRounded, SchoolOutlined, BackpackOutlined } from '@mui/icons-material';

function LikeIcon ({ liked }) {
    if (liked) {
        return <FavoriteRounded sx={{ fontSize: 30, color: "red" }} />;
    } else {
        return <FavoriteBorderRounded sx={{ fontSize: 30 }} />;
    }
}

function HomePageWidget ({ name, desc, major, year, imageSrc }) {
    const [liked, setLiked] = useState(false);
    const imageSrcFull = `assets/profilepics/${imageSrc}.png`

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
                        <Avatar src={imageSrc} sx={{ width: 180, height: 180 }} />
                        
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
                <IconButton onClick={() => { setLiked(!liked); }} variant="plain">
                    <LikeIcon liked={liked}></LikeIcon>
                </IconButton>
            </Grid>
        </Grid>
    </Card>
    </>;
}

export default HomePageWidget;