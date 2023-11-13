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
} from '@mui/material';
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

const EditTraining = () => {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [beginTime, setBeginTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [description, setDescription] = useState('');
    const [token, setToken] = useState('');
    const [exerciseList, setExerciseList] = useState([]);
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [selectedExerciseId, setSelectedExerciseId] = useState('');
    const trainingId = window.location.pathname.split('/')[3];
    const getTrainingUrl = `http://localhost:3001/trainings/edit/${trainingId}`;
    const updateTrainingUrl = `http://localhost:3001/trainings/edit/${trainingId}`;
    const classes = useStyles();

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            return parts.pop().split(';').shift();
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(updateTrainingUrl, {
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
              const notify = () => toast("Trening zaktualizowany pomyślnie");
              notify();
            } else {
              const notify = () => toast("Nie udało sie zaktualizować treningu");
              notify();
            }
        } catch (error) {
            if (error.response && error.response.status === 422) {
                const notify = () => toast("Dane nie mogą być puste");
                notify();
            } else {
              const notify = () => toast("Nie udało sie zaktualizować treningu. Spróbuj ponownie");
              notify();
            }
        }
    };

    const getTrainingData = async () => {
        try {
            const response = await axios.get(getTrainingUrl, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                const trainingData = response.data;
                setName(trainingData.training_name);
                const formattedDate = getFormattedDate(trainingData.date);
                setDate(formattedDate);
                setBeginTime(trainingData.begin_time);
                setEndTime(trainingData.end_time);
                setDescription(trainingData.training_description);
                setSelectedExercises(trainingData.exercises);
            } else {
              const notify = () => toast("Nie udało sie pobrać danych treningu");
              notify();
            }
        } catch (error) {
            console.error('Error fetching training data:', error);
            const notify = () => toast("Nie udało sie pobrać danych treningu");
            notify();
        }
    };

    const getFormattedDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

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
              const notify = () => toast("Nie udało sie pobrać danych ćwiczeń");
              notify();
            }
        } catch (error) {
            console.error('Error fetching exercise data:', error);
            const notify = () => toast("Nie udało sie pobrać danych ćwiczeń");
            notify();
        }
    };

    const removeExercise = (exerciseId) => {
        const updatedExercises = selectedExercises.filter((exercise) => exercise.id !== exerciseId);
        setSelectedExercises(updatedExercises);
    };

    const handleExerciseChange = (e) => {
      e.preventDefault();
        if (selectedExerciseId) {
            const exercise = exerciseList.find((ex) => ex.id === selectedExerciseId);
            if (exercise && (!selectedExercises || !selectedExercises.length || !selectedExercises.find((e) => e.id === exercise.id))) {
                exercise.set_amount = exercise.set_amount || 1;
                exercise.rep_amount = exercise.rep_amount || 1;
                setSelectedExercises((prevSelectedExercises) => [
                    ...(Array.isArray(prevSelectedExercises) ? prevSelectedExercises : []),
                    exercise,
                ]);
            }
            setSelectedExerciseId('');
        }
    };
        
    useEffect(() => {
        const sessionData = getCookie('session_data');
        if (sessionData) {
            setToken(sessionData);
            getExerciseData(sessionData);
        }
    }, []);

    useEffect(() => {
        if (token) {
            getTrainingData();
        }
    }, [token]);

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
                  <Typography variant="h5" mr="20px" fontWeight="400">
                    ĆWICZENIE
                  </Typography>
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
                    disabled={!selectedExerciseId || (selectedExercises && selectedExercises.find((e) => e.id === selectedExerciseId))}
                  >
                    DODAJ DO TRENINGU
                  </button>
                  </Box>
                </Stack>
                <Box display="flex" justifyContent="flex-end" marginTop="25px">
                  <button type="submit" className="registerButton" onClick={handleUpdate}>
                    AKTUALIZUJ TRENING
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
              <Typography variant="h5" mr="20px" fontWeight="600">
                LISTA WYBRANYCH ĆWICZEŃ
              </Typography>
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
                    {selectedExercises &&
                      selectedExercises.map((exercise) => (
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
                              value={exercise.set_amount}
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
                          <TableCell>
                            <Select
                              fullWidth
                              value={exercise.rep_amount}
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
export default EditTraining;