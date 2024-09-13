import { Heading } from '@/components'
import { NavigationProp, RouteProp } from '@react-navigation/native'
import React from 'react'
import { ScrollView, View } from 'react-native'

type BookshelfProps = {
  navigation: NavigationProp<any>
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
