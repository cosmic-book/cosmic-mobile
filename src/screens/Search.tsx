import { Heading } from '@/components'
import { NavigationProp, RouteProp } from '@react-navigation/native'
import React from 'react'
import { ScrollView, View } from 'react-native'

type SearchProps = {
  navigation: NavigationProp<any>
  route: RouteProp<any>
}

const Search = ({ navigation, route }: SearchProps) => {
  return (
    <View className="flex-1 justify-center items-center container bg-white h-full">
      <ScrollView
        className="w-full"
        contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      >
        <Heading content="Search" />
      </ScrollView>
    </View>
  )
}

export default Search
