import React from 'react';
import { Box, Grid, TextField, Stack } from '@mui/material';
import '../css/register.css';

const BrowseExercise = () => {
  return (
    <Box width="100%" marginTop="2%">
        <Grid container className="stack">
            <Box className="formBox">
                <form>
                    <Stack direction="column"><Box display="flex" justifyContent="center">                        
                                <button  type="submit" className="registerButton">
                                    FILTRUJ PARTIE CIAŁA
                                </button>
                            </Box>
                        <Stack direction="row" alignItems="center">
                            
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
                            
                            
                        </Stack>
                </form>
            </Box>
        </Grid>
    </Box>
  );
};

export default BrowseExercise;
