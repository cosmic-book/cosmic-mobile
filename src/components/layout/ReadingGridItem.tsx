import { Reading } from "@/@types";
import { MainStackParamList } from "@/@types/navigation";
import { NavigationProp } from "@react-navigation/native";
import { useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { Progress } from "../Progress";

type Props = {
  reading: Partial<Reading>;
  navigation: NavigationProp<MainStackParamList>;
  onPress?: () => void;
};

export function ReadingGridItem({ reading, onPress }: Props) {
  const [imageError, setImageError] = useState(false);

  const totalPages = reading.book?.pages ?? 0;
  const readPages = reading.read_pages ?? 0;
  const progress = totalPages > 0 ? (readPages / totalPages) * 100 : 0;

  return (
    <TouchableOpacity
      className="flex-col gap-2 mb-5 w-full items-center"
      onPress={onPress}
    >
      {reading.book && (
        <>
          <View className="w-full h-44 rounded-lg relative">
            {reading.book.cover && !imageError ? (
              <Image
                source={{ uri: reading.book.cover }}
                className="w-full h-full rounded-lg"
                onError={() => setImageError(true)}
              />
            ) : (
              <Image
                source={require('@/assets/no-cover.png')}
                className="w-full h-full rounded-lg"
              />
            )}
          </View>
          <View className="gap-1 items-center px-2 w-full">
            <Progress value={progress} />
          </View>
        </>
      )}
    </TouchableOpacity>
  );
}
