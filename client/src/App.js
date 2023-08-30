// CSS
import './css/App.css';

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Training from './pages/Training'
import Exercise from './pages/Exercise'
import Profil from './pages/Profil'
import BrowseExercise from './pages/BrowseExercise'
import Statystyki from './pages/Stats'

// Components
import Navbar from './components/Navbar'

// Libraries
import { Box } from '@mui/material'
import { Routes, Route } from 'react-router-dom';

// Color palette
//#6422b8 - fioletowy
//#ffd93b - rzułty
//#ffffff - biały

function App() {
  return (
    <Box>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/trainings/add" element={<Training/>}/>
        <Route path="/exercises/add" element={<Exercise/>}/>
        <Route path="/exercises/browse" element={<BrowseExercise/>}/>
        <Route path="/stats" element={<Statystyki/>}/>
        <Route path="/profile" element={<Profil/>}/>
      </Routes>
    </Box>
  );
}

export default App;