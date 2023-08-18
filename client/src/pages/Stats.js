import React from 'react'
import { Box, Grid, TextField, Stack } from '@mui/material';
import '../css/register.css';

const Stats = () => {
  return (
    <Stack direction="row" marginTop="2%">
  <Box width="50%">
      <Grid container className="stack">
          <Box className="formBox">
              <form>
                  <Stack direction="column">
                      <Box display="flex" justifyContent="center">                        
                              <button  type="submit" className="registerButton">
                                  Statystyki
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
  <Box width="50%" alignItems="right">
  <Grid container className="stack">
      <Box className="formBox">
          <form>
              <Stack direction="column">
                    <Box display="flex" justifyContent="center">                        
                          <button  type="submit" className="registerButton">
                              WYKRES
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

export default Stats