import FavoritesPage from './pages/FavoritesPage'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import AuthPage from './pages/AuthPage'
import EditProfilePage from './pages/EditProfilePage'

import { Stack } from "@mui/joy";

function App() {
  return <Stack direction="column"  alignItems="center" >
        <FavoritesPage />
        <HomePage />
        <ProfilePage />
        <AuthPage />
        <EditProfilePage />
  </Stack>;
}


/*
function App() {
  return (
<<<<<<< HEAD
    <ProfilePage />
=======
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
    </>
>>>>>>> 56c6c7be679f41b5ad3cb1754cc6661126b613f3
  )
}
<<<<<<< HEAD
*/

export default App;
