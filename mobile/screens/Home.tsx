import React from 'react'
import { View, Text } from "react-native";
import { styles } from '../styles/styles';

const Welcome = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.header}>Dyszak</Text>
        <Text style={styles.minorHeader}>Cardio Camp</Text>
    </View>
  )
}

export default Welcome