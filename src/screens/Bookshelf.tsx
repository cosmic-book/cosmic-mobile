import { MainStackParamList } from '@/@types/navigation'
import { Button, ImageView, Skeleton } from '@/components'
import { ReadingGridItem } from '@/components/layout'
import { GlobalContext } from '@/contexts/GlobalContext'
import { NavigationProp, RouteProp } from '@react-navigation/native'
import React, { useContext } from 'react'
import { FlatList, Text, View } from 'react-native'

type BookshelfProps = {
  navigation: NavigationProp<MainStackParamList, 'Bookshelf'>
  route: RouteProp<any>
}

const Bookshelf = ({ navigation, route }: BookshelfProps) => {
  const { loading, userReadingsInfo } = useContext(GlobalContext)

  return (
    <View className="flex-1 justify-center bg-white h-full pt-16 px-6 gap-3">
      <Text className='font-semibold text-xl text-primary'>Minha Estante</Text>

      <View className="h-full flex-row flex-wrap justify-center pt-2 border-t border-gray-200">
        {!loading ? (
          <FlatList
            data={userReadingsInfo.readings}
            numColumns={3}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingBottom: 100 }}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View className="w-[30%]">
                <ReadingGridItem reading={item} navigation={navigation} />
              </View>
            )}
            ListEmptyComponent={
              <View className="flex py-24 justify-center items-center">
                <ImageView
                  image={require('@/assets/no-results.png')}
                  label="Parece que sua estante está vazia"
                  width={350}
                  height={300}
                />
                {/* <Button
                  label="Buscar livros"
                  variant='link'
                  onPress={() => navigation.navigate('Search')}
                /> */}
              </View>
            }
          />
        ) : (
          <View className="w-full flex-row flex-wrap items-center justify-center gap-3">
            {[...Array(12)].map((_, index) => (
              <View key={index} className="w-[30%] p-1 gap-2">
                <Skeleton className="h-44" />
                <Skeleton className="mx-4 h-2" />
                <Skeleton className="mx-2 h-2" />
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  )
}

export default Bookshelf
