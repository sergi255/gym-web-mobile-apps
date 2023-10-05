import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useAuth } from '../app/context/AuthContext';
import { styles } from '../styles/styles'

const Register = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { onRegister } = useAuth();
  
  const handleRegister = async () => {
    const result = await onRegister!(email, username, password);
    if (result && result.error) {
      alert(result.msg);
    } else{
      navigation.navigate('Login')
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
      <TouchableOpacity style={styles.button} onPress={ () => { navigation.navigate('Login')} }>
          <Text style={styles.buttonText}>Masz konto? Zaloguj się</Text>
        </TouchableOpacity>
    </View>
  );
};

export default Register;
