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
  
    const getTrainingsUrl = "http://localhost:3001/trainings/getStats";
  
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
            const startTime = parseISO(training.date); // Pobieramy datę z treningu
            const beginTimeParts = training.begin_time.split(":"); // Rozbijamy czas na godziny, minuty i sekundy
            startTime.setHours(Number(beginTimeParts[0])); // Ustawiamy godziny
            startTime.setMinutes(Number(beginTimeParts[1])); // Ustawiamy minuty
      
            const endTime = parseISO(training.date); // Pobieramy datę z treningu
            const endTimeParts = training.end_time.split(":"); // Rozbijamy czas na godziny, minuty i sekundy
            endTime.setHours(Number(endTimeParts[0])); // Ustawiamy godziny
            endTime.setMinutes(Number(endTimeParts[1])); // Ustawiamy minuty
      
            if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
              console.error("Invalid time value in training:", training);
              return null;
            }
      
            return {
              title: training.name,
              start: startTime,
              end: endTime,
              description: training.description,
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
          const transformedTrainings = transformTrainingsForCalendar(
            response.data
          );
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
    };
  
    return (
      <div className="App">
        <h1>Calendar</h1>
        <Calendar
          localizer={localizer}
          events={trainings}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500, margin: "50px" }}
          Views={['month', 'week', 'day', 'agenda']} // Dodajemy widoki 'week' i 'day'
          defaultView={Views.MONTH} // Domyślny widok na miesiąc
          onSelectEvent={event => setSelectedTraining(event)}
        />
        {selectedTraining && (
          <div>
            <h2>Selected Training</h2>
            <p>Name: {selectedTraining.title}</p>
            <p>Date: {format(selectedTraining.start, "yyyy-MM-dd")}</p>
            <p>Begin Time: {format(selectedTraining.start, "HH:mm")}</p>
            <p>End Time: {format(selectedTraining.end, "HH:mm")}</p>
            <p>Description: {selectedTraining.description}</p>
          </div>
        )}
      </div>
    );
  }
  
  export default Kalendarz;