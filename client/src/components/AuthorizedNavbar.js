import React, { useState } from 'react';

import { Box, Stack, Menu, MenuItem } from '@mui/material';
import { Link} from 'react-router-dom';
import { useAuth } from '../components/AuthProvider';
import Cookies from 'js-cookie';

import '../css/navbar.css'

const AuthorizedNavbar = () => {
  const { setAuth } = useAuth();
  const [anchorEl1, setAnchorEl1] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);

  const handleLogout= () => {
    Cookies.remove('session_data');
    setAuth(false);
  }

  const handleMenu1Open = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleMenu1Close = () => {
    setAnchorEl1(null);
  };

  const handleMenu2Open = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleMenu2Close = () => {
    setAnchorEl2(null);
  };


  return (
    <Box display="flex" justifyContent="flex-end">
        <Box width="100%">
        <Stack direction="row" className="fullLinkBox">
            <Link className="link" onClick={handleMenu1Open}>
            TRENING
            </Link>
            <Link className="link" onClick={handleMenu2Open}>
            ĆWICZENIA
            </Link>
            <Link className='link' to="/stats">STATYSTYKI</Link>
            <Link className='link' to="/profile">PROFIL</Link>
            <Link className='link' to="/" onClick={handleLogout}>WYLOGUJ</Link>
        </Stack>
        <Menu
        anchorEl={anchorEl1}
        open={Boolean(anchorEl1)}
        onClose={handleMenu1Close}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
        }}
        >
        <MenuItem component={Link} to="/trainings/add" onClick={handleMenu1Close}>
            DODAJ TRENING
        </MenuItem>
        <MenuItem component={Link} to="/trainings/browse" onClick={handleMenu1Close}>
            PRZEGLĄDAJ TRENINGI
        </MenuItem>
        </Menu>
        <Menu
        anchorEl={anchorEl2}
        open={Boolean(anchorEl2)}
        onClose={handleMenu2Close}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
        }}
        >
        <MenuItem component={Link} to="/exercises/add" onClick={handleMenu2Close}>
            DODAJ ĆWICZENIA
        </MenuItem>
        <MenuItem component={Link} to="/exercises/browse" onClick={handleMenu2Close}>
            PRZEGLĄDAJ ĆWICZENIA
        </MenuItem>
        <MenuItem component={Link} to="/exercises/my" onClick={handleMenu2Close}>
            MOJE ĆWICZENIA
        </MenuItem>
        </Menu>
    </Box>
  </Box>
);
};

export default AuthorizedNavbar;
