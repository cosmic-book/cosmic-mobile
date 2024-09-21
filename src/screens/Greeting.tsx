import { Button, Heading } from '@/components'
import { RootStackParamList } from '@/navigation/RootStackParamList'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { Image, Text, View } from 'react-native'
import packageInfo from '../../package.json'

type GreetingProps = NativeStackScreenProps<RootStackParamList, 'Greeting'>

const Greeting = ({ navigation }: GreetingProps) => {
  return (
    <View className="flex-1 justify-center container bg-white h-full">
      <View className="items-center">
        <Image source={require('@/assets/reading.png')} style={{ width: 400, height: 300 }} />
      </View>

      <View className="px-7">
        <Heading content="Cosmic" />
        <Text className="text-base opacity-60 text-textDark tracking-tight mt-2">
          Organize sua estante, defina metas e transforme o hábito da leitura em uma experiência gratificante!
        </Text>
      </View>

      <View className="mt-6 px-7">
        <Button label="Entrar" className="mb-4" onPress={() => navigation.navigate('Login')} />
        <Button label="Criar conta" variant={'secondary'} onPress={() => navigation.navigate('Signup')} />
      </View>

      <View className="mt-5 px-7">
        <Text className="text-center text-sm text-textDark opacity-60">
          v{packageInfo.version} - © 2024 Cosmic. Todos os direitos reservados.
        </Text>
      </View>
    </View>
  )
}

export default Greeting
