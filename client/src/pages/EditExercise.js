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
function mapPartNameToNumber(partName) {
    switch (partName) {
      case 'Klatka piersiowa':
        return 1;
      case 'Plecy':
        return 2;
      case 'Barki':
        return 3;
      case 'Biceps':
        return 4;
      case 'Triceps':
        return 5;
      case 'Brzuch':
        return 6;
      case 'Nogi':
        return 7;
      case 'Pośladki':
        return 8;
      default:
        return 1;
    }
  }

const EditExercise = () => {
    const [name, setName] = useState('');
    const [part, setPart] = useState('');
    const [description, setDescription] = useState('');
    const [token, setToken] = useState('');
    const exerciseId = window.location.pathname.split('/')[3];
    const getExerciseUrl = `http://localhost:3001/exercises/edit/${exerciseId}`;
    const updateExerciseUrl = `http://localhost:3001/exercises/edit/${exerciseId}`;
    const classes = useStyles();

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            return parts.pop().split(';').shift();
        }
    };

    const getExerciseData = async () => {
        try {
            const response = await axios.get(getExerciseUrl, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                const exerciseData = response.data;
                const partNumber = mapPartNameToNumber(exerciseData.category_name);
                setName(exerciseData.exercise_name);
                setPart(partNumber);
                setDescription(exerciseData.description);
            } 
            else if (response.status === 403) {
                const notify = () => toast("Brak autoryzacji");
                notify();
            }
            else {
                const notify = () => toast("Nie udało się pobrać ćwiczenia");
                notify();
            }
        } catch (error) {
            console.error('Error fetching exercise data:', error);
            const notify = () => toast("Nie udało się pobrać ćwiczenia");
            notify();
        }
    };

    useEffect(() => {
        const sessionData = getCookie('session_data');
        if (sessionData) {
            setToken(sessionData);
        }

    }, []);

    useEffect(() => {
        if (token) {
            getExerciseData();
        }
    }, [token]);

    const updateExercise = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(updateExerciseUrl, {
                name: name,
                part: part,
                description: description
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            if (response.status === 200) {
                const notify = () => toast("Ćwiczenie zaktualizowane pomyślnie");
                notify();
            }
            else {
                const notify = () => toast("Nie udało się zaktualizować ćwiczenia");
                notify();
            }
        }
        catch (error) {
            if (error.response && error.response.status === 422) {
                const notify = () => toast("Dane nie mogą być puste");
                notify();
            }
            else if (error.response && error.response.status === 409) {
                const notify = () => toast("Ćwiczenie o podanej nazwie już istnieje");
                notify();
            }
            else {
                console.error('Error:', error);
                const notify = () => toast("Nie udało się zaktualizować ćwiczenia. Spróbuj ponownie");
                notify();
            }
        }
    };

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
                                    margin="normal"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    InputProps={{
                                        style: {
                                            background: 'white',
                                            border: 'none',
                                            height: '100px',
                                            borderRadius: '20px',
                                        },
                                    }}
                                />
                            </Stack>
                            <Box display="flex" justifyContent="flex-end">
                                <button type="submit" className="registerButton" onClick={updateExercise}>
                                    Aktualizuj
                                </button>
                            </Box>
                        </Stack>
                    </form>
                </Box>
            </Grid>
        </Box>
    );
};

export default EditExercise;
