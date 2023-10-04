import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles'

const Register = () => {
    const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    console.log('Email:', email);
    console.log('Username:', username);
    console.log('Password:', password);
  };

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
