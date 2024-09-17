import { Book } from "@/@types";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";

type Props = {
  book: Partial<Book>;
};

export function BookListItem({ book }: Props) {
  const [imageError, setImageError] = useState(false);

  return (
    <TouchableOpacity className="flex-row gap-3 mb-5">
      {book.cover && !imageError ? (
        <Image
          source={{ uri: book.cover }}
          style={{ width: 70, height: 100 }}
          className="rounded-lg"
          onError={() => setImageError(true)}
        />
      ) : (
        <View style={{ width: 70, height: 100 }} className="bg-gray-300 rounded-lg" />
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
