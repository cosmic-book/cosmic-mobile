import { TAuthStackParamList } from '@/@types/navigation'
import { GreetingScreen, LoginScreen, RegisterScreen } from '@/screens'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

const Stack = createStackNavigator<TAuthStackParamList>()

const AuthStack: React.FC = () => (
  <Stack.Navigator>
    <Stack.Screen name="Greeting" component={GreetingScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
)

export default AuthStack
