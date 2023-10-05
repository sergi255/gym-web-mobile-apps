import React from 'react'
import { Button } from 'react-native';
import { View, Text } from "react-native";
import { useAuth } from '../app/context/AuthContext';
import { styles } from '../styles/styles';

const Welcome = () => {
  const { onLogout } = useAuth();

  const handleLogout = async () => {
    const result = await onLogout!();
    if (result && result.error) {
      alert(result.msg);
    }
  }

  return (
    <View style={styles.container}>
        <Text style={styles.header}>Dyszak</Text>
        <Text style={styles.minorHeader}>Cardio Camp</Text>
        <Button onPress={handleLogout} title="Log out"/>
    </View>
  )
}

export default Welcome