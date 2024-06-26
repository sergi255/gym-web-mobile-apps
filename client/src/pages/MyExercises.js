import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Select,
  MenuItem,
} from '@mui/material';
import axios from 'axios';
import ExercisesTable from '../components/ExercisesTable'
import '../css/myExercises.css';
import { makeStyles } from '@mui/styles';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles({
  selectBackground: {
    background: 'white',
    borderRadius: '20px',
    height: '20px'
  },
});
const MyExercises = () => {
  const [token, setToken] = useState();
  const [exercises, setExercises] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const getExercisesUrl = 'http://localhost:3001/exercises/getUserExercises';
  const deleteExercisesUrl = 'http://localhost:3001/exercises/deleteExercises';
  const getCategoriesUrl = 'http://localhost:3001/categories';
  const classes = useStyles();
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
        const notify = () => toast("Nie udało się pobrać danych ćwiczeń");
        notify();
      }
    } catch (error) {
      console.error('Error fetching exercise data:', error);
      const notify = () => toast("Nie udało się pobrać danych ćwiczeń");
      notify();
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
        const notify = () => toast("Ćwiczenie usunięto pomyślnie");
        notify();
        setSelected([]);
        getExerciseData();
      }
    } catch (error) {
      console.error('Error deleting exercise data:', error);
      const notify = () => toast("Nie udało się usunąć ćwiczenia");
      notify();
    }
  };


  const getCategoriesData = async () => {
    try {
      const response = await axios.get(getCategoriesUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setCategories(response.data);
      }
      else {
        const notify = () => toast("Nie udało się pobrać danych katergorii");
        notify();
      }
    } catch (error) {
      console.error('Error fetching categories data:', error);
      const notify = () => toast("Nie udało się pobrać danych katergorii");
      notify();
    }
  };

  useEffect(() => {
    const sessionData = getCookie('session_data');
    if (sessionData) {
      setToken(sessionData);
    }
    if (token) {
      getExerciseData();
      getCategoriesData();
    }
  }, [token]);

  useEffect(() => {
    setPage(0);
  }, [selectedCategory]);

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
      if (orderBy === 'exercise_name') {
        return order === 'desc' ? b.exercise_name.localeCompare(a.exercise_name) : a.exercise_name.localeCompare(b.exercise_name);
      }
      if (orderBy === 'category_name') {
        return order === 'desc' ? b.category_name.localeCompare(a.category_name) : a.category_name.localeCompare(b.category_name);
      }
      return 0;
    };
  }
  
  return (
    <Box width="100%" marginTop="2%">
      <Grid container className="stack">
        <Box className="exercisesTable" overflow="auto">
        <Box className="filters">
          <label htmlFor="category">Wybierz kategorię: </label>
          <Select
            value={selectedCategory}
            onChange={(event) => {
              const newCategory = event.target.value;
              setSelectedCategory(newCategory);
            }}
            classes={{ select: classes.selectBackground }}
          >
            <MenuItem value="all">Wszystkie</MenuItem>
            <MenuItem value="Klatka piersiowa">Klatka piersiowa</MenuItem>
            <MenuItem value="Plecy">Plecy</MenuItem>
            <MenuItem value="Barki">Barki</MenuItem>
            <MenuItem value="Biceps">Biceps</MenuItem>
            <MenuItem value="Triceps">Triceps</MenuItem>
            <MenuItem value="Brzuch">Brzuch</MenuItem>
            <MenuItem value="Nogi">Nogi</MenuItem>
            <MenuItem value="Pośladki">Pośladki</MenuItem>
          </Select>
        </Box>
          <ExercisesTable
            exercises={exercises}
            selectedCategory={selectedCategory}
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