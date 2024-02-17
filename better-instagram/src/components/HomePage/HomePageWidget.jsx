import { useState } from 'react'

// import all custom styling from MUI
import { Button, Link } from "@mui/joy";

function HomePageWidget () {
    const [active, setActive] = useState(false)

    return <>
        <Button sx={{ mt: 1 /* margin top */ }}>
            Log in
        </Button>
    </>;
}

export default HomePageWidget;