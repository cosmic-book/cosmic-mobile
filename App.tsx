import { CustomToast } from '@/components'
import MainApp from '@/navigation/MainApp'
import { RootStackParamList } from '@/navigation/RootStackParamList'
import { GreetingScreen, LoginScreen, SignUpScreen } from '@/screens'
import '@/styles/global.css'
import '@/styles/style.css'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import React from 'react'

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Greeting">
        <Stack.Screen name="Greeting" component={GreetingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MainApp" component={MainApp} options={{ headerShown: false }} />
      </Stack.Navigator>
      <StatusBar style="auto" />
      <CustomToast />
    </NavigationContainer>
  )
}
