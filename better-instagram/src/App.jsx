import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/Homepage/HomePage'
import AuthPage from './pages/AuthPage/AuthPage'
import HomePageWidget from './components/HomePage/HomePageWidget'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <> 
    
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/auth' element={<AuthPage />} />
    </Routes>

      <HomePageWidget></HomePageWidget>
      <h1>Bruingram</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App
