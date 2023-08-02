import React from 'react';

import { Box, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import '../css/navbar.css'

const Navbar = () => {
  return (
    <Box display="flex" justifyContent="flex-end">
    <Stack direction="column" width="50%">
        <Stack direction="row" className='oddLinkBox'>
            <Link className='link' to="/login">LOGOWANIE</Link>
            <Typography fontSize="20px">Zaloguj się do serwisu</Typography>
        </Stack>
        <Stack direction="row" className='evenLinkBox'>
            <Link className='link' to="/register">REJESTRACJA</Link>
            <Typography fontSize="20px">Załóż konto w serwisie</Typography>
        </Stack>
    </Stack>
    </Box>
  );
};

export default Navbar;
