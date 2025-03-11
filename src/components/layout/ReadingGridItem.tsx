import { TReading } from "@/@types";
import { TMainStackParamList } from "@/@types/navigation";
import { NavigationProp } from "@react-navigation/native";
import { useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { Progress } from "../Progress";

type Props = {
  reading: Partial<TReading>;
  navigation: NavigationProp<TMainStackParamList>;
  onPress?: () => void;
};

export function ReadingGridItem({ reading, onPress }: Props) {
  const [imageError, setImageError] = useState(false);

  const totalPages = reading.edition?.num_pages ?? 0;
  const readPages = reading.read_pages ?? 0;
  const progress = totalPages > 0 ? (readPages / totalPages) * 100 : 0;

  return (
    <TouchableOpacity
      className="flex-col gap-2 mb-5 w-full items-center"
      onPress={onPress}
    >
      {reading.edition && (
        <>
          <View className="w-full h-44 rounded-lg relative">
            {reading.edition.cover && !imageError ? (
              <Image
                source={{ uri: reading.edition.cover }}
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
