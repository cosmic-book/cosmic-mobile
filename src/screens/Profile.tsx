import { Heading } from '@/components'
import { NavigationProp, RouteProp } from '@react-navigation/native'
import React from 'react'
import { ScrollView, View } from 'react-native'

type ProfileProps = {
  navigation: NavigationProp<any>
  route: RouteProp<any>
}

const Profile = ({ navigation, route }: ProfileProps) => {
  return (
    <View className="flex-1 justify-center items-center container bg-white h-full">
      <ScrollView
        className="w-full"
        contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      >
        <Heading content="Profile" />
      </ScrollView>
    </View>
  )
}

export default Profile
