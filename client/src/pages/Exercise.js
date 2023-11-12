import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, TextField, Stack, Select, MenuItem } from '@mui/material';
import '../css/register.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles({
  selectBackground: {
    background: 'white',
    borderRadius: '20px',
    height: '20px'
  },
});

const Exercise = () => {
    const [name, setName] = useState('');
    const [part, setPart] = useState('');
    const [description, setDescription] = useState('');
    const [token, setToken] = useState('');
    const addExerciseUrl = `http://localhost:3001/exercises/addExercise`;

    const classes = useStyles();

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
                const notify = () => toast("Ćwiczenie dodano pomyślnie");
                notify();
                setName('');
                setPart('');
                setDescription('');
            } 
            else {
                const notify = () => toast("Nie udało się dodać ćwiczenia");
                notify();
            }

        } catch (error) {
            if (error.response && error.response.status === 422) {
                const notify = () => toast("Dane nie mogą być puste");
                notify();
            }
            else if(error.response && error.response.status === 409){
                const notify = () => toast("Ćwiczenie o podanej nazwie już istnieje");
                notify();
            } 
            else {
                console.error('Error:', error);
                const notify = () => toast("Nie udało się dodać ćwiczenia. Spróbuj ponownie");
                notify();
            }
        }
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
                                placeholder='Nazwa'
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
                                classes={{ select: classes.selectBackground }}
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
                                type="textarea"
                                margin="normal"
                                placeholder='Opis'
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
