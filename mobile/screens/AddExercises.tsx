import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { API_URL } from '../app/context/AuthContext';
import { styles } from '../styles/styles';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker'
import Toast from 'react-native-toast-message';

export default function AddExercises() {
  const [name, setName] = useState('');
  const [part, setPart] = useState('1');
  const [description, setDescription] = useState('');

  const [categories, setCategories] = useState([]);

  const addExercise = async () => {
    try {
      if (name && part && description) {
        const response = await axios.post(`${API_URL}/exercises/addExercise`, {
          name: name,
          part: part,
          description: description,
        });

        if (response.status === 200) {
          Toast.show({
            type: 'success',
            text1: 'Ćwiczenie zostało dodane!',
          });
          setName('');
          setPart('1');
          setDescription('');
        }
      } else {
        console.log('All fields are mandatory');
        Toast.show({
          type: 'error',
          text1: 'Wszystkie pola są wymagane.',
        });
      }
    } catch (error) {
      console.error('Error adding exercise', error);
      Toast.show({
        type: 'error',
        text1: 'Wystąpił błąd podczas dodawania ćwiczenia.',
      });
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
      Toast.show({
        type: 'error',
        text1: 'Wystąpił błąd podczas pobierania kategorii.',
      });
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
      <View style={{    
          borderColor: 'gray',
          borderWidth: 1,
          width: '80%',
          height: 56,
        }}>
        <Picker
          selectedValue={part}
          style={styles.pickerInput}
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
      </View>
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
