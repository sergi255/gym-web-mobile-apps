import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, Platform} from 'react-native';
import { Picker } from '@react-native-picker/picker'
import { API_URL } from '../app/context/AuthContext'
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/styles';

const Profil = () => {
  const navigation = useNavigation();
  const [login, setLogin] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [token, setToken] = useState('');

  const getUserUrl = 'http://localhost:3001/users/getUser';
  const saveDataUrl = 'http://localhost:3001/users/saveUser';
  const deleteUserUrl = 'http://localhost:3001/users/deleteUser';


  const getUserData = async () => {
    try {
      const response = await axios.get(`${API_URL}/users/getUser`);
      if (response.status === 200) {
        const userData = response.data;
        setLogin(userData.login);
        setFirstName(userData.first_name);
        setLastName(userData.last_name);
        setEmail(userData.email);
        setHeight(userData.height);
        setWeight(userData.weight);
        setAge(userData.age);
        setGender(userData.gender);
      } else {
        alert('Failed to fetch user data.');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      alert('Failed to fetch user data.');
    }
  };
  
  useEffect(() => {
    getUserData();}, []);

  const saveData = async () => {
    const validationErrors = [];

    if (!login) {
      validationErrors.push('Login field is required.');
    }

    if (!email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      validationErrors.push('Email field is invalid.');
    }

    if (!firstName || !/^[A-Za-z]+$/.test(firstName)) {
      validationErrors.push('First name field is invalid. Only letters are allowed.');
    }

    if (!lastName || !/^[A-Za-z]+$/.test(lastName)) {
      validationErrors.push('Last name field is invalid. Only letters are allowed.');
    }

    if (isNaN(age)) {
      validationErrors.push('Age field is invalid. Must be a number.');
    }

    if (!/^[0-9]+(\.[0-9]+)?$/.test(weight)) {
      validationErrors.push('Weight field is invalid. Must be a number.');
    }

    if (!/^\d+(\.\d+)?$/.test(height)) {
      validationErrors.push('Height field is invalid. Must be a number.');
    }

    if (!/^[MK]$/.test(gender)) {
      validationErrors.push('Gender field is invalid. Must be "M" or "K".');
    }

    if (validationErrors.length > 0) {
      Alert.alert('Validation errors:\n' + validationErrors.join('\n'));
      return;
    }

    try {
      const response = await axios.put(
        saveDataUrl,
        {
          last_name: lastName,
          first_name: firstName,
          age,
          height,
          weight,
          gender,
        },
        
      );

      if (response.status === 200) {
        Alert.alert('User data saved successfully.');
      } else {
        Alert.alert('Failed to save user data.');
      }
    } catch (error) {
      console.error('Error saving user data:', error);
      Alert.alert('Failed to save user data.');
    }
  };

  const deleteUser = async () => {
    try {
      const response = await axios.delete(deleteUserUrl, {
        
      });

      if (response.status === 200) {
        await AsyncStorage.removeItem('session_data');
        navigation.navigate('Login');
      } else {
        Alert.alert('Failed to delete user data.');
      }
    } catch (error) {
      console.error('Error deleting user data:', error);
      Alert.alert('Failed to delete user data.');
    }
  };


  return (
    <ScrollView contentContainerStyle={styles.containerProfile} keyboardShouldPersistTaps='handled' style={{ flex: 1 }}>
      <View style={[styles.exerciseItem, { justifyContent: 'center' }]}>
        <Text style={[styles.buttonText, styles.column]}>Login</Text>
        <TextInput
  style={styles.input}
  value={login}
  onChangeText={(text) => setLogin(text)}
  editable={false}
/>
      </View>
      <View style={styles.exerciseItem}>
        <Text style={[styles.buttonText, styles.column]}>Imię</Text>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
        />
      </View>
      <View style={styles.exerciseItem}>
        <Text style={[styles.buttonText, styles.column]}>Nazwisko</Text>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={(text) => setLastName(text)}
        />
      </View>
      <View style={styles.exerciseItem}>
  <Text style={[styles.buttonText, styles.column]}>Email</Text>
  <TextInput
    style={styles.input}
    value={email}
    onChangeText={(text) => setEmail(text)}  
    editable={false}
  />
</View>
      <View style={styles.exerciseItem}>
  <Text style={[styles.buttonText, styles.column]}>Wzrost</Text>
  <TextInput
    style={styles.input}
    value={height}
    onChangeText={(text) => setHeight(text)}
  />
</View>
<View style={styles.exerciseItem}>
  <Text style={[styles.buttonText, styles.column]}>Waga</Text>
  <TextInput
    style={styles.input}
    value={weight}
    onChangeText={(text) => setWeight(text)}
  />
</View>
<View style={styles.exerciseItem}>
  <Text style={[styles.buttonText, styles.column]}>Wiek</Text>
  <TextInput
    style={styles.input}
    value={age}
    onChangeText={(text) => setAge(text)}
  />
</View>
<View style={styles.exerciseItem}>
  <Text style={[styles.buttonText, styles.column]}>PŁEĆ</Text>
  <Picker
    style={styles.input}
    selectedValue={gender}
    onValueChange={(itemValue) => setGender(itemValue)}
  >
    <Picker.Item label="K" value="K" />
    <Picker.Item label="M" value="M" />
  </Picker>
</View>

{/* Buttons */}
<View>
  <TouchableOpacity
    style={[styles.button, { backgroundColor: 'blue' }]}
    onPress={saveData}
  >
    <Text style={styles.buttonText}>ZAPISZ DANE</Text>
  </TouchableOpacity>
  <TouchableOpacity
    style={[styles.button, { backgroundColor: 'red' }]}
    onPress={deleteUser}
  >
    <Text style={styles.buttonText}>USUŃ KONTO</Text>
  </TouchableOpacity>
</View>
</ScrollView>
  );
};

export default Profil;
