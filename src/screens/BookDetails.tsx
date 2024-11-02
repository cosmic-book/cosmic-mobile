import { MainStackParamList } from '@/@types/navigation';
import { BottomDrawer } from '@/components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { X } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type BookDetailsProps = NativeStackScreenProps<MainStackParamList, 'BookDetails'>;

const BookDetails = ({ route, navigation }: BookDetailsProps) => {
  const { book } = route.params;

  const [imageError, setImageError] = useState(false);

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const handleOpenBottomSheet = () => {
    setIsBottomSheetOpen(true);
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  useEffect(() => {
    if (book.cover) {
      setImageError(false)
    }
  }, [book])

  return (
    <ScrollView className="flex-1 color-gray-200">
      <TouchableOpacity
        className="absolute right-5 z-10 mt-16"
        onPress={() => navigation.goBack()}
      >
        <X size={30} color="white" />
      </TouchableOpacity>

      <View style={styles.backgroundContainer}>
        <Image
          source={book.cover && !imageError ? { uri: book.cover } : require('@/assets/no-cover.png')}
          style={styles.backgroundImage}
          blurRadius={15}
          onError={() => setImageError(true)}
        />
      </View>

      <View style={styles.contentContainer}>
        <View className="items-center">
          <Image
            source={book.cover && !imageError ? { uri: book.cover } : require('@/assets/no-cover.png')}
            style={{ width: 160, height: 240, borderRadius: 10, top: -40 }}
            onError={() => setImageError(true)}
          />
          <Text className="text-2xl color-white text-center">{book.title}</Text>
          <Text className="text-2x1 opacity-90 mt-2 color-white">Por {book.author}</Text>
        </View>

        <View className="mt-20 rounded-lg bg-white p-2 flex-row justify-around">
          <View className="flex-1 items-center border-r border-gray-200 p-2">
            <Text className="text-sm text-gray-500 mb-1">ANO</Text>
            <Text className="text-base font-bold">{book.year}</Text>
          </View>
          <View className="flex-1 items-center border-r border-gray-200 p-2">
            <Text className="text-sm text-gray-500 mb-1">PÁGINAS</Text>
            <Text className="text-base font-bold">{book.pages}</Text>
          </View>
          <View className="flex-1 items-center p-2">
            <Text className="text-sm text-gray-500 mb-1">STATUS</Text>
            <TouchableOpacity onPress={handleOpenBottomSheet}>
              <Text className="text-base font-bold text-blue-500">Adicionar</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex-row items-center mt-8">
          <Image
            source={require('@/assets/user-icon.png')}
            className="w-16 h-16 rounded-full mr-4"
          />
          <View className="flex-1">
            <Text className="text-lg font-bold">{book.author}</Text>
            <Text className="text-sm text-gray-500" numberOfLines={2}>
              Descrição do Autor
            </Text>
          </View>
        </View>

        <View className="my-4">
          <Text className="text-base text-justify">
            {book.description}
          </Text>
        </View>
      </View>
      <BottomDrawer isOpen={isBottomSheetOpen} handleClose={handleCloseBottomSheet} book={book} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 500,
    zIndex: -1,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  contentContainer: {
    paddingTop: 150,
    paddingHorizontal: 20,
  },
});

export default BookDetails;
