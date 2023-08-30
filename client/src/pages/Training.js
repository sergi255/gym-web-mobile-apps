import React, { useState, useEffect } from 'react'
import { Box, Grid, Typography, TextField, Stack } from '@mui/material';
import '../css/register.css';
import axios from 'axios'

const Training = () => {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [beginTime, setBeginTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [description, setDescription] = useState('');
    const [token, setToken] = useState('');
    const apiUrl = `http://localhost:3001/trainings/add`;

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
          return parts.pop().split(';').shift();
        }
      };

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(apiUrl, {
                name: name,
                date: date,
                beginTime: beginTime,
                endTime: endTime,
                description: description
            }, {
                headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
              }
            });

            if (response.status === 200) {
                alert('Training add successfully.');
            } 
            else {
                alert('Failed to add training.');
            }

        } catch (error) {
            if (error.response && error.response.status === 422) {
                alert('Input data cannot be empty.');
            }
            else if(error.response && error.response.status === 409){
                alert('Training already exists.');
            } 
            else {
                console.error('Error:', error);
                alert('Failed to add training. Please try again.');
            }
        }
        setName('');
        setDate('');
        setBeginTime('');
        setEndTime('');
        setDescription('');
    };

    useEffect(() => {
        const sessionData = getCookie('session_data');
        if(sessionData) {
            setToken(sessionData)
        }
      }, [token]);

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
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
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
                                  value={date}
                                    onChange={(e) => setDate(e.target.value)}
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
                                    value={beginTime}
                                    onChange={(e) => setBeginTime(e.target.value)}
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
                                    value={endTime}
                                    onChange={(e) => setEndTime(e.target.value)}
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
                              <Typography variant="h5" mr="20px" fontWeight="400">OPIS</Typography>
                              <TextField
                                  fullWidth
                                  type="textarea"
                                  margin="normal"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
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
                                  <button  type="submit" className="registerButton" onClick={handleAdd}>
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