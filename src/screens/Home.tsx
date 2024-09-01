import { Heading } from '@/components'
import { RootStackParamList } from '@/navigation/RootStackParamList'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { View } from 'react-native'

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>

const Home = ({ navigation }: HomeProps) => {
  return (
    <View className="flex-1 justify-center container bg-white h-full">
      <View className="px-7 items-center">
        <Heading content="Home" />
      </View>
    </View>
  )
}

export default Home
