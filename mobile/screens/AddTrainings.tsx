import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { styles } from '../styles/styles';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { API_URL } from '../app/context/AuthContext';
import DateTimePickerModal from 'react-native-modal-datetime-picker';



interface Exercise {
  id: string;
  set_amount?: number;
  rep_amount?: number;
  exercise_name?: string;
}

interface SomeOtherType {
  container: {
    alignItems: "center";
    justifyContent: "center";
    backgroundColor: string;
    width: "100%";
    height?: "100%";
  };
  containerProfile: {
    alignItems: "center";
    justifyContent: "center";
    backgroundColor: string;
    width: "100%";
  };

}

interface ErrorType {
  resource: string;
  owner: string;
  code: string;
  severity: number;
  message: string;
  source: string;
  startLineNumber: number;
  startColumn: number;
  endLineNumber: number;
  endColumn: number;
}


 const AddTrainings = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [beginTime, setBeginTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [description, setDescription] = useState('');
  const [selectedExerciseId, setSelectedExerciseId] = useState<string>('');
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
const [exerciseList, setExerciseList] = useState<Exercise[]>([]);

const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date: Date) => {
    hideDatePicker();
    // Ustaw datę w formacie zgodnym z Twoimi potrzebami
    const formattedDate = date.toISOString().split('T')[0];
    setDate(formattedDate);
  }



 
  const getExerciseData = async () => {
    try {
      const response = await axios.get(`${API_URL}/exercises/getExercises`); // Zastąp swoim rzeczywistym adresem API ćwiczeń
      if (response.status === 200) {
        setExerciseList(response.data);
      } else {
        console.log('Błąd podczas pobierania danych o ćwiczeniach.');
      }
    } catch (error) {
      console.error('Błąd podczas pobierania danych o ćwiczeniach:', error);
      Toast.show({
        type: 'error',
        text1: 'Błąd podczas pobierania danych o ćwiczeniach.',
      });
    }
  };

  const handleExerciseChange = () => {
    if (selectedExerciseId) {
      const exercise = exerciseList.find((ex) => ex.id === selectedExerciseId);
      if (exercise && !selectedExercises.find((e) => e.id === exercise.id)) {
        exercise.set_amount = exercise.set_amount || 1;
        exercise.rep_amount = exercise.rep_amount || 1;
        setSelectedExercises((prevSelectedExercises) => [...prevSelectedExercises, exercise]);
      }
      setSelectedExerciseId('');
    }
  };

  const removeExercise = (exerciseId: string) => {
    const updatedExercises = selectedExercises.filter((exercise) => exercise.id !== exerciseId);
    setSelectedExercises(updatedExercises);
  };

  const exampleExercise: Exercise = {
    id: "123",
    set_amount: 3,
    rep_amount: 10,
    exercise_name: "Przykładowe ćwiczenie",
  };
  const handleAdd = async () => {
    try {
      console.log('Próba wysłania danych:', {
        name,
        date,
        beginTime,
        endTime,
        description,
        selectedExercises,
      });
  
      const response = await axios.post(`${API_URL}/trainings/add`, {
        name: name,
        date: date,
        beginTime: beginTime,
        endTime: endTime,
        description: description,
        selectedExercises: selectedExercises,
      });
      console.log('Odpowiedź z serwera:', response);

      if (response.status === 200) {
        Toast.show({
          type: 'success',
          text1: 'Trening dodany pomyślnie.',
        });
        // Wyczyść pola formularza i wybrane ćwiczenia
        setName('');
        setDate('');
        setBeginTime('');
        setEndTime('');
        setDescription('');
        setSelectedExercises([]);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Nie udało się dodać treningu.',
        });
      }
    } catch (error) {
      console.error('Błąd:', error);
      Toast.show({
        type: 'error',
        text1: 'Nie udało się dodać treningu. Spróbuj ponownie.',
      });
    }
  };

  useEffect(() => {
    getExerciseData();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
      <Text style={styles.label}>Nazwa treningu</Text>
      <TextInput
        style={styles.input}
        placeholder="Nazwa treningu"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <Text style={styles.label}>Data</Text>
        <TouchableOpacity onPress={showDatePicker}>
          <Text style={styles.input}>{date || 'Wybierz datę'}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={hideDatePicker}
        />

      <Text style={styles.label}>Czas rozpoczęcia</Text>
      <TextInput
        style={styles.input}
        placeholder="Czas rozpoczęcia"
        value={beginTime}
        onChangeText={(text) => setBeginTime(text)}
      />
      <Text style={styles.label}>Czas zakończenia</Text>
      <TextInput
        style={styles.input}
        placeholder="Czas zakończenia"
        value={endTime}
        onChangeText={(text) => setEndTime(text)}
      />
      <Text style={styles.label}>Opis</Text>
      <TextInput
        style={styles.input}
        placeholder="Opis"
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      <Text style={styles.label}>Ćwiczenie</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedExerciseId}
          style={styles.pickerInput}
          onValueChange={(itemValue) => setSelectedExerciseId(itemValue)}
        >
          <Picker.Item label="Wybierz ćwiczenie" value="" />
          {exerciseList.map((exercise) => (
            <Picker.Item key={exercise.id} label={exercise.exercise_name} value={exercise.id} />
          ))}
        </Picker>
        <TouchableOpacity style={styles.button} onPress={() => handleExerciseChange()} disabled={!selectedExerciseId}>
          <Text style={styles.buttonText}>Dodaj ćwiczenie do treningu</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleAdd}>
        <Text style={styles.buttonText}>Dodaj trening</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Lista wybranych ćwiczeń</Text>
      {selectedExercises.map((exercise) => (
        <View key={exercise.id} style={styles.selectedExerciseContainer}>
          <Text style={styles.selectedExerciseText}>{exercise.exercise_name}</Text>
          <TouchableOpacity onPress={() => removeExercise(exercise.id)}>
            <Text style={styles.removeExerciseText}>Usuń</Text>
          </TouchableOpacity>
        </View>
      ))}
      </View>
    </ScrollView>
  );
}
export default AddTrainings;