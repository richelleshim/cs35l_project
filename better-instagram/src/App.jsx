import { useState } from 'react'
import reactLogo from './components/react.svg'
import viteLogo from '/vite.svg'

import HomePageWidget from './components/HomePage/HomePageWidget'
import ProfilePage from './components/pages/ProfilePage'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ProfilePage />
    </>
  )
}

export default App
