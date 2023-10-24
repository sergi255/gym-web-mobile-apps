import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import { API_URL, useAuth } from '../app/context/AuthContext'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { styles } from '../styles/styles'

export default function Stats() {
  const navigation = useNavigation();
  const { authState } = useAuth();
  const [stats, setStats] = useState({
    countTrainings: 0,
    totalTrainingTime: "",
    averageTrainingTime: ""
  });
  const [trainings, setTrainings] = useState<any[]>([]);
  const [lastTrainingDate, setLastTrainingDate] = useState<string | undefined>();

  const getStats = async () => {
    try{
        const response = await axios.get(`${API_URL}/trainings/getStats`);
        if (response.status === 200) {
          if(response.data.length === 0){
            return;
          }
          else{
            setTrainings(response.data);
          }
        }
    } catch(error){
        return { error: true, msg: (error as any).response.data.msg };
    }
}

const computeStats = () => {
  const computedStats = {
    countTrainings: trainings.length,
    totalTrainingTime: computeTotalTrainingTime(trainings),
    averageTrainingTime: computeAverageTrainingTime(trainings),
  };

  setStats(computedStats);
  prepareData();
};

const computeTotalTrainingTime = (trainings: any) => {
  const totalSeconds = trainings.reduce((total: number, training: any) => {
    const beginTimeParts = training.begin_time.split(":");
    const endTimeParts = training.end_time.split(":");

    const beginHours = parseInt(beginTimeParts[0]);
    const beginMinutes = parseInt(beginTimeParts[1]);

    const endHours = parseInt(endTimeParts[0]);
    const endMinutes = parseInt(endTimeParts[1]);

    const trainingTimeInSeconds =
      endHours * 3600 +
      endMinutes * 60 -
      (beginHours * 3600 + beginMinutes * 60);

    return total + trainingTimeInSeconds;
  }, 0);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  return `${String(hours)}:${String(minutes).padStart(2, "0")}`;
};

const computeAverageTrainingTime = (trainings: any) => {
  const totalTrainingTime =
    parseInt(computeTotalTrainingTime(trainings)) * 3600;
  const countTrainings = trainings.length;

  if (countTrainings === 0) {
    return "00:00";
  }

  const averageTimeInSeconds = Math.round(totalTrainingTime / countTrainings);

  const hours = Math.floor(averageTimeInSeconds / 3600);
  const minutes = Math.floor((averageTimeInSeconds % 3600) / 60);

  return `${String(hours)}:${String(minutes).padStart(2, "0")}`;
};

const prepareData = () => {
  const sortedTrainings = [...trainings];
  
  sortedTrainings.sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const trainingsFormatedDate = sortedTrainings.map((training) => {
    const formattedDate = new Date(training.date).toLocaleDateString('pl-PL');
    return {
      ...training,
      date: formattedDate,
    };
  });

  if (trainingsFormatedDate.length > 0) {
    const lastTraining = trainingsFormatedDate[trainingsFormatedDate.length - 1];
    const lastTrainingDate = lastTraining.date;
    setLastTrainingDate(lastTrainingDate); 
  } else {
    setLastTrainingDate("-- -- --");
  }
};

  useEffect(() => {
    if(authState.authenticated){
      getStats();
    }
    else{
      navigation.navigate('login');
    }
  }, [authState.authenticated])

  useEffect(() => {
    const fetchData = async () => {
      if (trainings && authState.authenticated) {
        computeStats()
      }
    };
    fetchData();
  }, [trainings, authState.authenticated]);

  return (
  <View style={styles.container}>
    <View style={styles.box}>
      <View style={styles.boxHeader}>
        <Text style={styles.headerText}>Statystyki</Text>
      </View>
      <View style={styles.tableContainer}>
        <View style={styles.tableRow}>
          <Text style={styles.tableCellHeader}>Liczba treningów:</Text>
          <Text style={styles.tableCellData}>{stats.countTrainings}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCellHeader}>Całkowity czas treningów:</Text>
          <Text style={styles.tableCellData}>{stats.totalTrainingTime}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCellHeader}>Średni czas treningu:</Text>
          <Text style={styles.tableCellData}>{stats.averageTrainingTime}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCellHeader}>Data ostatniego treningu:</Text>
          <Text style={styles.tableCellData}>{lastTrainingDate}</Text>
        </View>
      </View>
      </View>
    </View>
  )
}