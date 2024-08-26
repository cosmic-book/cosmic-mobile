import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Greeting from "@/screens/Greeting";
import Login from "@/screens/Login";
import "@/styles/global.css";
import { StatusBar } from "expo-status-bar";
import Signup from '@/screens/SignUp';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Greeting">
        <Stack.Screen
          name="Greeting"
          component={Greeting}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
