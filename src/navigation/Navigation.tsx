import { useAuth } from '@/contexts/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import AuthStack from './AuthStack';
import MainStack from './MainStack';

const Navigation: React.FC = () => {
  const { isAuthenticated } = useAuth();
  return (
    <NavigationContainer>
      {isAuthenticated ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Navigation;
