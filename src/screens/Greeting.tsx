import { Button, Heading } from '@/components'
import { RootStackParamList } from '@/navigation/RootStackParamList'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { Image, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

type GreetingProps = NativeStackScreenProps<RootStackParamList, 'Greeting'>

const Greeting = ({ navigation }: GreetingProps) => {
  return (
    <SafeAreaView className="container bg-white h-full">
      <View className="flex justify-center items-center mt-24">
        <Image source={require('../../assets/reading.png')} style={{ width: 400, height: 300 }} />
      </View>

      <View className="px-7">
        <Heading content="Cosmic" />
        <Text className="text-base opacity-60 text-textDark tracking-tight mt-2">
          Organize suas leituras, defina metas e transforme o hábito de ler em uma experiência gratificante!
        </Text>
      </View>

      <View className="mt-6 px-7">
        <Button label="Login" className="mb-4" onPress={() => navigation.navigate('Login')} />
        <Button label="Signup" variant={'secondary'} onPress={() => navigation.navigate('Signup')} />
      </View>
    </SafeAreaView>
  )
}

export default Greeting
