import React, { useState } from 'react';
import { Box, Grid, Typography, TextField, Stack } from '@mui/material';
import '../css/register.css';
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const [email, setEmail] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const apiUrl = `http://localhost:3001/users/register`;

    const handleRegister= async (e) => {
        e.preventDefault();
        if(!email || !login || !password){
            const notify = () => toast("Dane rejestracji nie mogą być puste");
            notify();
        }
        else if (!email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            const notify = () => toast("Niepoprawny adres email");
            notify();
          }
        else{
        try {
            const response = await axios.post(apiUrl, {
                email: email,
                login: login,
                password: password
            }, {
                headers: {
                'Content-Type': 'application/json',
              }
            });

            if (response.status === 200) {
                const notify = () => toast("Użytkownik utworzony pomyślnie");
                notify();
            } 
            else {
                const notify = () => toast("Rejestracja nieudane, spróbuj ponownie");
                notify();
            }

        } catch (error) {
            if (error.response && error.response.status === 422) {
                const notify = () => toast("Dane rejestracji nie mogą być puste");
                notify();
            }
            else if(error.response && error.response.status === 409){
                const notify = () => toast("Użytkownik o podanym adresie e-mail już istnieje");
                notify();
            } 
            else {
                console.error('Error:', error);
                const notify = () => toast("Rejestracja nieudane, spróbuj ponownie");
                notify();
            }
        }
        setEmail('');
        setLogin('');
        setPassword('');
        }
    };

    return (
    <Box width="50%">
        <Grid container className="stack">
            <Box className="formBox">
                <form>
                    <Stack direction="column">
                        <Stack direction="row" alignItems="center">
                            <Typography variant="h5" mr="20px" fontWeight="600">EMAIL</Typography>
                            <TextField
                                label="Email"
                                fullWidth
                                margin="normal"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                            <Typography variant="h5" mr="20px" fontWeight="600">LOGIN</Typography>
                            <TextField
                                label="Login"
                                fullWidth
                                margin="normal"
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
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
                            <Typography variant="h5" mr="20px" fontWeight="600">HASŁO</Typography>
                            <TextField
                                label="Hasło"
                                fullWidth
                                margin="normal"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                            <button  type="submit" className="registerButton" onClick={handleRegister}>
                                REJESTRACJA
                            </button>
                        </Box>
                    </Stack>
                </form>
            </Box>
        </Grid>
    </Box>
    );
};

export default Register;
