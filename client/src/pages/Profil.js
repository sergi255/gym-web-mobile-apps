import React from 'react'
import { Box, Grid, Typography, TextField, Stack } from '@mui/material';
import '../css/register.css';

const Profil = () => {
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
                          <Typography variant="h5" mr="20px" fontWeight="600">IMIĘ</Typography>
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
                          <Typography variant="h5" mr="20px" fontWeight="600">NAZWISKO</Typography>
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
                          <Typography variant="h5" mr="20px" fontWeight="600">EMAIL</Typography>
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
                          <Typography variant="h5" mr="20px" fontWeight="600">HASŁO</Typography>
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
                                  USUŃ KONTO
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
                      <Typography variant="h5" mr="20px" fontWeight="600">WZROST</Typography>
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
                      <Typography variant="h5" mr="20px" fontWeight="600">WAGA</Typography>
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
                      <Typography variant="h5" mr="20px" fontWeight="600">WIEK</Typography>
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
                              ZAPISZ DANE
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

export default Profil