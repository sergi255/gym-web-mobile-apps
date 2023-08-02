// CSS
import './css/App.css';

// Pages

// Components
import Navbar from './components/Navbar'

// Libraries
import {Box, Stack } from '@mui/material'
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
        <Route path="/" element={''}/>
        <Route path="/login" element={''}/>
        <Route path="/register" element={''}/>
      </Routes>
    </Box>
  );
}

export default App;