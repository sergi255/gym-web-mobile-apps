import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../app/context/AuthContext';
import { useAuth } from '../app/context/AuthContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { styles } from '../styles/styles';
import Toast from 'react-native-toast-message';

export default function MyExercises() {
  const [exercises, setExercises] = useState([]);
  const { authState } = useAuth();

  const getExerciseData = async () => {

    try {
      const response = await axios.get(`${API_URL}/exercises/getUserExercises`);
      if (response.status === 200) {
        setExercises(response.data);
      } else if (response.status === 404) {
        setExercises([]);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Wystąpił błąd podczas pobierania ćwiczeń.',
        });
      }
    } catch (error) {
      if(!error.status == undefined){
        console.error('Error fetching exercise data:', error);
      }
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await axios.delete(`${API_URL}/exercises/deleteExercises`, {
        data: {
          exerciseIds: [id],
        },
      });

      if (response.status === 200) {
        Toast.show({
          type: 'success',
          text1: 'Ćwiczenie zostało usunięte!',
        });
        getExerciseData();
      } else {
        Toast.show({
          type: 'error',
          text1: 'Wystąpił błąd podczas usuwania ćwiczenia.',
        });
      }
    } catch (error) {
      console.error('Error deleting exercise data:', error);
      Toast.show({
        type: 'error',
        text1: 'Wystąpił błąd podczas usuwania ćwiczenia.',
      });
    }
  }

  useEffect(() => {
      getExerciseData();
  });

  return (
    <View style={styles.container}>
      {exercises.length > 0 ? (
        <View>
          <View style={styles.exerciseItem}>
            <Text style={[styles.buttonText, styles.column]}>Nazwa</Text>
            <Text style={[styles.buttonText, styles.column]}>Opis</Text>
            <Text style={[styles.buttonText, styles.column]}>Kategoria</Text>
            <Text style={[styles.buttonText]}>Akcja</Text>
          </View>
          <FlatList
            data={exercises}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.exerciseItem}>
                <Text style={[styles.buttonText, styles.column]}>{item.exercise_name}</Text>
                <Text style={[styles.buttonText, styles.column]}>{item.description}</Text>
                <Text style={[styles.buttonText, styles.column]}>{item.category_name}</Text>
                <View style={styles.actionButtonView}>
                  <TouchableOpacity style={styles.actionButton} onPress={() => handleDelete(item.id)}>
                    <Text style={[styles.buttonText, styles.column]}>X</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      ) : (
        <Text style={styles.buttonText}>Brak ćwiczeń użytkownika</Text>
      )}
    </View>
  );
}
