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
import { pl } from "date-fns/locale";


const locales = {
  "en-US": require("date-fns/locale/en-US"),
  "pl": pl,
};

const localizer = dateFnsLocalizer({
  format,
  parse: parseISO,
  startOfWeek,
  getDay,
  locales,
  culture: "pl",
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
  
        // Sprawdzamy, czy pole `exercises` istnieje i czy nie jest puste
        const exercises = training.exercises || [];
  
        return {
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
  const messages = {
    today: "Dziś",
    previous: "Poprzedni",
    next: "Następny",
    month: "Miesiąc",
    week: "Tydzień",
    day: "Dzień",
    agenda: "Plan treningów",
  };

  return (
    <div className="App">
      <h1>Kalendarz</h1>
      <Calendar
        localizer={localizer}
        events={trainings}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
        Views={['month', 'week', 'day', 'agenda']}
        defaultView={Views.MONTH}
        onSelectEvent={event => setSelectedTraining(event)}
        culture="pl"
        messages={messages}
      />
     {selectedTraining && (
  <div>
    <h2>Selected Training</h2>
    <p>Name: {selectedTraining.title}</p>
    <p>Date: {format(selectedTraining.start, "yyyy-MM-dd")}</p>
    <p>Begin Time: {format(selectedTraining.start, "HH:mm")}</p>
    <p>End Time: {format(selectedTraining.end, "HH:mm")}</p>
    <p>Description: {selectedTraining.description}</p>
    <h3>Exercises:</h3>
    <ul>
      {selectedTraining.exercises.map((exercise) => (
        <li key={exercise.exercise_id}>
          ID ćwiczenia: {exercise.exercise_id}
          <br />
          Ćwiczenie: {exercise.exercise_name}
          <br />
          Opis: {exercise.exercise_description}
          <br />
          Liczba serii: {exercise.set_amount} {/* Dodane */}
          <br />
          Liczba powtórzeń: {exercise.rep_amount} {/* Dodane */}
        </li>
      ))}
    </ul>
  </div>
)}
    </div>
  );  
}

export default Kalendarz;
