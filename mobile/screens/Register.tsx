import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useAuth } from '../app/context/AuthContext';
import { styles } from '../styles/styles'
import Toast from 'react-native-toast-message';

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { onRegister } = useAuth();
  
  const handleRegister = async () => {
    const result = await onRegister!(email, username, password);
    if (result && result.error) {
      Toast.show({
        type: 'error',
        text1: 'Błąd podczas rejestracji.',
      });
    } else{
      Toast.show({
        type: 'success',
        text1: 'Konto utworzone pomyślnie!',
      });
    }
  }

  return (
    <View style={styles.container}>
        <Text style={styles.minorHeader}>Zarejestruj się</Text>
        <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
      />
      <Text style={styles.label}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Login"
        value={username}
        onChangeText={setUsername}
      />
      <Text style={styles.label}>Hasło</Text>
      <TextInput
        style={styles.input}
        placeholder="Hasło"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Zarejestruj się</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;
