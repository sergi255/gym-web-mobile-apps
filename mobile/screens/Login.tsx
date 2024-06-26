import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/styles';
import { useAuth } from '../app/context/AuthContext';
import Toast from 'react-native-toast-message';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { onLogin } = useAuth();

  const handleLogin = async () => {
    const result = await onLogin!(email, password);
    
    if (result && result.error) {
      Toast.show({
          type: 'error',
          text1: 'Błąd logowania.',
        });      
    }
  }
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.minorHeader}>Zaloguj się</Text>
        <Text style={styles.label}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Login"
          value={email}
          onChangeText={(email: string) => setEmail(email)}
        />
        <Text style={styles.label}>Hasło</Text>
        <TextInput
          style={styles.input}
          placeholder="Hasło"
          secureTextEntry={true}
          value={password}
          onChangeText={(password: string) => setPassword(password)}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Zaloguj się</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
