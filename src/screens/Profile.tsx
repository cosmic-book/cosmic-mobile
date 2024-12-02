import { MainStackParamList } from '@/@types/navigation';
import { Avatar, AvatarImage, Progress } from '@/components';
import { FavoritesCarousel, LastHistoryItem } from '@/components/layout';
import { useAuth } from '@/contexts/AuthContext';
import { GlobalContext } from '@/contexts/GlobalContext';
import { NavigationProp, RouteProp, useIsFocused } from '@react-navigation/native';
import { Bookmark, Pencil, Trophy } from 'lucide-react-native';
import React, { useContext, useEffect } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

type ProfileProps = {
  navigation: NavigationProp<MainStackParamList, 'Profile'>
  route: RouteProp<any>
}

const Profile = ({ navigation }: ProfileProps) => {
  const { actualUser } = useAuth();
  const { userInfos, loadUserInfos } = useContext(GlobalContext);

  const isFocused = useIsFocused();

  const handleReload = async () => {
    if (actualUser) {
      await loadUserInfos(actualUser.id)
    }
  }

  const handlePress = () => {
    navigation.navigate('ProfileEdit')
  }

  useEffect(() => {
    if (isFocused) {
      handleReload()
    }
  }, [isFocused]);

  return (
    actualUser ? (
      <View className="flex-1 bg-white">
        <View className="items-center mt-24">
          <TouchableOpacity onPress={handlePress}>
            <Avatar className="w-24 h-24">
              <AvatarImage
                source={actualUser.image ? { uri: actualUser.image } : require('../assets/user-icon.png')}
              />
            </Avatar>
            <View className="absolute bottom-0 right-0 w-6 h-6 bg-blue-500 rounded-full items-center justify-center">
              <Pencil color="white" size={12} />
            </View>
          </TouchableOpacity>
          <Text className="mt-4 text-xl font-bold">{actualUser.name}</Text>
          <Text className="mt-1 text-sm font-medium text-gray-400">{'@' + actualUser.username}</Text>
        </View>

        <View className="flex-row justify-around w-full mt-4 p-4 border_y">
          <TouchableOpacity className="items-center w-1/3">
            <Text className="text-primary text-lg font-bold">{userInfos.totalItems}</Text>
            <Text className="text-gray-500">Livros</Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center w-1/3">
            <Text className="text-purple text-lg font-bold">{userInfos.totalReadPages}</Text>
            <Text className="text-gray-500">Páginas Lidas</Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center w-1/3">
            <Text className="text-pink text-lg font-bold">{userInfos.totalReviews}</Text>
            <Text className="text-gray-500">Resenhas</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1 w-full">
          <FavoritesCarousel favoriteBooks={userInfos.favorites} />

          <View className="px-12 border_y">
            <View className='flex-row items-center gap-2 my-3'>
              <Trophy color='#1460cd' size={16} />
              <Text className="text-lg color-primary font-bold">
                Meta de Leitura
              </Text>
            </View>
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
            <View className='flex-row items-center gap-2 my-3'>
              <Bookmark color='#1460cd' size={16} />
              <Text className="text-lg color-primary font-bold">
                Última Atividade
              </Text>
            </View>

            <LastHistoryItem history={userInfos.lastHistory} />
          </View>
        </ScrollView>
      </View>
    ) : null
  );
};

export default Profile;
