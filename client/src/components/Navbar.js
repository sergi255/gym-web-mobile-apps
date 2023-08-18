import React, { useState } from 'react';

import { Box, Stack, Typography, Menu, MenuItem } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import '../css/navbar.css'

const Navbar = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [anchorEl1, setAnchorEl1] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);

  const handleLogout= () => {
    setIsLoggedIn(false);
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
      { !isLoggedIn ? (
        <>
        {location.pathname === '/login' ? (
          <Box width="50%">
            <Stack direction="row" width="100%" className='evenLinkBox'>
                <Link className='link' to="/login">LOGOWANIE</Link>
            </Stack>
          </Box>
        ) : location.pathname === '/register' && (
          <Box width="50%">
            <Stack direction="row" className='evenLinkBox'>
                <Link className='link' to="/register">REJESTRACJA</Link>
            </Stack>
        </Box>
        )}
        <Box width="50%">
          <Stack direction="row" className='oddLinkBox'>
              <Link className='link' to="/login">LOGOWANIE</Link>
              <Typography fontSize="20px">Zaloguj się do serwisu</Typography>
          </Stack>
          <Stack direction="row" className='evenLinkBox'>
              <Link className='link' to="/register">REJESTRACJA</Link>
              <Typography fontSize="20px">Załóż konto w serwisie</Typography>
          </Stack>
        </Box>
        </>
      ) : (
        <>
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
      </>
    )}
  </Box>
);
};

export default Navbar;
