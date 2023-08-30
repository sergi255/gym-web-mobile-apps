import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import '../css/register.css';
import Cookies from 'js-cookie';
import axios from 'axios';

const BrowseExercise = () => {
    const navigate = useNavigate();
    const [exerciseData, setExerciseData] = useState([]);
    const [token, setToken] = useState('');

    const getExerciseUrl = 'http://localhost:3001/exercises/browse';

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
                const data = response.data;
                setExerciseData(data); // Ustaw dane w stanie
            } else {
                alert('Failed to fetch exercise data.');
            }
        } catch (error) {
            console.error('Error fetching exercise data:', error);
            alert('Failed to fetch exercise data.');
        }
    };

    useEffect(() => {
        const sessionData = getCookie('session_data');
        if(sessionData) {
            setToken(sessionData);
        }
        if (token) {
            getExerciseData();
        }
    }, [token]);

    return (
        <Box width="100%" marginTop="2%">
            <Grid container className="stack">
                <Box className="formBox">
                    <Box id="app-wrapper" sx={{ alignItems: 'center' }}>
                        <TableContainer sx={{ maxWidth: '1500px', height: '80vh' }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ border: '1px solid #ccc', fontSize: '16px', fontWeight: 'bold' }}>Name</TableCell>
                                        <TableCell sx={{ border: '1px solid #ccc', fontSize: '16px', fontWeight: 'bold' }}>Description</TableCell>
                                        <TableCell sx={{ border: '1px solid #ccc', fontSize: '16px', fontWeight: 'bold' }}>Kategoria</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {exerciseData.map((exercise, index) => (
                                        <TableRow key={index}>
                                            <TableCell sx={{ border: '1px solid #ccc' }}>{exercise.name}</TableCell>
                                            <TableCell sx={{ border: '1px solid #ccc' }}>{exercise.description}</TableCell>
                                            <TableCell sx={{ border: '1px solid #ccc' }}>{exercise.category}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Box>
            </Grid>
        </Box>
    );
};

export default BrowseExercise;
