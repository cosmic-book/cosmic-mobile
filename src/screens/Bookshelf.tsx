import { MainStackParamList } from '@/@types/navigation'
import { Heading } from '@/components'
import { RouteProp } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { ScrollView, View } from 'react-native'

type BookshelfProps = {
  navigation: NativeStackScreenProps<MainStackParamList, 'Bookshelf'>
  route: RouteProp<any>
}

const Bookshelf = ({ navigation, route }: BookshelfProps) => {
  return (
    <View className="flex-1 justify-center items-center container bg-white h-full">
      <ScrollView
        className="w-full"
        contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      >
        <Heading content="Bookshelf" />
      </ScrollView>
    </View>
  )
}

export default Bookshelf
