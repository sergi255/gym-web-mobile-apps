import React, { useState, useEffect } from 'react'
import { Box, Grid, Typography, TextField, Stack, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import '../css/register.css';
import { makeStyles } from '@mui/styles';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles({
  selectBackground: {
    background: 'white',
    borderRadius: '20px',
  },
});

const Profil = () => {


  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [token, setToken] = useState('');

  const classes = useStyles();
  
  const getUserUrl = `http://localhost:3001/users/getUser`;
  const saveDataUrl = `http://localhost:3001/users/saveUser`;
  const deleteUserUrl = `http://localhost:3001/users/deleteUser`;

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    }
  };

  const clearForm = () => {
    setLogin('');
    setFirstName('');
    setLastName('');
    setEmail('');
    setHeight('');
    setWeight('');
    setAge('');
    setGender('');
  }

  const getUserData = async () => {
    try {
        const response = await axios.get(getUserUrl, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });              

      if (response.status === 200) {
        const userData = response.data;
        setLogin(userData.login);
        setFirstName(userData.first_name);
        setLastName(userData.last_name);
        setEmail(userData.email);
        setHeight(userData.height);
        setWeight(userData.weight);
        setAge(userData.age);
        setGender(userData.gender);
      } else {
        const notify = () => toast("Nie udało się pobrać danych użytkownika");
        notify();
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      const notify = () => toast("Nie udało się pobrać danych użytkownika");
      notify();
    }
  };
    
  const saveData = async (e) => {
    e.preventDefault();

    const validationErrors = [];

    if (!firstName || !/^[A-Za-z]+$/.test(firstName)) {
      validationErrors.push('Niepoprawne imię. Imię może się składać tylko z liter.\n');
    }

    if (!lastName || !/^[A-Za-z]+$/.test(lastName)) {
      validationErrors.push('Niepoprawne nazwisko. Nazwisko może się składać tylko z liter.\n');
    }

    if (isNaN(age)) {
      validationErrors.push('Niepoprawny wiek. Wiek musi być liczbą.\n');
    }

    if (!/^[0-9]+(\.[0-9]+)?$/.test(weight)) {
      validationErrors.push('Niepoprawna waga. Waga musi być liczbą.\n');
    }

    if (!/^[0-9]+(\.[0-9]+)?$/.test(height)) {
      validationErrors.push('Niepoprawny wiek. Wiek musi być liczbą.\n');
    }

    if (!/^[MK]$/.test(gender)) {
      validationErrors.push('Niepoprawna płeć. Płeć musi być "M" lub "K".\n');
    }

    if (validationErrors.length > 0) {
      const notify = () => toast(validationErrors.join('\n'));
      notify();
      return;
    }

    try {
      const response = await axios.put(
        saveDataUrl,
        {
          last_name: lastName,
          first_name: firstName,
          age,
          height,
          weight,
          gender,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const notify = () => toast("Dane zapisane pomyślnie");
        notify();
      } else {
        const notify = () => toast("Nie udało się zapisać danych");
        notify();
      }
    } catch (error) {
      console.error('Error saving user data:', error);
      const notify = () => toast("Nie udało się zapisać danych");
      notify();
    }
  };

  const deleteUser = async () => {
    const userConfirmed = window.confirm('Czy na pewno chcesz usunąć swoje konto?');
  
    if (userConfirmed) {
      try {
        const response = await axios.delete(deleteUserUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response.status === 200) {
          Cookies.remove('session_data');
          navigate('/');
        } else {
          const notify = () => toast("Nie udało się usunąć danych użytkownika.");
          notify();
        }
      } catch (error) {
        console.error('Błąd podczas usuwania danych użytkownika:', error);
        const notify = () => toast("Nie udało się usunąć danych użytkownika.");
        notify();
      }
    }
  };

  useEffect(() => {
      const sessionData = getCookie('session_data');
      clearForm();
      if(sessionData) {
          setToken(sessionData)
      }
      if (token) {
        getUserData();
      }
    }, [token]);

  return (
    <Stack direction="row" marginTop="2%">
  <Box width="50%">
    <Grid container className="stack">
      <Box className="formBox">
        <form>
      <Stack direction="column">
          <Stack direction="row" alignItems="center">
            <Typography variant="h5" mr="20px" fontWeight="600">LOGIN</Typography>
            <TextField
                fullWidth
                margin="normal"
                disabled
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
                <Typography variant="h5" mr="20px" fontWeight="600">IMIĘ</Typography>
                <TextField
                    fullWidth
                    margin="normal"
                    value={firstName || ''}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder='Imię'
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
                <Typography variant="h5" mr="20px" fontWeight="600">NAZWISKO</Typography>
                <TextField
                    fullWidth
                    margin="normal"
                    placeholder='Nazwisko'
                    value={lastName || ''}
                    onChange={(e) => setLastName(e.target.value)}
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
                <Typography variant="h5" mr="20px" fontWeight="600">EMAIL</Typography>
                <TextField
                    fullWidth
                    margin="normal"
                    disabled
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
          </Stack>
        </form>
      </Box>
    </Grid>
  </Box>
  <Box width="50%" alignItems="right">
  <Grid container className="stack">
    <Box className="formBox">
      <form>
        <Stack direction="column">
          <Stack direction="row" alignItems="center">
              <Typography variant="h5" mr="20px" fontWeight="600">WZROST</Typography>
              <TextField
                  fullWidth
                  margin="normal"
                  value={height || ''}
                  placeholder='Wzrost'
                  onChange={(e) => setHeight(e.target.value)}
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
              <Typography variant="h5" mr="20px" fontWeight="600">WAGA</Typography>
              <TextField
                  fullWidth
                  margin="normal"
                  value={weight || ''}
                  placeholder='Waga'
                  onChange={(e) => setWeight(e.target.value)}
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
              <Typography variant="h5" mr="20px" fontWeight="600">WIEK</Typography>
              <TextField
                  fullWidth
                  margin="normal"
                  value={age || ''}
                  placeholder='Wiek'
                  onChange={(e) => setAge(e.target.value)}
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
              <Typography variant="h5" mr="20px" fontWeight="600">PŁEĆ</Typography>
              <Select
                fullWidth
                margin="normal"
                value={gender || ''}
                onChange={(e) => setGender(e.target.value)}
                classes={{ select: classes.selectBackground }}
              >
                <MenuItem value="K">K</MenuItem>
                <MenuItem value="M">M</MenuItem>
              </Select>
            </Stack>
            <Box display="flex" justifyContent="flex-end" mt="0.5rem">                        
              <button type="submit" className="registerButton" onClick={saveData}>
                  ZAPISZ DANE
              </button>
              <button type="button" className="registerButton" onClick={deleteUser}>
                  USUŃ KONTO
              </button>
            </Box>
        </Stack>
      </form>
    </Box>
  </Grid>
</Box>
</Stack>
);
};

export default Profil