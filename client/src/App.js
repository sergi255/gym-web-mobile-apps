// CSS
import './css/App.css';

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Training from './pages/Training'
import Profil from './pages/Profil'
import Stats from './pages/Stats'
import Exercise from './pages/Exercise'
import BrowseExercise from './pages/BrowseExercise'
import MyExercises from './pages/MyExercises'
import Kalendarz from './pages/Kalendarz'

// Components
import Navbar from './components/Navbar'
import AuthorizedNavbar from './components/AuthorizedNavbar'
import { useAuth } from './components/AuthProvider';

// Libraries
import { Box } from '@mui/material'
import { Routes, Route } from 'react-router-dom';

// Color palette
//#6422b8 - fioletowy
//#ffd93b - rzułty
//#ffffff - biały

function App() {
  const { auth } = useAuth();

  return (
    <Box> 
      {auth ? <AuthorizedNavbar /> : <Navbar />}
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/trainings/add" element={<Training/>}/>
          <Route path="/trainings/browse" element={<Kalendarz/>}/>
          <Route path="/exercises/add" element={<Exercise/>}/>
          <Route path="/exercises/browse" element={<BrowseExercise/>}/>
          <Route path="/exercises/my" element={<MyExercises/>}/>
          <Route path="/stats" element={<Stats/>}/>
          <Route path="/profile" element={<Profil/>}/>
        </Routes>
    </Box>
  );
}

export default App;