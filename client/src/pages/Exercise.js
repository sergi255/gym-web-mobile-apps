import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, TextField, Stack, Select, MenuItem } from '@mui/material';
import '../css/register.css';
import axios from 'axios';

const Exercise = () => {
    const [name, setName] = useState('');
    const [part, setPart] = useState('');
    const [description, setDescription] = useState('');
    const [token, setToken] = useState('');
    const addExerciseUrl = `http://localhost:3001/exercises/addExercise`;

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
          return parts.pop().split(';').shift();
        }
      };

    const addExercise = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(addExerciseUrl, {
                name: name,
                part: part,
                description: description
            }, {
                headers: {
                Authorization: `Bearer ${token}`,
              }
            });

            if (response.status === 200) {
                alert('Exercise added successfully.');
            } 
            else {
                alert('Failed to add exercise.');
            }

        } catch (error) {
            if (error.response && error.response.status === 422) {
                alert('Input data cannot be empty.');
            }
            else if(error.response && error.response.status === 409){
                alert('Exercise already exists.');
            } 
            else {
                console.error('Error:', error);
                alert('Failed to add exercise. Please try again.');
            }
        }
        setName('');
        setPart('');
        setDescription('');
    }

    useEffect(() => {
        const sessionData = getCookie('session_data');
        if(sessionData) {
            setToken(sessionData)
        }
      }, [token]);
  
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
                            <Typography variant="h5" mr="20px" fontWeight="600">Partia</Typography>
                            <Select
                                fullWidth
                                value={part}
                                onChange={(e) => setPart(e.target.value)}
                                inputProps={{
                                    style: {
                                        background: 'white',
                                        border: 'none',
                                        height: '40px',
                                        borderRadius: '20px',
                                    },
                                }}
                            >
                            <MenuItem value="1">Klatka piersiowa</MenuItem>
                            <MenuItem value="2">Plecy</MenuItem>
                            <MenuItem value="3">Barki</MenuItem>
                            <MenuItem value="4">Biceps</MenuItem>
                            <MenuItem value="5">Triceps</MenuItem>
                            <MenuItem value="6">Brzuch</MenuItem>
                            <MenuItem value="7">Nogi</MenuItem>
                            <MenuItem value="8">Pośladki</MenuItem>
                        </Select>
                        </Stack>
                        <Stack direction="row" alignItems="center">
                            <Typography variant="h5" mr="20px" fontWeight="600">Opis</Typography>
                            <TextField
                                fullWidth
                                margin="normal"
                                value={description}
                                onChange={(e)=>setDescription(e.target.value)}
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
                            <button type="submit" className="registerButton" onClick={addExercise}>
                                DODAJ
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
