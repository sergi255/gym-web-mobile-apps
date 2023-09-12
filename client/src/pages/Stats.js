import React, { useState, useEffect } from "react";
import { Box, Grid, Stack, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

import "../css/stats.css";
import axios from "axios";

const Stats = () => {
  const [token, setToken] = useState();
  const [stats, setStats] = useState({
    countTrainings: 0,
    totalTrainingTime: "",
    averageTrainingTime: ""
  });
  const [trainings, setTrainings] = useState();
  const [lastTrainingDate, setLastTrainingDate] = useState();
  const [chartData, setChartData] = useState();

  const getTrainingsUrl = "http://localhost:3001/trainings/getStats";

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(";").shift();
    }
  };

  const getTrainings = async () => {
    try {
      const response = await axios.get(getTrainingsUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setTrainings(response.data);
      }
    } catch (error) {
      console.error("Error getting trainings:", error);
      alert("Error getting trainings");
    }
  };

  const computeStats = () => {
    setChartData(prepareChartData)
    const computedStats = {
      countTrainings: trainings.length,
      totalTrainingTime: computeTotalTrainingTime(trainings),
      averageTrainingTime: computeAverageTrainingTime(trainings),
    };

    setStats(computedStats);
  };

  const computeTotalTrainingTime = (trainings) => {
    const totalSeconds = trainings.reduce((total, training) => {
      const beginTimeParts = training.begin_time.split(":");
      const endTimeParts = training.end_time.split(":");

      const beginHours = parseInt(beginTimeParts[0]);
      const beginMinutes = parseInt(beginTimeParts[1]);

      const endHours = parseInt(endTimeParts[0]);
      const endMinutes = parseInt(endTimeParts[1]);

      const trainingTimeInSeconds =
        endHours * 3600 +
        endMinutes * 60 -
        (beginHours * 3600 + beginMinutes * 60);

      return total + trainingTimeInSeconds;
    }, 0);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    return `${String(hours)}:${String(minutes).padStart(2, "0")}`;
  };

  const computeAverageTrainingTime = (trainings) => {
    const totalTrainingTime =
      parseInt(computeTotalTrainingTime(trainings)) * 3600;
    const countTrainings = trainings.length;

    if (countTrainings === 0) {
      return "00:00";
    }

    const averageTimeInSeconds = Math.round(totalTrainingTime / countTrainings);

    const hours = Math.floor(averageTimeInSeconds / 3600);
    const minutes = Math.floor((averageTimeInSeconds % 3600) / 60);

    return `${String(hours)}:${String(minutes).padStart(2, "0")}`;
  };

  const prepareChartData = () => {
    const sortedTrainings = [...trainings];
    
    sortedTrainings.sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const trainingsFormatedDate = sortedTrainings.map((training) => {
      const formattedDate = new Date(training.date).toLocaleDateString('pl-PL');
      return {
        ...training,
        date: formattedDate,
      };
    });

    const chartData = trainingsFormatedDate.map((training) => ({
      ...training,
      duration: calculateTrainingDuration(training),
    }));

    const lastTraining = chartData[chartData.length - 1];
    const lastTrainingDate = lastTraining.date;

    setLastTrainingDate(lastTrainingDate);
    return chartData;
  };

  const calculateTrainingDuration = (training) => {
    const beginTimeParts = training.begin_time.split(":");
    const endTimeParts = training.end_time.split(":");
    const beginHours = parseInt(beginTimeParts[0]);
    const beginMinutes = parseInt(beginTimeParts[1]);
    const endHours = parseInt(endTimeParts[0]);
    const endMinutes = parseInt(endTimeParts[1]);
    const duration = (endHours - beginHours) * 60 + (endMinutes - beginMinutes);
    return duration;
  };

  useEffect(() => {
    const sessionData = getCookie("session_data");
    if (sessionData) {
      setToken(sessionData);
    }
    if (token) {
      getTrainings();
    }
  }, [token]);

  useEffect(() => {
    if (trainings) {
      computeStats()
    }
  }, [trainings]);

  return (
    <Stack direction="row" marginTop="2%">
      <Box width="50%">
        <Grid container className="stack">
          <Box className="formBox">
            <Stack direction="column">
              <Box display="flex" justifyContent="center">
                <Box className="statsHeader">
                  Statystyki
                </Box>
              </Box>
              <Box marginTop="4%">
                {stats && (
                  <Box>
                    <TableContainer component={Paper} sx={{
                      backgroundColor:"#6422b8",
                    }}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{
                            color:"#ffd93b",
                            fontWeight:"bold"
                          }}>Liczba treningów</TableCell>
                            <TableCell sx={{
                            color:"#ffd93b",
                            fontWeight:"bold"
                          }}>Całkowity czas treningów</TableCell>
                            <TableCell sx={{
                            color:"#ffd93b",
                            fontWeight:"bold"
                          }}>Średni czas treningu</TableCell>
                            <TableCell sx={{
                            color:"#ffd93b",
                            fontWeight:"bold"
                          }}>Data ostatniego treningu</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell sx={{
                            color:"#ffd93b"
                          }}>{stats.countTrainings}</TableCell>
                            <TableCell sx={{
                            color:"#ffd93b"
                          }}>{stats.totalTrainingTime}</TableCell>
                            <TableCell sx={{
                            color:"#ffd93b"
                          }}>{stats.averageTrainingTime}</TableCell>
                            <TableCell sx={{
                            color:"#ffd93b"
                          }}>{lastTrainingDate}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                )}
              </Box>
            </Stack>
          </Box>
        </Grid>
      </Box>
      <Box width="50%" alignItems="right">
        <Grid container className="stack">
          <Box className="formBox">
            <Stack direction="column">
              <Box display="flex" justifyContent="center">
                <Box className="statsHeader">
                  Długość trwania treningu w czasie
                </Box>
              </Box>
              <Box display="flex" justifyContent="center" mt={2}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" stroke="#ffd93b"/>
                  <YAxis stroke="#ffd93b"/>
                  <Tooltip
                    labelStyle={{ color: "#ffd93b" }}
                    contentStyle={{ backgroundColor: "#6422b8" }}
                  />
                  <Line type="monotone" dataKey="duration" name="Długość treningu (minuty)" stroke="#ffd93b" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
              </Box>
            </Stack>
          </Box>
        </Grid>
      </Box>
    </Stack>
  );
};

export default Stats;