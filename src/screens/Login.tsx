import { Button, Heading, Input } from '@/components'
import { RootStackParamList } from '@/navigation/RootStackParamList'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useState } from 'react'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'

type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>

const Login = ({ navigation }: LoginProps) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <SafeAreaView className="container p-6 bg-white h-full">
      <View className="mt-48 justify-center items-center">
        <Heading content="Bem vindo!" />
      </View>

      <View className="mt-4">
        <View className="gap-3">
          <Input placeholder={'Nome de usuário'} value={username} onChangeText={setUsername} />
          <Input placeholder={'Senha'} value={password} onChangeText={setPassword} />
        </View>
        <View className="mb-4">
          <TouchableOpacity className="flex items-end mt-2 mb-4" onPress={() => navigation.goBack()}>
            <Text className="font-bold text-textDark">Esqueceu a senha?</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Button label="Entrar" />

      <View className="mt-10">
        <View className="flex flex-row items-center justify-center">
          <Text className="text-textDark">Não possui uma conta? </Text>
          <Button label="Criar conta" variant={'link'} size={null} onPress={() => navigation.navigate('Signup')} />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Login
