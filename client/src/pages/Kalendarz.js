import React, { useState, useEffect } from "react";
import {
  Calendar,
  dateFnsLocalizer,
  Views,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import parseISO from "date-fns/parseISO";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import format from "date-fns/format";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { Box, Grid, Stack, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

import "../css/training.css";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse: parseISO,
  startOfWeek,
  getDay,
  locales,
});

function Kalendarz() {
  const [token, setToken] = useState();
  const [trainings, setTrainings] = useState([]);
  const [selectedTraining, setSelectedTraining] = useState(null);

  const getTrainingsUrl = "http://localhost:3001/trainings/getTrainings";

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(";").shift();
    }
  };

  const transformTrainingsForCalendar = (trainings) => {
    return trainings.map((training) => {
      try {
        const startTime = parseISO(training.date);
        const beginTimeParts = training.begin_time.split(":");
        startTime.setHours(Number(beginTimeParts[0]));
        startTime.setMinutes(Number(beginTimeParts[1]));

        const endTime = parseISO(training.date);
        const endTimeParts = training.end_time.split(":");
        endTime.setHours(Number(endTimeParts[0]));
        endTime.setMinutes(Number(endTimeParts[1]));

        if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
          console.error("Invalid time value in training:", training);
          return null;
        }

        const exercises = training.exercises || [];

        return {
          id: training.training_id,
          title: training.training_name,
          start: startTime,
          end: endTime,
          description: training.training_description,
          exercises: exercises,
        };
      } catch (error) {
        console.error("Error transforming training:", error);
        return null;
      }
    }).filter(Boolean);
  };


  const getTrainings = async () => {
    try {
      const response = await axios.get(getTrainingsUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        console.log("Response from server:", response.data);
        const transformedTrainings = transformTrainingsForCalendar(response.data);
        setTrainings(transformedTrainings);
      } else {
        console.error("Error getting trainings. Status code:", response.status);
        alert("Error getting trainings");
      }
    } catch (error) {
      console.error("Error getting trainings:", error);
      alert("Error getting trainings");
    }
  };

  useEffect(() => {
    const sessionData = getCookie("session_data");
    if (sessionData) {
      setToken(sessionData);
    }
  }, []);

  useEffect(() => {
    if (token) {
      getTrainings();
    }
  }, [token]);

  const handleTrainingClick = (event) => {
    setSelectedTraining(event);
    console.log(event); // Dodaj tę linię, aby wyświetlić obiekt w konsoli
  };

  function handleButtonClick() {
    window.location.href = `/trainings/edit/${selectedTraining.id}`;
  }

  return (
    <div className="App">
      <h1>Calendar</h1>
      <Calendar
        localizer={localizer}
        events={trainings}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
        Views={['month', 'week', 'day', 'agenda']}
        defaultView={Views.MONTH}
        onSelectEvent={event => setSelectedTraining(event)}
      />
      {selectedTraining && (
        <Stack direction="row" marginTop="2%" marginBottom="3%">
          <Box width="50%">
            <Grid container className="stack">
              <Box className="formBox">
                <Stack direction="column">
                  <Box display="flex" justifyContent="center">
                    <Box className="statsHeader">
                      Szczegóły
                    </Box>
                  </Box>
                  <Box marginTop="4">
                    <Box>
                      <TableContainer component={Paper} sx={{
                        backgroundColor: "#6422b8",
                      }}>
                        <Table>
                          <TableBody>
                            <TableRow>
                              <TableCell sx={{
                                color: "#ffd93b",
                                fontWeight: "bold"
                              }}>Nazwa</TableCell>
                              <TableCell sx={{
                                color: "#ffd93b"
                              }}>{selectedTraining.title}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell sx={{
                                color: "#ffd93b",
                                fontWeight: "bold"
                              }}>Opis</TableCell>
                              <TableCell sx={{
                                color: "#ffd93b"
                              }}>{selectedTraining.description}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell sx={{
                                color: "#ffd93b",
                                fontWeight: "bold"
                              }}>Data</TableCell>
                              <TableCell sx={{
                                color: "#ffd93b"
                              }}>{selectedTraining.start.toLocaleDateString()}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell sx={{
                                color: "#ffd93b",
                                fontWeight: "bold"
                              }}>Czas rozpoczęcia</TableCell>
                              <TableCell sx={{
                                color: "#ffd93b"
                              }}>{selectedTraining.start.toLocaleTimeString()}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell sx={{
                                color: "#ffd93b",
                                fontWeight: "bold"
                              }}>Czas zakończenia</TableCell>
                              <TableCell sx={{
                                color: "#ffd93b"
                              }}>{selectedTraining.end.toLocaleTimeString()}</TableCell>
                            </TableRow>

                          </TableBody>
                        </Table>
                      </TableContainer>
                      <Box display="flex" justifyContent="flex-end" marginTop="20px">
                        <button type="submit" className="registerButton" onClick={handleButtonClick}>
                          Edytuj trening
                        </button>
                      </Box>
                    </Box>
                  </Box>
                </Stack>
              </Box>
            </Grid>
          </Box>
          <Box width="50%">
            <Grid container className="stack">
              <Box className="formBox">
                <Stack direction="column">
                  <Box display="flex" justifyContent="center">
                    <Box className="statsHeader">
                      Ćwiczenia
                    </Box>
                  </Box>
                  <Box marginTop="4">
                    <Box>
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
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {selectedTraining.exercises.map((exercise) => (
                              <TableRow key={exercise.exercise_id}>
                                <TableCell sx={{
                                  color: "#ffd93b"
                                }}>{exercise.exercise_name}</TableCell>
                                <TableCell sx={{
                                  color: "#ffd93b"
                                }}>{exercise.exercise_description}</TableCell>
                                <TableCell sx={{
                                  color: "#ffd93b"
                                }}>{exercise.set_amount}</TableCell>
                                <TableCell sx={{
                                  color: "#ffd93b"
                                }}>{exercise.rep_amount}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Box>
                  </Box>
                </Stack>
              </Box>
            </Grid>
          </Box>
        </Stack>
      )}
    </div>
  );
}

export default Kalendarz;
