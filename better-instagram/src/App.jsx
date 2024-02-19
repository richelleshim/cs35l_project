import { useState } from 'react'
import reactLogo from './components/react.svg'
import viteLogo from '/vite.svg'

// import homepagewidget
import HomePageWidget from './components/HomePage/HomePageWidget'

// import from MUI
import { Stack, Box } from "@mui/joy";

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Box sx={{ pb: 5 }}>
        <img
          src="public/Bruingram.png"
          loading="lazy"
          alt=""
        />
      </Box>
      <Stack direction="column" spacing={3}>
          <Stack direction="row" spacing={3} alignItems="flex-start" justifyContent="center">
            <HomePageWidget name="Daniel Fenex" desc="Likes cats." major="Computer Science" year="24" imageSrc="daniel"></HomePageWidget>
            <HomePageWidget name="Jennifer Lee" desc="I don't think YRL is good." major="Cognitive Science" year="26" imageSrc="jennifer"></HomePageWidget>
          </Stack>
          <Stack direction="row" spacing={3} alignItems="flex-start" justifyContent="center">
            <HomePageWidget name="Richelle Shim" desc="Hates dogs." major="Chicano Studies" year="26" imageSrc="richelle"></HomePageWidget>
            <HomePageWidget name="Michael J. Jordan" desc="Takes things personally." major="Chemical Sciences" year="26" imageSrc="mjj"></HomePageWidget>
          </Stack>
          <Stack direction="row" spacing={3} alignItems="flex-start" justifyContent="center">
            <HomePageWidget name="Michael B. Jordan" desc='"Whats ur number bb"' major="Colorado Studies" year="26" imageSrc="mjb"></HomePageWidget>
            <HomePageWidget name="Chai Chai" desc="I eat hamburgers." major="Cantonese Studies" year="26" imageSrc="chai"></HomePageWidget>
          </Stack>
      </Stack>
    </>
  )
}

export default App
