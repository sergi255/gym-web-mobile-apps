// CSS
import './css/App.css';

// Pages
import Home from './pages/Home'
import Login from './pages/Login'

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
        <Route path="/register" element={''}/>
      </Routes>
    </Box>
  );
}

export default App;