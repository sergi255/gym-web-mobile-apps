import React, { useState, useEffect } from 'react';
import {
    Box,
    Grid,
    Typography,
    TextField,
    Stack,
    Select,
    MenuItem,
    Paper,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
} from '@mui/material';

import "../css/register.css";

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

const Training = () => {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [beginTime, setBeginTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [description, setDescription] = useState('');
    const [token, setToken] = useState('');
    const [exerciseList, setExerciseList] = useState([]);
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [selectedExerciseId, setSelectedExerciseId] = useState('');
    const apiUrl = `http://localhost:3001/trainings/add`;
    const classes = useStyles();
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
                description: description,
                selectedExercises: selectedExercises,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                const notify = () => toast("Trening dodano pomyślnie");
                notify();
                setName('');
                setDate('');
                setBeginTime('');
                setEndTime('');
                setDescription('');
                setSelectedExercises([]);
            } else {
                const notify = () => toast("Nie udało się dodać treningu");
                notify();
            }
        } catch (error) {
            if (error.response && error.response.status === 422) {
                const notify = () => toast("Dane nie mogą być puste");
                notify();
            } else if (error.response && error.response.status === 409) {
                const notify = () => toast("Trening o podanej nazwie już istnieje");
                notify();
            } else {
                console.error('Error:', error);
                const notify = () => toast("Nie udało się dodać treningu. Spróbuj ponownie");
                notify();
            }
        }
    };

    const removeExercise = (exerciseId) => {
        const updatedExercises = selectedExercises.filter((exercise) => exercise.id !== exerciseId);
        setSelectedExercises(updatedExercises);
    };

    useEffect(() => {
        const sessionData = getCookie('session_data');
        if (sessionData) {
            setToken(sessionData);
        }
    }, []);

    useEffect(() => {
        const sessionData = getCookie('session_data');
        if (sessionData) {
            setToken(sessionData);
            getExerciseData(sessionData);
        }
    }, []);

    const getExerciseData = async (token) => {
        try {
            const response = await axios.get('http://localhost:3001/exercises/getExercises', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                setExerciseList(response.data);
            } else {
                const notify = () => toast("Nie udało się pobrać ćwiczeń");
                notify();
            }
        } catch (error) {
            console.error('Error fetching exercise data:', error);
            const notify = () => toast("Nie udało się pobrać ćwiczeń");
            notify();
        }
    };

    const handleExerciseChange = (e) => {
        e.preventDefault();
        if (selectedExerciseId) {
            const exercise = exerciseList.find((ex) => ex.id === selectedExerciseId);
            if (exercise && !selectedExercises.find((e) => e.id === exercise.id)) {
                exercise.set_amount = exercise.set_amount || 1;
                exercise.rep_amount = exercise.rep_amount || 1;
                setSelectedExercises((prevSelectedExercises) => [
                    ...prevSelectedExercises,
                    exercise,
                ]);
            }
            setSelectedExerciseId('');
        }
    };

    return (
        <Stack direction="row" marginTop="2%">
            <Box width="50%">
                <Grid container className="stack">
                    <Box className="trainingBox">
                        <form>
                            <Stack direction="column">
                                <Stack direction="row" alignItems="center">
                                    <Typography variant="h5" mr="20px" fontWeight="600">NAZWA</Typography>
                                    <TextField
                                        fullWidth
                                        placeholder='Nazwa'
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
                                <Stack direction="row" alignItems="center">
                                    <Typography variant="h5" mr="20px" fontWeight="400">ĆWICZENIE</Typography>
                                    <Select
                                        fullWidth
                                        value={selectedExerciseId}
                                        onChange={(e) => setSelectedExerciseId(e.target.value)}
                                        classes={{ select: classes.selectBackground }}
                                    >
                                        <MenuItem value="" disabled>
                                            Wybierz ćwiczenie
                                        </MenuItem>
                                        {exerciseList.map((exercise) => (
                                            <MenuItem key={exercise.id} value={exercise.id}>
                                                {exercise.exercise_name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <Box display="flex" justifyContent="flex-end" marginLeft="25px">
                                    <button
                                        variant="contained"
                                        className="registerButton"
                                        onClick={handleExerciseChange}
                                        disabled={!selectedExerciseId || selectedExercises.find((e) => e.id === selectedExerciseId)}
                                    >
                                        DODAJ DO TRENINGU
                                    </button>
                                    </Box>
                                </Stack>
                                <Box display="flex" justifyContent="flex-end" marginTop="25px">
                                    <button type="submit" className="registerButton" onClick={handleAdd}>
                                        DODAJ TRENING
                                    </button>
                                </Box>
                            </Stack>
                        </form>
                    </Box>
                </Grid>
            </Box>
            <Box width="50%">
                <Grid container className="stack">
                    <Box className="trainingBox">
                        <Stack direction="column">
                            <Typography variant="h5" mr="20px" fontWeight="600">LISTA WYBRANYCH ĆWICZEŃ</Typography>
                            <TableContainer component={Paper} sx={{
                                backgroundColor: "#6422b8",
                            }}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{
                                                color: "#ffd93b",
                                                fontWeight: "bold"
                                            }}>Nazwa</TableCell>
                                            <TableCell sx={{
                                                color: "#ffd93b",
                                                fontWeight: "bold"
                                            }}>Opis</TableCell>
                                            <TableCell sx={{
                                                color: "#ffd93b",
                                                fontWeight: "bold"
                                            }}>Ilość serii</TableCell>
                                            <TableCell sx={{
                                                color: "#ffd93b",
                                                fontWeight: "bold"
                                            }}>Ilość powtórzeń</TableCell>
                                            <TableCell sx={{
                                                color: "#ffd93b",
                                                fontWeight: "bold"
                                            }}>Akcja</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {selectedExercises.map((exercise) => (
                                            <TableRow key={exercise.id}>
                                                <TableCell sx={{
                                                    color: "#ffd93b"
                                                }}>{exercise.exercise_name}</TableCell>
                                                <TableCell sx={{
                                                    color: "#ffd93b"
                                                }}>{exercise.description}</TableCell>
                                                <TableCell sx={{
                                                    color: "#ffd93b"
                                                }}>
                                                    <Select
                                                        fullWidth
                                                        value={exercise.set_amount || 1}
                                                        onChange={(e) => {
                                                            exercise.set_amount = e.target.value;
                                                            setSelectedExercises([...selectedExercises]);
                                                        }}
                                                        classes={{ select: classes.selectBackground }}
                                                    >
                                                        {Array.from({ length: 10 }, (_, i) => (
                                                            <MenuItem key={i} value={i + 1}>
                                                                {i + 1}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </TableCell>
                                                <TableCell sx={{
                                                    color: "#ffd93b"
                                                }}>
                                                    <Select
                                                        fullWidth
                                                        value={exercise.rep_amount || 1}
                                                        onChange={(e) => {
                                                            exercise.rep_amount = e.target.value;
                                                            setSelectedExercises([...selectedExercises]);
                                                        }}
                                                        classes={{ select: classes.selectBackground }}
                                                    >
                                                        {Array.from({ length: 20 }, (_, i) => (
                                                            <MenuItem key={i} value={i + 1}>
                                                                {i + 1}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </TableCell>
                                                <TableCell>
                                                    <button
                                                        className="deleteButton"
                                                        onClick={() => removeExercise(exercise.id)}
                                                    >
                                                        Usuń
                                                    </button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Stack>
                    </Box>
                </Grid>
            </Box>
        </Stack>
    );
};

export default Training;
