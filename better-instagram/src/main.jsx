import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// add themeing capabilities similar to what Richelle did
import { CssVarsProvider } from "@mui/joy"
import { theme } from "./theme" // theme is listed in theme.js

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssVarsProvider theme={theme}> {/* Add theme to app */}
      <App />
    </CssVarsProvider>
  </React.StrictMode>,
)
