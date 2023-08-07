import React from 'react'
import { Box, Grid, Typography, TextField, Stack } from '@mui/material';
import '../css/register.css';

const Training = () => {
    return (
        <Stack direction="row" marginTop="2%">
      <Box width="50%">
          <Grid container className="stack">
              <Box className="formBox">
                  <form>
                      <Stack direction="column">
                          <Stack direction="row" alignItems="center">
                              <Typography variant="h5" mr="20px" fontWeight="600">NAZWA</Typography>
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
                              <Typography variant="h5" mr="20px" fontWeight="600">DATA</Typography>
                              <TextField
                                  fullWidth
                                  type="date"
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
                              <Typography variant="h5" mr="20px" fontWeight="400">CZAS ROZPOCZĘCIA</Typography>
                              <TextField
                                  fullWidth
                                  type="time"
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
                              <Typography variant="h5" mr="20px" fontWeight="400">CZAS ZAKOŃCZENIA</Typography>
                              <TextField
                                  fullWidth
                                  type="time"
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
                              <Box display="flex" justifyContent="flex-end">                        
                                  <button  type="submit" className="registerButton">
                                      DODAJ TRENING
                                  </button>
                              </Box>
                          </Stack>
                  </form>
              </Box>
          </Grid>
      </Box>
      <Box width="50%" alignItems="right">
      <Grid container className="stack">
          <Box className="formBox">
              <form>
                  <Stack direction="column">
                      <Stack direction="row" alignItems="center">
                          <Typography variant="h5" mr="20px" fontWeight="600">LISTA ĆWICZEŃ</Typography>
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
                          <Typography variant="h5" mr="20px" fontWeight="600">DODANE ĆWICZENIA</Typography>
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
                          <Box display="flex" justifyContent="flex-end">                        
                              <button  type="submit" className="registerButton">
                                  DODAJ WŁASNE ĆWICZENIE
                              </button>
                          </Box>
                      </Stack>
              </form>
          </Box>
      </Grid>
  </Box>
  </Stack>
    );
  };

export default Training