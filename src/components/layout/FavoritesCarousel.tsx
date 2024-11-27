import React from "react";
import { ScrollView, View, Text, Image } from "react-native";

type FavoriteBook = {
    id: number;
    book: {
        id: number;
        cover: string;
        title: string;
        author: string;
    };
};

type FavoritesCarouselProps = {
    favoriteBooks: FavoriteBook[];
};

export function FavoritesCarousel({ favoriteBooks }: FavoritesCarouselProps) {
    return (
        <View className="px-12">
            <Text className="text-lg color-primary font-bold mb-4 mt-5">
                Livros Favoritos
            </Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="mb-6"
                contentContainerStyle={{ gap: 16 }}
            >
                {favoriteBooks.length > 0 ? (
                    favoriteBooks.map((favorite) => (
                        <View key={favorite.id} className="w-20 h-28">
                            <Image
                                source={{ uri: favorite.book.cover }}
                                className="w-full h-full rounded"
                                resizeMode="cover"
                            />
                        </View>
                    ))
                ) : (
                    <Text className="text-gray-500 text-center w-full">
                        Nenhum livro favorito encontrado.
                    </Text>
                )}
            </ScrollView>
        </View>
    );
}
