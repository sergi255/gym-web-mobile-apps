import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Agenda } from 'react-native-calendars';
import axios from 'axios';
import moment from 'moment';
import { API_URL } from '../app/context/AuthContext';
import 'moment-duration-format';
import { TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';

interface Exercise {
  exercise_id: number;
  exercise_name: string;
  exercise_description: string;
  set_amount: number;
  rep_amount: number;
}

interface Training {
  title: string;
  start: Date;
  end: Date;
  description: string;
  exercises: Exercise[];
}

interface TrainingsByDate {
  [date: string]: Training[];
}

interface AgendaEntry {
  name: string;
  height: number;
  day: Date;
  data?: any;
}

interface AgendaSchedule {
  [date: string]: AgendaEntry[];
}

const MyTrainings = () => {
  const [trainings, setTrainings] = useState<AgendaSchedule>({});
  const [selectedTraining, setSelectedTraining] = useState<Training | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedDate, setSelectedDate] = useState<string>(moment().format('YYYY-MM-DD'));

  const getTrainings = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_URL}/trainings/getTrainings`);
      
      console.log("Response data:", response.data); // Dodaj ten log
  
      if (response.status === 200) {
        const transformedTrainings = transformTrainingsForCalendar(response.data);
        setTrainings(transformedTrainings);
      } else {
        console.error("Error getting trainings. Status code:", response.status);
        alert("Error getting trainings");
      }
    } catch (error) {
      console.error("Error getting trainings:", error);
      alert("Error getting trainings");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTrainings();
  }, []);

  const renderItem = (item: any) => {
    const isExpanded = selectedTraining === item.data;

    const handleTrainingClick = (event: Training) => {
      setSelectedTraining(isExpanded ? null : event);
    };

    return (
      <View style={styles.item}>
        <TouchableOpacity onPress={() => handleTrainingClick(item.data)}>
          <View>
            <Text>{item.data.title}</Text>
            <Text>Begin Time: {moment(item.data.start).format('HH:mm')}</Text>
            <Text>End Time: {moment(item.data.end).format('HH:mm')}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const transformTrainingsForCalendar = (trainings: any[]): AgendaSchedule => {
    const transformedTrainings: AgendaSchedule = {};

    trainings.forEach((training) => {
      try {
        const dateKey = moment(training.date).format('YYYY-MM-DD');
        const startTime = moment(training.begin_time, 'HH:mm:ss');
        const endTime = moment(training.end_time, 'HH:mm:ss');

        const isValidTime = (timeString: string): boolean => {
          return moment(timeString, 'HH:mm:ss', true).isValid();
        };

        if (
          !isNaN(startTime.valueOf()) &&
          !isNaN(endTime.valueOf()) &&
          isValidTime(training.begin_time) &&
          isValidTime(training.end_time)
        ) {
          if (!transformedTrainings[dateKey]) {
            transformedTrainings[dateKey] = [];
          }

          const exercises: Exercise[] = training.exercises || [];
          const transformedTraining: AgendaEntry = {
            name: training.training_name,
            height: 80,
            day: startTime.toDate(),
            data: {
              title: training.training_name,
              start: startTime.toDate(),
              end: endTime.toDate(),
              description: training.training_description,
              exercises: exercises,
            },
          };

          transformedTrainings[dateKey].push(transformedTraining);
        } else {
          console.error("Nieprawidłowa wartość czasu w treningu:", training);
        }
      } catch (error) {
        console.error("Błąd podczas przetwarzania treningu:", error);
        console.error("Trening powodujący błąd:", training);
      }
    });

    return transformedTrainings;
  };
  

  const handleTrainingClick = (event: Training) => {
    setSelectedTraining(event);
  };

  const handleHideDetails = () => {
    setSelectedTraining(null);
  };

  return (
  <ScrollView>
    <View style={styles.container}>
      <Text style={styles.title}>Kalendarz</Text>
      {isLoading && Object.keys(trainings).length > 0 ? (
        <Text style={{ marginTop: 20 }}>Ładowanie...</Text>
      ) : (
        <Agenda
          items={trainings as any}
          selected={selectedDate}
          renderItem={(item) => renderItem(item)}
          onDayPress={(day) => setSelectedDate(day.dateString)}
          onDayChange={(day) => console.log('day changed')}
          theme={{
            selectedDayBackgroundColor: 'blue',
            todayTextColor: 'blue',
          }}
        />
      )}

      {selectedTraining && (
        <View>
          <Text style={styles.selectedTrainingTitle}>{selectedTraining.title}</Text>
          <Text>Begin Time: {moment(selectedTraining.start).format('HH:mm')}</Text>
          <Text>End Time: {moment(selectedTraining.end).format('HH:mm')}</Text>
          <Text>Description: {selectedTraining.description}</Text>
          <Text>Exercises:</Text>
          <ScrollView>
            {selectedTraining.exercises.map((exercise: Exercise) => (
              <View key={exercise.exercise_id} style={styles.exerciseItem}>
                <Text>ID ćwiczenia: {exercise.exercise_id}</Text>
                <Text>Ćwiczenie: {exercise.exercise_name}</Text>
                <Text>Opis: {exercise.exercise_description}</Text>
                <Text>Liczba serii: {exercise.set_amount}</Text>
                <Text>Liczba powtórzeń: {exercise.rep_amount}</Text>
              </View>
            ))}
          </ScrollView>
          <TouchableOpacity onPress={handleHideDetails}>
            <Text style={{ color: 'blue', marginTop: 10 }}>Ukryj szczegóły</Text>
          </TouchableOpacity>
        </View>
      )}

{!selectedTraining && !isLoading && !trainings[selectedDate] && (
          <Text style={{ marginTop: 20 }}>Na wybraną datę nie zaplanowano żadnego treningu.</Text>
        )}
       
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  item: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 8,
  },
  selectedTrainingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  exerciseItem: {
    marginLeft: 16,
    marginTop: 8,
  },
});

export default MyTrainings;