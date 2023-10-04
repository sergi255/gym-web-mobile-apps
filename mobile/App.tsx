import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Button } from 'react-native';

import { AuthProvider, useAuth } from './app/context/AuthContext';
import Home from './screens/Home';
import Login from './screens/Login';

const Stack = createNativeStackNavigator();

//to run type npx expo start --tunnel and scan qr code in the app

// Color palette
//#6422b8 - fioletowy
//#ffd93b - rzułty
//#ffffff - biały

export default function App() {
  return (
    <AuthProvider>
      <Layout></Layout>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const Layout = () => {
  const { authState, onLogout } = useAuth();

  return(
    <NavigationContainer>
      <Stack.Navigator>
        {authState?.authenticated ? (
          <Stack.Screen name = "Home" component = {Home}
          options={{
            headerRight: () => <Button onPress ={onLogout} title="Sign Out"/>,
            headerLeft: () => <Button onPress = {console.log("dyszy")} title="huj"/>,
          }}></Stack.Screen>
        ) : (
          <Stack.Screen name = "Login" component = {Login}></Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}