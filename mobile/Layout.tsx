import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { useAuth } from "./app/context/AuthContext";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Profile from "./screens/Profile";
import Register from "./screens/Register";
import Stats from "./screens/Stats";
import AddExercises from "./screens/AddExercises";
import MyExercises from "./screens/MyExercises";
import BrowseExercises from "./screens/BrowseExercises";
import MyTrainings from "./screens/MyTrainings";
import AddTrainings from "./screens/AddTrainings";
import Logout from "./screens/Logout";
import Toast from 'react-native-toast-message';

const Drawer = createDrawerNavigator();

export const Layout = () => {
  const { authState } = useAuth();
  const { onLogout } = useAuth();

  const handleLogout = async () => {
    const result = await onLogout!();
    if (result && result.error) {
      Toast.show({
        type: 'error',
        text1: result.msg,
      });
    }
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          drawerStyle: {
            backgroundColor: '#6422b8',
          },
          drawerActiveTintColor: "#ffd93b",
          drawerLabelStyle: {
            color: '#ffffff',
          },
          headerStyle: {
            backgroundColor: '#ffd93b',
          },
          headerTintColor: '#ffffff',
        }}
      >
        {authState?.authenticated ? (
          <>
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Profil" component={Profile} />
            <Drawer.Screen name="Statystyki" component={Stats} />
            <Drawer.Screen name="Dodaj ćwiczenia" component={AddExercises} />
            <Drawer.Screen name="Moje ćwiczenia" component={MyExercises} />
            <Drawer.Screen name="Przeglądaj ćwiczenia" component={BrowseExercises} />
            <Drawer.Screen name="Dodaj treningi" component={AddTrainings} />
            <Drawer.Screen name="Moje treningi" component={MyTrainings} />
            <Drawer.Screen name="Wyloguj się" component={Logout}
              listeners={() => ({ 
                  state: (e: any) => {
                    if (e.data.state.index === 8) {
                        handleLogout()
                    }
                  }
              })}
          />
          </>
        ) : (
          <>
            <Drawer.Screen name="Zaloguj się" component={Login} />
            <Drawer.Screen name="Zarejestruj się" component={Register} />
          </>
        )}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
