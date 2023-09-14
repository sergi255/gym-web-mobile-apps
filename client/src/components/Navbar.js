import React, { useState, useEffect } from 'react';

import { Box, Stack, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

import '../css/navbar.css'

const Navbar = () => {
  const location = useLocation();

  return (
    <Box display="flex" justifyContent="flex-end">
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
  </Box>
);
};

export default Navbar;
