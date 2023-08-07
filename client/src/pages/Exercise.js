import React from 'react';
import { Box, Grid, Typography, TextField, Stack } from '@mui/material';
import '../css/register.css';

const Exercise = () => {
  return (
    <Box width="50%" marginTop="2%">
        <Grid container className="stack">
            <Box className="formBox">
                <form>
                    <Stack direction="column">
                        <Stack direction="row" alignItems="center">
                            <Typography variant="h5" mr="20px" fontWeight="600">Nazwa</Typography>
                            <TextField
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
                            <Typography variant="h5" mr="20px" fontWeight="600">Partia</Typography>
                            <TextField
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
                            <Typography variant="h5" mr="20px" fontWeight="600">Opis</Typography>
                            <TextField
                                fullWidth
                                margin="normal"
                                InputProps={{
                                style: {
                                    background: 'white',
                                    border: 'none',
                                    height: '150px',
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

export default Exercise;
