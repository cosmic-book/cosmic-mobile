import React from 'react';
import { View, ScrollView, Text, Alert, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { List, Settings, LogOut, Bell } from 'lucide-react-native';
import { MenuItem } from '@/components';
import { Avatar, AvatarImage } from '@/components';
import { useAuth } from '@/contexts/AuthContext';
import packageInfo from '../../package.json';

const Menu = () => {
  const { actualUser, logout } = useAuth();
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert(
      "Confirmar saída",
      "Você deseja sair da sua conta?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Sair", style: "destructive", onPress: logout }
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="flex-1">
        <View className="bg-white shadow-md px-6 py-6">
          <View className="flex-row items-center pt-16">
            <Avatar className="w-16 h-16">
              <AvatarImage
                source={
                  actualUser && actualUser.image
                    ? { uri: actualUser.image }
                    : require('@/assets/user-icon.png')
                }
              />
            </Avatar>
            <View className="ml-4">
              <Text className="text-gray-800 text-lg font-bold">
                {actualUser && actualUser.name ? actualUser.name : 'Usuário'}
              </Text>
              <Text className="text-gray-600 text-sm">
                {actualUser && actualUser.username ? '@' + actualUser.username : '@username'}
              </Text>
            </View>
          </View>
        </View>

        <View className="mt-4 px-2">
          <MenuItem
            icon={<List size={24} color="#1460CD" />}
            label="Minha Lista"
            onPress={() => console.log('Minha lista')}
          />
          <MenuItem
            icon={<Bell size={24} color="#1460CD" />}
            label="Lembretes"
            onPress={() => console.log('Lembretes')}
          />
          <MenuItem
            icon={<Settings size={24} color="#1460CD" />}
            label="Configurações"
            onPress={() => navigation.navigate('Settings')}
          />
        </View>
      </ScrollView>

      <View className="px-4 py-4">
        <MenuItem
          icon={<LogOut size={24} color="#1460CD" />}
          label="Sair"
          onPress={handleLogout}
        />
        <Text className="text-center text-sm text-gray-500 mt-2">
          v{packageInfo.version} - © 2024 Cosmic.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Menu;
