import { useState } from 'react'

// import all custom styling from MUI
import { Card, CardMedia, Stack, Typography, Chip, Rating, Switch } from '@mui/material';

function HomePageWidget () {
    const [active, setActive] = useState(false)

    return <Card>
        <Stack direction="row" alignItems="center" spacing={3} p={2} useFlexGap>
        <CardMedia
            component="img"
            alt="Yosemite National Park"
            image="/static/images/cards/yosemite.jpeg"
        />
            <Stack direction="column" spacing={0.5} useFlexGap>
                <Typography>Yosemite National Park, California, USA</Typography>
                <Stack direction="row" spacing={1} useFlexGap>
                    <Chip
                        size="small"
                        label={active ? 'Active' : 'Inactive'}
                        color={active ? 'success' : 'default'}
                    />
                    <Rating defaultValue={1} size="small" />
                </Stack>
            </Stack>
            <Switch checked={active} />
        </Stack>
    </Card>;
}

export default HomePageWidget;