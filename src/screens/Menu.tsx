import React from 'react';
import { View, ScrollView, Text, Alert } from 'react-native';
import { List, Settings, LogOut, Bell, BarChart2, Users } from 'lucide-react-native';
import { MenuItem } from '@/components';
import { Avatar, AvatarImage } from '@/components';
import { useAuth } from '@/contexts/AuthContext';

const Menu = () => {
    const { actualUser, logout } = useAuth();

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
                        <Text className="text-gray-800 text-lg font-bold">{actualUser && actualUser.name ? actualUser.name : 'Usuário'}</Text>
                        <Text className="text-gray-600 text-sm">{actualUser && actualUser.username ? '@' + actualUser.username : '@username'}</Text>
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
                    onPress={() => console.log('Configuraçoes')}
                />
                <MenuItem
                    icon={<LogOut size={24} color="#1460CD" />}
                    label="Sair"
                    onPress={handleLogout}
                />
            </View>
        </ScrollView>
    );
};

export default Menu;