import { View, Text, FlatList, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../app/context/AuthContext';
import { useAuth } from '../app/context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/styles';
import Toast from 'react-native-toast-message';

export default function BrowseExercises() {
  const navigation = useNavigation();
  const [exercises, setExercises] = useState([]);
  const { authState } = useAuth();

  const getExerciseData = async () => {
    try {
      const response = await axios.get(`${API_URL}/exercises/getExercises`);

      if (response.status === 200) {
        setExercises(response.data);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Nie udało się pobrać danych ćwiczeń',
        });
      }
    } catch (error) {
      console.error('Error fetching exercise data:', error);
      Toast.show({
        type: 'error',
        text1: 'Nie udało się pobrać danych ćwiczeń',
      });
    }
  };

  const handleDelete = async(id: number) => {
    try {
      const response = await axios.delete(`${API_URL}/exercises/deleteExercises`, {
        data: {
          exerciseIds: [id],
        },
      });
  
      if (response.status === 200) {
        getExerciseData();
      } else {
        Toast.show({
          type: 'error',
          text1: 'Nie udało się usunąć ćwiczenia',
        });
      }
    } catch (error) {
      console.error('Error deleting exercise data:', error);
      Toast.show({
        type: 'error',
        text1: 'Nie udało się usunąć ćwiczenia',
      });
    }
  }

  useEffect(() => {
    if (authState.authenticated) {
      getExerciseData();
    } else {
      navigation.navigate('login');
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.exerciseItem}>
        <Text style={[styles.buttonText, styles.column]}>Nazwa</Text>
        <Text style={[styles.buttonText, styles.column]}>Opis</Text>
        <Text style={[styles.buttonText, styles.column]}>Kategoria</Text>
      </View>
      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.exerciseItem}>
            <Text style={[styles.buttonText, styles.column]}>{item.exercise_name}</Text>
            <Text style={[styles.buttonText, styles.column]}>{item.description}</Text>
            <Text style={[styles.buttonText, styles.column]}>{item.category_name}</Text>
          </View>
        )}
      />
    </View>
  );
}