import React from 'react'

import { Box, Stack, Typography } from '@mui/material';

import '../css/home.css'

const Home = () => {
  return (
    <Box width="50%">
        <Stack direction="column" className="stack">
            <img src={require('../assets/logo.png')} alt="Logo" />
            <Typography fontWeight="600" variant='h1'>DYSZAK</Typography>
            <Typography fontWeight="600" variant='h3'>CARDIO CAMP</Typography>
        </Stack>
    </Box>
  )
}

export default Home