import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/Homepage/HomePage'
import AuthPage from './pages/AuthPage/AuthPage'
import HomePageWidget from './components/HomePage/HomePageWidget'
import ProfilePage from './components/pages/ProfilePage'
import './App.css'

function App() {

  return (
    <ProfilePage />
  )
}

export default App
