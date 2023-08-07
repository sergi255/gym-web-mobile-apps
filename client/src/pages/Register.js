import React from 'react';
import { Box, Grid, Typography, TextField, Stack } from '@mui/material';
import '../css/register.css';

const Register = () => {
  return (
    <Box width="50%">
        <Grid container className="stack">
            <Box className="formBox">
                <form>
                    <Stack direction="column">
                        <Stack direction="row" alignItems="center">
                            <Typography variant="h5" mr="20px" fontWeight="600">EMAIL</Typography>
                            <TextField
                                label="Email"
                                fullWidth
                                margin="normal"
                                InputProps={{
                                style: {
                                    background: 'white',
                                    border: 'none',
                                    height: '40px',
                                    borderRadius: '20px',
                                },
                                }}
                            />
                            </Stack>
                            <Stack direction="row" alignItems="center">
                            <Typography variant="h5" mr="20px" fontWeight="600">LOGIN</Typography>
                            <TextField
                                label="Login"
                                fullWidth
                                margin="normal"
                                InputProps={{
                                style: {
                                    background: 'white',
                                    border: 'none',
                                    height: '40px',
                                    borderRadius: '20px',
                                },
                                }}
                            />
                            </Stack>
                            <Stack direction="row" alignItems="center">
                            <Typography variant="h5" mr="20px" fontWeight="600">HASŁO</Typography>
                            <TextField
                                label="Hasło"
                                fullWidth
                                margin="normal"
                                type="password"
                                InputProps={{
                                style: {
                                    background: 'white',
                                    border: 'none',
                                    height: '40px',
                                    borderRadius: '20px',
                                },
                                }}
                            />
                            </Stack>
                            <Box display="flex" justifyContent="flex-end">                        
                                <button  type="submit" className="registerButton">
                                    REJESTRACJA
                                </button>
                            </Box>
                        </Stack>
                </form>
            </Box>
        </Grid>
    </Box>
  );
};

export default Register;
