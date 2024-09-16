import { Progress } from '@/components/Progress';
import React from 'react';
import { ScrollView, View, Text, Image } from 'react-native';

const Profile = () => {
  return (
    <View className="flex-1 bg-white">
      <View className="items-center mt-24">
        <Image
          source={require('../../assets/profile.jpg')}
          className="w-24 h-24 rounded-full"
        />
        <Text className="mt-4 text-xl font-bold">Nome Sobrenome</Text>
        <Text className="mt-2 text-center px-16 text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam rutrum tristique dolor.
        </Text>
      </View>

      <View className="flex-row justify-around mt-6 mb-8">
        <View className="items-center">
          <Text className="text-lightBlue text-lg font-bold">562</Text>
          <Text className="text-gray-500">Livros</Text>
        </View>
        <View className="items-center">
          <Text className="text-purple text-lg font-bold">1.873</Text>
          <Text className="text-gray-500">Páginas Lidas</Text>
        </View>
        <View className="items-center">
          <Text className="text-pink text-lg font-bold">300</Text>
          <Text className="text-gray-500">Resenhas</Text>
        </View>
      </View>

      <ScrollView className="flex-1 w-full px-4">
        <Text className="text-lg font-bold mb-4">Livros Favoritos</Text>
        <View className="flex-row justify-around mb-6">
          <View className="w-20 h-28 bg-gray-300 rounded"></View>
          <View className="w-20 h-28 bg-gray-300 rounded"></View>
          <View className="w-20 h-28 bg-gray-300 rounded"></View>
        </View>

        <Text className="text-lg font-bold mb-2 mt-2">Meta de Leitura</Text>
        <View className="mb-6">
          <Progress value={60} className="mb-2" />
          <View className="flex-row justify-between">
            <Text className="text-left text-lightBlue font-bold">280/400 pág.</Text>
            <Text className="text-right text-pink font-bold">60%</Text>
          </View>
        </View>

        <Text className="text-lg font-bold mb-2">Histórico</Text>
        <View className="flex-row items-center mb-4 p-4 rounded border border-gray-300">
          <View className="w-16 h-24 bg-gray-300 rounded mr-4"></View>
          <View className="flex-1">
            <Text className="text-base font-semibold">Título do Livro</Text>
            <Text className="text-sm text-gray-500">Nome do autor</Text>
            <Progress value={90} className="my-2" />
            <View className="flex-row justify-between">
              <Text className="text-left text-lightBlue font-bold">280/300 pág.</Text>
              <Text className="text-right text-pink font-bold">90%</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
