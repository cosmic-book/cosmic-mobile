import { Book } from "@/@types";
import { MainStackParamList } from "@/@types/navigation";
import { NavigationProp } from '@react-navigation/native';
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

type Props = {
  book: Partial<Book>;
  navigation: NavigationProp<MainStackParamList>;
};

export function BookListItem({ book, navigation }: Props) {
  const [imageError, setImageError] = useState(false);

  const handlePress = () => {
    navigation.navigate('BookDetails', { book })
  };

  return (
    <TouchableOpacity className="flex-row gap-3 mb-5" onPress={handlePress}>
      {book.cover && !imageError ? (
        <Image
          source={{ uri: book.cover }}
          style={{ width: 70, height: 100 }}
          className="rounded-lg"
          onError={() => setImageError(true)}
        />
      ) : (
        <Image
          source={require('@/assets/no-cover.png')}
          style={{ width: 70, height: 100 }}
          className="rounded-lg"
        />
      )}
      <View className="flex-1 gap-1">
        <Text className="text-lg font-bold" numberOfLines={1}>{book.title}</Text>
        <Text className="text-sm color-gray-400">{book.author}</Text>
        <Text className="text-sm color-gray-400">{book.publisher}</Text>
        <Text className="text-sm color-gray-400">{book.year + ' - ' + book.pages + ' páginas'}</Text>
      </View>
    </TouchableOpacity>
  );
}
