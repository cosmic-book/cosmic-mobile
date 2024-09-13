import { Button, Heading, Input } from '@/components'
import { RootStackParamList } from '@/navigation/RootStackParamList'
import { UserService } from '@/services'
import { validateFields } from '@/utils/ValidateFields'
import { useIsFocused } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>

const Login = ({ navigation }: LoginProps) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [usernameError, setUsernameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  const validate = () => {
    return validateFields([
      { value: username, setter: setUsernameError },
      { value: password, setter: setPasswordError }
    ])
  }

  const isFocused = useIsFocused()

  const handleLogin = async () => {
    if (validate()) {
      const result = await UserService.login(username, password)

      if (result) navigation.navigate('MainApp')
    }
  }

  const clearFields = () => {
    setUsername('')
    setPassword('')
  }

  useEffect(() => {
    clearFields()
  }, [isFocused])

  return (
    <View className="flex-1 justify-center container p-6 bg-white h-full">
      <View className="items-center">
        <Heading content="Bem vindo!" />
      </View>

      <View className="mt-4">
        <View className="gap-3">
          <Input
            placeholder={'Nome de usuário'}
            variant={usernameError ? 'error' : 'default'}
            value={username}
            onChangeText={setUsername}
          />
          <Input
            placeholder={'Senha'}
            secureTextEntry={true}
            autoCapitalize="none"
            variant={passwordError ? 'error' : 'default'}
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <View className="mb-4">
          <TouchableOpacity className="flex items-end mt-2 mb-4" onPress={() => navigation.goBack()}>
            <Text className="font-bold text-textDark">Esqueceu a senha?</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Button label="Entrar" onPress={handleLogin} />

      <View className="mt-10">
        <View className="flex flex-row items-center justify-center">
          <Text className="text-textDark">Não possui uma conta? </Text>
          <Button label="Criar conta" variant={'link'} size={null} onPress={() => navigation.navigate('Signup')} />
        </View>
      </View>
    </View>
  )
}

export default Login
