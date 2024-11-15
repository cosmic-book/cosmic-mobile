import { Reading } from "@/@types";
import { MainStackParamList } from "@/@types/navigation";
import { NavigationProp } from '@react-navigation/native';
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Progress } from "../Progress";

type Props = {
  reading: Partial<Reading>;
  navigation: NavigationProp<MainStackParamList>;
};

export function ReadingGridItem({ reading, navigation }: Props) {
  const [imageError, setImageError] = useState(false);

  const handlePress = () => {
    //navigation.navigate('BookDetails', { book })
  };

  return (
    <TouchableOpacity
      className="flex-col gap-2 mb-5 w-full items-center"
      onPress={handlePress}
    >
      {reading.book && (
        <>
          {reading.book.cover && !imageError ? (
            <Image
              source={{ uri: reading.book.cover }}
              className="w-full h-44 rounded-lg"
              onError={() => setImageError(true)}
            />
          ) : (
            <Image
              source={require('@/assets/no-cover.png')}
              className="w-full h-44 rounded-lg"
            />
          )}
          <View className="gap-1 items-center px-2 w-full">
            <Text
              className="text-base text-center text-black font-medium"
              numberOfLines={1}
            >
              {reading.book.title}
            </Text>
            <Progress value={75} />
          </View>
        </>
      )}
    </TouchableOpacity>
  );
}
