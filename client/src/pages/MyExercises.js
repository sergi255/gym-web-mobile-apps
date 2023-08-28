import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
} from '@mui/material';
import axios from 'axios';
import ExercisesTable from '../components/ExercisesTable'
import '../css/myExercises.css';

const MyExercises = () => {
  const [token, setToken] = useState();
  const [exercises, setExercises] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const getExercisesUrl = 'http://localhost:3001/exercises/getUserExercises';
  const deleteExercisesUrl = 'http://localhost:3001/exercises/deleteExercises';

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

  const handleDeleteExercises = async () => {
    try {
      const response = await axios({
        method: 'delete',
        url: deleteExercisesUrl,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          exerciseIds: selected,
        },
      });
      
      if (response.status === 200) {
        alert('Exercise deleted successfully.');
        setSelected([]);
        getExerciseData();
      }
    } catch (error) {
      console.error('Error deleting exercise data:', error);
      alert('Failed to delete exercise data.');
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

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const visibleRows = React.useMemo(
    () =>
      exercises.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [page, rowsPerPage, exercises],
  );
  
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = exercises.map((exercise) => exercise.id);
      setSelected(newSelected);
    } else {
      setSelected([]);
    }
  };
  
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  useEffect(()=>{
  }, [selected]
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
        return order === 'desc' ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name);
      }
      if (orderBy === 'category_id') {
        return order === 'desc' ? b.category_id - a.category_id : a.category_id - b.category_id;
      }
      return 0;
    };
  }
  
  return (
    <Box width="100%" marginTop="2%">
      <Grid container className="stack">
        <Box className="exercisesTable" overflow="auto">
          <ExercisesTable
            exercises={exercises}
            order={order}
            orderBy={orderBy}
            selected={selected}
            page={page}
            rowsPerPage={rowsPerPage}
            dense={dense}
            handleDeleteExercises={handleDeleteExercises}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            isSelected={isSelected}
            visibleRows={visibleRows}
            handleSelectAllClick={handleSelectAllClick}
            handleClick={handleClick}
            handleRequestSort={handleRequestSort}
          />
        </Box>
      </Grid>
    </Box>
  );
};

export default MyExercises;