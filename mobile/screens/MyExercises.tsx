import { View, Text, FlatList, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../app/context/AuthContext';
import { useAuth } from '../app/context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { styles } from '../styles/styles';

export default function MyExercises() {
  const navigation = useNavigation();
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
        alert('Failed to fetch exercise data.');
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
        getExerciseData();
      } else {
        alert('Failed to delete exercise data.');
      }
    } catch (error) {
      console.error('Error deleting exercise data:', error);
      alert('Failed to delete exercise data.');
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
            <Text style={styles.buttonText}>Nazwa</Text>
            <Text style={styles.buttonText}>Opis</Text>
            <Text style={styles.buttonText}>Kategoria</Text>
            <Text style={styles.buttonText}>Akcja</Text>
          </View>
          <FlatList
            data={exercises}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.exerciseItem}>
                <Text style={styles.buttonText}>{item.exercise_name}</Text>
                <Text style={styles.buttonText}>{item.description}</Text>
                <Text style={styles.buttonText}>{item.category_name}</Text>
                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                  <Text>X</Text>
                </TouchableOpacity>
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
