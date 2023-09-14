import React, { useState, useEffect } from 'react'
import { Box, Grid, Typography, TextField, Stack, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import '../css/register.css';
import { makeStyles } from '@mui/styles';
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
        alert('Failed to fetch user data.');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      alert('Failed to fetch user data.');
    }
  };
    
  const saveData = async (e) => {
    e.preventDefault();

    const validationErrors = [];

    if (!login) {
      validationErrors.push('Login field is required.');
    }

    if (!email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      validationErrors.push('Email field is invalid.');
    }

    if (!firstName || !/^[A-Za-z]+$/.test(firstName)) {
      validationErrors.push('First name field is invalid. Only letters are allowed.');
    }

    if (!lastName || !/^[A-Za-z]+$/.test(lastName)) {
      validationErrors.push('Last name field is invalid. Only letters are allowed.');
    }

    if (isNaN(age)) {
      validationErrors.push('Age field is invalid. Must be a number.');
    }

    if (!/^[0-9]+(\.[0-9]+)?$/.test(weight)) {
      validationErrors.push('Weight field is invalid. Must be a number.');
    }

    if (!/^[0-9]+(\.[0-9]+)?$/.test(height)) {
      validationErrors.push('Height field is invalid. Must be a number.');
    }

    if (!/^[MK]$/.test(gender)) {
      validationErrors.push('Gender field is invalid. Must be "M" or "K".');
    }

    if (validationErrors.length > 0) {
      alert('Validation errors:\n' + validationErrors.join('\n'));
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
        alert('User data saved successfully.');
      } else {
        alert('Failed to save user data.');
      }
    } catch (error) {
      console.error('Error saving user data:', error);
      alert('Failed to save user data.');
    }
  };

  const deleteUser = async() => {
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
        alert('Failed to delete user data.');
      }
    } catch (error) {
      console.error('Error deleting user data:', error);
      alert('Failed to delete user data.');
    }
  }

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
            <Box display="flex" justifyContent="flex-end" spacing="2px">                        
              <button  type="submit" className="registerButton" onClick={saveData}>
                  ZAPISZ DANE
              </button>
              <button  type="button" className="registerButton" onClick={deleteUser}>
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