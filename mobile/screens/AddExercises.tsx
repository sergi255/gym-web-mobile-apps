import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { API_URL } from '../app/context/AuthContext';
import { styles } from '../styles/styles';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker'

export default function AddExercises() {
  const [name, setName] = useState('');
  const [part, setPart] = useState('');
  const [description, setDescription] = useState('');

  const [categories, setCategories] = useState([]);

  const addExercise = async () => {
    try {
      if (name && part && description) {
        console.log(name, part, description)
        const response = await axios.post(`${API_URL}/exercises/addExercise`, {
          name: name,
          part: part,
          description: description,
        });

        if (response.status === 200) {
          console.log('Exercise added');
          setName('');
          setPart('');
          setDescription('');
        }
      } else {
        console.log('All fields are mandatory');
      }
    } catch (error) {
      console.error('Error adding exercise', error);
    }
  };
  
  const getCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/categories`);
      if (response.status === 200) {
        setCategories(response.data);
      } else {
        console.log('Failed to fetch categories.');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nazwa ćwiczenia</Text>
      <TextInput
        style={styles.input}
        placeholder="Nazwa ćwiczenia"
        value={name}
        onChangeText={(name) => setName(name)}
      />
      <Text style={styles.label}>Partia ciała</Text>
      <Picker
        selectedValue={part}
        style={styles.input}
        onValueChange={(itemValue) =>
          setPart(itemValue)
        }
      >
      {categories.map((category, index) => (
        <Picker.Item
          key={category.name}
          label={category.name}
          style={styles.pickerItem}
          value={index + 1}
        />
      ))}
      </Picker>
      <Text style={styles.label}>Opis</Text>
      <TextInput
        style={styles.input}
        placeholder="Opis"
        value={description}
        onChangeText={(description) => setDescription(description)}
      />
      <TouchableOpacity style={styles.button} onPress={addExercise}>
        <Text style={styles.buttonText}>Dodaj ćwiczenie</Text>
      </TouchableOpacity>
    </View>
  );
}
