import { Reading } from '@/@types'
import { BookshelfFilter } from '@/@types/filters'
import { MainStackParamList } from '@/@types/navigation'
import { ImageView, Skeleton } from '@/components'
import { ReadingGridItem } from '@/components/layout'
import { BookshelfFilterModal, ReadingMenuModal } from '@/components/modals'
import { useAuth } from '@/contexts/AuthContext'
import { GlobalContext } from '@/contexts/GlobalContext'
import { NavigationProp, RouteProp, useIsFocused } from '@react-navigation/native'
import { Filter } from 'lucide-react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Modalize } from 'react-native-modalize'

type BookshelfProps = {
  navigation: NavigationProp<MainStackParamList, 'Bookshelf'>
  route: RouteProp<any>
}

const Bookshelf = ({ navigation, route }: BookshelfProps) => {
  const { actualUser } = useAuth()
  const { loading, userInfos, loadUserInfos, loadReading } = useContext(GlobalContext)

  const modalizeRef = useRef<Modalize>(null)
  const filterModalRef = useRef<Modalize | null>(null);

  const isFocused = useIsFocused()

  const [hasFilter, setHasFilter] = useState(false)

  const openModalize = async (reading: Reading) => {
    await loadReading(reading.id)
    modalizeRef.current?.open()
  }

  const handleFilter = async (filters: BookshelfFilter) => {
    const hasFilters = !!(filters.category !== undefined || filters.status !== undefined || filters.type !== undefined || filters.rating !== undefined)

    setHasFilter(hasFilters)

    if (actualUser) {
      await loadUserInfos(actualUser.id, filters)
    }
  }

  useEffect(() => {
    modalizeRef.current?.close()
    filterModalRef.current?.close()
  }, [isFocused]);

  return (
    <GestureHandlerRootView>
      <View className="flex-1 justify-center bg-white h-full pt-20 px-6 gap-3">
        <View className="flex-row justify-between items-center">
          <Text className="font-semibold text-xl text-primary">Minha Estante</Text>
          <TouchableOpacity onPress={() => filterModalRef.current?.open()}>
            <Filter size={24} color="grey" fill={hasFilter ? 'grey' : 'transparent'} />
          </TouchableOpacity>
        </View>

        <View className="h-full flex-row flex-wrap justify-center pt-2 border-t border-gray-200">
          {!loading ? (
            <FlatList
              data={userInfos.filteredReadings}
              numColumns={3}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={{ paddingBottom: 100 }}
              columnWrapperStyle={{ justifyContent: 'flex-start', gap: 15 }}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <View className="w-[30%]">
                  <ReadingGridItem
                    reading={item}
                    navigation={navigation}
                    onPress={() => openModalize(item)}
                  />
                </View>
              )}
              ListEmptyComponent={
                <View className="flex py-24 justify-center items-center">
                  <ImageView
                    image={require('@/assets/no-results.png')}
                    label={hasFilter ? 'Nenhuma leitura encontrada' : 'Parece que sua estante está vazia'}
                    width={350}
                    height={300}
                  />
                </View>
              }
            />
          ) : (
            <View className="w-full flex-row flex-wrap items-center justify-center gap-3">
              {[...Array(12)].map((_, index) => (
                <View key={index} className="w-[30%] p-1 gap-2">
                  <Skeleton className="h-44" />
                  <Skeleton className="mx-2 h-2" />
                </View>
              ))}
            </View>
          )}
        </View>

        <BookshelfFilterModal modalRef={filterModalRef} onApplyFilters={handleFilter} />

        <ReadingMenuModal modalRef={modalizeRef} navigation={navigation} />
      </View>
    </GestureHandlerRootView>
  );
};

export default Bookshelf;
