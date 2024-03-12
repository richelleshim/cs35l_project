import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthPage from './pages/AuthPage.jsx'
import HomePage from './pages/HomePage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import FavoritesPage from './pages/FavoritesPage.jsx'
import { Children } from 'react';
import { Box, Typography } from '@mui/joy';
import ProtectedRoute from './hooks/ProtectedRoute.jsx';



function Wrapper({ children }) {
  return <>
    <Box sx={{
      alignItems: 'center',
      justifyContent: 'center',
      width: "100%"
    }}>
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: 600,
        alignItems: 'center',
        justifyContent: 'center',
        margin: "auto"
      }}>
        <RouterProvider router={router}/>
      </Box>
    </Box>
  </>;

}

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthPage/>,
  },
  {
    path: '/home',
    element: (
      <ProtectedRoute>
          <HomePage/>
      </ProtectedRoute>
    ),
  },
  {
    path: '/profile',
    element: (
              <ProtectedRoute>
                  <ProfilePage/>
              </ProtectedRoute>
    ),
  },
  {
    path: '/favorites',
    element: (
      <ProtectedRoute>
          <FavoritesPage/>
      </ProtectedRoute>
    ),
  },
])
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
        <App />
        <Wrapper />
  </React.StrictMode>,
);

