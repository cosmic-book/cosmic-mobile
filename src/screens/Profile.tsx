import { MainStackParamList } from '@/@types/navigation';
import { Avatar, AvatarFallback, AvatarImage, Progress } from '@/components';
import { useAuth } from '@/contexts/AuthContext';
import { RouteProp } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

type ProfileProps = {
  navigation: NativeStackScreenProps<MainStackParamList, 'Profile'>
  route: RouteProp<any>
}

const Profile = ({ navigation, route }: ProfileProps) => {
  const { user } = useAuth();

  return (
    user ?
      <View className="flex-1 bg-white">
        <View className="items-center mt-24">
          <TouchableOpacity>
            <Avatar className="w-24 h-24">
              <AvatarImage
                source={require('@/assets/user-icon.png')}
              />
              <AvatarFallback className="bg-slate-300 flex-1 items-center justify-center">
                USER
              </AvatarFallback>
            </Avatar>
          </TouchableOpacity>
          <Text className="mt-4 text-xl font-bold">{user.name}</Text>
          <Text className="mt-2 mb-5 px-16 text-center text-gray-500">
            Descrição
          </Text>
        </View>

        <View className="flex-row justify-around w-full mt-2 p-4 border border-l-0 border-r-0 border-gray-200">
          <TouchableOpacity className="items-center w-1/3">
            <Text className="text-primary text-lg font-bold">562</Text>
            <Text className="text-gray-500">Livros</Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center w-1/3">
            <Text className="text-purple text-lg font-bold">1.873</Text>
            <Text className="text-gray-500">Páginas Lidas</Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center w-1/3">
            <Text className="text-pink text-lg font-bold">300</Text>
            <Text className="text-gray-500">Resenhas</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1 w-full">
          <View className='px-12'>
            <Text className="text-lg color-primary font-bold mb-4 mt-5">
              Livros Favoritos
            </Text>
            <View className="flex-row justify-around gap-4 mb-6">
              <View className="w-20 h-28 bg-slate-300 rounded" />
              <View className="w-20 h-28 bg-slate-300 rounded" />
              <View className="w-20 h-28 bg-slate-300 rounded" />
              <View className="w-20 h-28 bg-slate-300 rounded" />
            </View>
          </View>

          <View className='px-12 border border-l-0 border-r-0 border-gray-200'>
            <Text className="text-lg color-primary font-bold mb-2 mt-5">
              Meta de Leitura
            </Text>
            <View className="mb-6">
              <Text className="text-sm text-gray-400 mb-2 px-2">Páginas / Semana</Text>
              <Progress value={60} className="mb-2" />
              <View className="flex-row justify-between px-2">
                <Text className="text-left text-primary font-semibold">280/400 pág.</Text>
                <Text className="text-right text-pink font-semibold">60%</Text>
              </View>
            </View>
          </View>

          <View className='px-12'>
            <Text className="text-lg color-primary font-bold mb-2 mt-5">
              Última Atividade
            </Text>
            <View className="flex-row items-center mb-4 py-1 px-4 rounded-md border border-gray-300">
              <View className="w-16 h-24 bg-slate-300 rounded mr-4"></View>
              <View className="flex-1">
                <View className='my-2'>
                  <Text className="text-base font-semibold">
                    Título do Livro
                  </Text>
                  <Text className="text-sm text-gray-400">
                    Nome do autor
                  </Text>
                </View>

                <Progress value={90} className="h-3 my-2" />

                <View className="flex-row justify-between mb-2">
                  <Text className="text-sm text-left text-primary font-semibold">
                    280/300 pág.
                  </Text>
                  <Text className="text-sm text-right text-pink font-semibold">
                    90%
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      : null
  );
};

export default Profile;
