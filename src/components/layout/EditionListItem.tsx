import { TEdition } from '@/@types';
import { TMainStackParamList } from '@/@types/navigation';
import { NavigationProp } from '@react-navigation/native';
import { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  edition: any;
  navigation: NavigationProp<TMainStackParamList>;
};

export function EditionListItem({ edition, navigation }: Props) {
  const [imageError, setImageError] = useState(false);

  const handlePress = () => {
    navigation.navigate('EditionDetails', { edition });
  };

  return (
    <TouchableOpacity className="flex-row gap-3" onPress={handlePress}>
      {edition.cover && !imageError ? (
        <Image
          source={{ uri: edition.cover }}
          style={{ width: 70, height: 100 }}
          className="rounded-lg"
          onError={() => setImageError(true)}
        />
      ) : (
        <Image source={require('@/assets/no-cover.png')} style={{ width: 70, height: 100 }} className="rounded-lg" />
      )}
      <View className="flex-1 gap-1">
        <Text className="text-lg font-bold" numberOfLines={1}>
          {edition.title}
        </Text>
        {/* <Text className="text-sm color-gray-400">{edition.author}</Text> */}
        <Text className="text-sm color-gray-400">
          {edition.publisher}
        </Text>
        <Text className="text-sm color-gray-400">
          {(edition.publish_date || '') + (edition.num_pages ? ' - ' + edition.num_pages + ' páginas' : '')}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
