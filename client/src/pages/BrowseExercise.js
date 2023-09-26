import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
} from '@mui/material';
import axios from 'axios';
import ExercisesTable from '../components/BrowseExercisesTable'
import '../css/myExercises.css';

const BrowseExercises = () => {
  const [token, setToken] = useState();
  const [exercises, setExercises] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const getExercisesUrl = 'http://localhost:3001/exercises/getUserExercises';

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    }
  };

  const getExerciseData = async () => {
    try {
      const response = await axios.get(getExercisesUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const sortedExercises = stableSort(response.data, getComparator(order, orderBy));
        setExercises(sortedExercises);
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
    if (sessionData) {
      setToken(sessionData);
    }
    if (token) {
      getExerciseData();
    }
  }, [token]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = React.useMemo(
    () =>
      exercises.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [page, rowsPerPage, exercises],
  );
  

  useEffect(()=>{
  }, []
  )
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);

    const sortedExercises = stableSort(exercises, getComparator(isAsc ? 'desc' : 'asc', property));
    setExercises(sortedExercises);
  };

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function getComparator(order, orderBy) {
    return (a, b) => {
      if (orderBy === 'name') {
        // Sprawdź, czy 'name' istnieje w obiektach 'a' i 'b'
        if (a.name && b.name) {
          return order === 'desc' ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name);
        }
        // Jeśli 'name' jest niezdefiniowane w jednym z obiektów, porównaj je inaczej lub zwróć 0
        return 0;
      }
      if (orderBy === 'category_id') {
        return order === 'desc' ? b.category_id - a.category_id : a.category_id - b.category_id;
      }
      return 0;
    };
  }
  
// ... reszta kodu ...

return (
  <Box width="100%" marginTop="2%">
    <Grid container className="stack">
      <Box className="exercisesTable" overflow="auto">
        <ExercisesTable
          exercises={exercises} 
          order={order}
          orderBy={orderBy}
          page={page}
          rowsPerPage={rowsPerPage}
          dense={dense}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          visibleRows={visibleRows}
          handleRequestSort={handleRequestSort}
        />
      </Box>
    </Grid>
  </Box>
);

};

export default BrowseExercises;