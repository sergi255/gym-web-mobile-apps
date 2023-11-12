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

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            return parts.pop().split(';').shift();
        }
    };

    const handleAdd = async (e) => {
        console.log(selectedExercises);
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
                alert('Training added successfully.');
                setName('');
                setDate('');
                setBeginTime('');
                setEndTime('');
                setDescription('');
                setSelectedExercises([]);
            } else {
                alert('Failed to add training.');
            }
        } catch (error) {
            if (error.response && error.response.status === 422) {
                alert('Input data cannot be empty.');
            } else if (error.response && error.response.status === 409) {
                alert('Training already exists.');
            } else {
                console.error('Error:', error);
                alert('Failed to add training. Please try again.');
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
                alert('Failed to fetch exercise data.');
            }
        } catch (error) {
            console.error('Error fetching exercise data:', error);
            alert('Failed to fetch exercise data.');
        }
    };

    const handleExerciseChange = () => {
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
                                <Stack direction="row" alignItems="center">
                                    <Typography variant="h5" mr="20px" fontWeight="400">ĆWICZENIE</Typography>
                                    <Select
                                        fullWidth
                                        value={selectedExerciseId}
                                        onChange={(e) => setSelectedExerciseId(e.target.value)}
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
                    <Box className="formBox">
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
                                            }}>ID</TableCell>
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
                                            }}>Usuń</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {selectedExercises.map((exercise) => (
                                            <TableRow key={exercise.id}>
                                                <TableCell sx={{
                                                    color: "#ffd93b"
                                                }}>{exercise.id}</TableCell>
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
