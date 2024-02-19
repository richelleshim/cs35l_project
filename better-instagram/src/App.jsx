import { useState } from 'react'
import reactLogo from './components/react.svg'
import viteLogo from '/vite.svg'

// import homepagewidget
import HomePageWidget from './components/HomePage/HomePageWidget'

// import from MUI
import { Stack } from "@mui/joy";

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <Stack direction="row" spacing={3}>
            <Stack direction="column" spacing={3} alignItems="flex-start" justifyContent="center">
              <HomePageWidget name="Greg Heffley" major="Computer Science" year="24"></HomePageWidget>
              <HomePageWidget name="Jennifer Lee" major="Cognitive Science" year="26"></HomePageWidget>
            </Stack>
            <Stack direction="column" spacing={3} alignItems="flex-start" justifyContent="center">
              <HomePageWidget name="Richelle Shim" major="Chicano Studies" year="26"></HomePageWidget>
              <HomePageWidget name="Chaidhat" major="Colarado Studies" year="26"></HomePageWidget>
            </Stack>
        </Stack>
      <h1>Bruingram</h1>
    </>
  )
}

export default App
