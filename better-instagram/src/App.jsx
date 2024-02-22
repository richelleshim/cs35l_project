import { useState } from 'react'
<<<<<<< HEAD
import { Route, Routes } from "react-router-dom"
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
=======
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/Homepage/HomePage'
import AuthPage from './pages/AuthPage/AuthPage'
import HomePageWidget from './components/HomePage/HomePageWidget'
import ProfilePage from './components/pages/ProfilePage'
>>>>>>> origin/main
import './App.css'

import FavoritesPage from './pages/FavoritesPage'

function App() {
  return (
    <FavoritesPage />
  )
}


/*
function App() {
  return (
<<<<<<< HEAD
    <div>
      <a href="https://vitejs.dev" target="_blank">
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </a>
      <a href="https://react.dev" target="_blank">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a>
      <h1>Vite + React</h1>
=======
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/auth" element={<AuthPage />}></Route>
    </Routes>
  );
    <>
      <HomePageWidget></HomePageWidget>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Bruingram</h1>
>>>>>>> origin/main
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}
<<<<<<< HEAD
*/
export default App
=======

export default App;
>>>>>>> origin/main
