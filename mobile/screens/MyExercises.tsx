import { View, Text, FlatList, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../app/context/AuthContext';
import { useAuth } from '../app/context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function MyExercises() {
  const navigation = useNavigation();
  const [exercises, setExercises] = useState([]);
  const { authState } = useAuth();

  const getExerciseData = async () => {
    try {
      const response = await axios.get(`${API_URL}/exercises/getUserExercises`);

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
  }, [authState.authenticated]);

  return (
    <View style={styles.container}>
      <View style={styles.exerciseItem}>
        <Text>Nazwa</Text>
        <Text>Opis</Text>
        <Text>Kategoria</Text>
        <Text>Akcja</Text>
      </View>
      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.exerciseItem}>
            <Text style={styles.exerciseName}>{item.exercise_name}</Text>
            <Text style={styles.exerciseDescription}>{item.description}</Text>
            <Text style={styles.exerciseCategory}>{item.category_name}</Text>
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <Text>X</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  exerciseItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  exerciseDescription: {
    fontSize: 16,
  },
  exerciseCategory: {
    fontSize: 14,
    color: 'gray',
  },
});
