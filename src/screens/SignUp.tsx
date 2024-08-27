import { Button, Heading, Input } from '@/components'
import { RootStackParamList } from '@/navigation/RootStackParamList'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useState } from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

type SignupProps = NativeStackScreenProps<RootStackParamList, 'Signup'>

const Signup = ({ navigation }: SignupProps) => {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <SafeAreaView className="container px-8 h-full bg-white">
      <View className="px-6 mt-48">
        <View className="justify-center items-center">
          <Heading content="Criar conta" />
        </View>

        <View className="my-6 gap-3">
          <Input placeholder="Nome" value={name} onChangeText={setName} />
          <Input placeholder="Nome de usuário" value={username} onChangeText={setUsername} />
          <Input placeholder="E-mail" value={email} onChangeText={setEmail} />
          <Input placeholder="Senha" value={password} onChangeText={setPassword} />
        </View>

        <Button label="Cadastrar" onPress={() => navigation.navigate('Login')} />

        <View className="mt-10">
          <View className="flex flex-row items-center justify-center">
            <Text className="text-gray-600">Já possui uma conta? </Text>
            <Button label="Entrar" variant={'link'} size={null} onPress={() => navigation.navigate('Login')} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Signup
