import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/Homepage/HomePage'
import AuthPage from './pages/AuthPage/AuthPage'
import ProfilePage from './components/pages/ProfilePage'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/auth" element={<AuthPage />}></Route>
    </Routes>
  );
}

export default App;
