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
import EditExercise from './pages/EditExercise';
import EditTraining from './pages/EditTraining';

// Components
import Navbar from './components/Navbar'
import AuthorizedNavbar from './components/AuthorizedNavbar'
import { useAuth } from './components/AuthProvider';

// Libraries
import { Box } from '@mui/material'
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
          <Route path="/trainings/edit/:id" element={<EditTraining/>}/>
          <Route path="/exercises/add" element={<Exercise/>}/>
          <Route path="/exercises/edit/:id" element={<EditExercise/>}/>
          <Route path="/exercises/browse" element={<BrowseExercise/>}/>
          <Route path="/exercises/my" element={<MyExercises/>}/>
          <Route path="/stats" element={<Stats/>}/>
          <Route path="/profile" element={<Profil/>}/>
        </Routes>
        <ToastContainer />
    </Box>
  );
}

export default App;