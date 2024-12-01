import { Reading } from '@/@types';
import { MainStackParamList } from '@/@types/navigation';
import { BackButton, ReadingEditModalize } from '@/components';
import { useAuth } from '@/contexts/AuthContext';
import { GlobalContext } from '@/contexts/GlobalContext';
import { useIsFocused } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Modalize } from 'react-native-modalize';

type BookDetailsProps = NativeStackScreenProps<MainStackParamList, 'BookDetails'>;

const statusTypes = [
  {
    label: 'Quero Ler',
    color: 'text-blue-500',
  },
  {
    label: 'Lendo',
    color: 'text-yellow-500',
  },
  {
    label: 'Concluído',
    color: 'text-green-500',
  },
  {
    label: 'Relendo',
    color: 'text-orange-500',
  },
  {
    label: 'Abandonado',
    color: 'text-red-500',
  },
]

const BookDetails = ({ route, navigation }: BookDetailsProps) => {
  const { book } = route.params;

  const { actualUser } = useAuth()
  const { userReadingsInfo, getUserReadingsInfo, loadReading } = useContext(GlobalContext)

  const readingModalizeRef = useRef<Modalize>(null)

  const isFocused = useIsFocused()

  const [imageError, setImageError] = useState(false);

  const [statusLabel, setStatusLabel] = useState('');
  const [statusColor, setStatusColor] = useState('');

  const handleLoad = async (id: number) => {
    await loadReading(id);

    if (actualUser) {
      await getUserReadingsInfo(actualUser.id);
    }
  }

  useEffect(() => {
    readingModalizeRef.current?.close()
  }, [isFocused]);

  useEffect(() => {
    if (book.cover) {
      setImageError(false)
    }

    setStatusLabel('Adicionar')
    setStatusColor('text-blue-500')

    userReadingsInfo.readings.filter((reading) => {
      if (reading.id_book === book.id && reading.status !== null) {
        handleLoad(reading.id)

        setStatusLabel(statusTypes[reading.status].label)
        setStatusColor(statusTypes[reading.status].color)
      }
    })
  }, [book])

  return (
    <GestureHandlerRootView>
      <ScrollView className="flex-1 color-gray-200">
        <BackButton color='white' onPress={() => navigation.goBack()} />

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
              <TouchableOpacity onPress={() => readingModalizeRef.current?.open()}>
                <Text className={`${statusColor} text-base font-bold`}>{statusLabel}</Text>
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
      </ScrollView>

      <ReadingEditModalize book={book} modalRef={readingModalizeRef} />
    </GestureHandlerRootView>
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
