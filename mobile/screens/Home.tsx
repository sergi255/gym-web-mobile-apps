import React from 'react'
import { View, Text, Image } from "react-native";
import { styles } from '../styles/styles';

const Welcome = () => {
  return (
    <View style={styles.container}>
        <img src="../assets/logo.png" alt="logo"/>
        <Text style={styles.header}>Dyszak</Text>
        <Text style={styles.minorHeader}>Cardio Camp</Text>
    </View>
  )
}

export default Welcome