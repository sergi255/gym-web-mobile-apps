import { View, Text, FlatList, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../app/context/AuthContext';
import { useAuth } from '../app/context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { styles } from '../styles/styles';

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
        alert('Failed to fetch exercise data.');
      }
    } catch (error) {
      console.error('Error fetching exercise data:', error);
      alert('Failed to fetch exercise data.');
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
        alert('Failed to delete exercise data.');
      }
    } catch (error) {
      console.error('Error deleting exercise data:', error);
      alert('Failed to delete exercise data.');
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