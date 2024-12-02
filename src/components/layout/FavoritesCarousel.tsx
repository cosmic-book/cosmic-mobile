import { Reading } from "@/@types";
import { Heart } from "lucide-react-native";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";

type FavoritesCarouselProps = {
  favoriteBooks: Reading[];
};

export function FavoritesCarousel({ favoriteBooks }: FavoritesCarouselProps) {
  return (
    <View className="px-12">
      <View className='flex-row items-center gap-2 my-3'>
        <Heart color='#1460cd' size={16} />
        <Text className="text-lg color-primary font-bold">
          Livros Favoritos
        </Text>
      </View>

      {favoriteBooks.length > 0 ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-6"
          contentContainerStyle={{ gap: 16 }}
        >
          {favoriteBooks.map((favorite) => (
            <View key={favorite.id} className="w-20 h-28">
              <Image
                source={{ uri: favorite.book?.cover }}
                className="w-full h-full rounded"
                resizeMode="cover"
              />
            </View>
          ))}
        </ScrollView>
      ) : (
        <Text className="text-gray-500 text-center align-middle w-full h-[40%]">
          Nenhum livro favorito adicionado.
        </Text>
      )}
    </View>
  );
}
