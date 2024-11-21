import { AuthStackParamList } from '@/@types/navigation'
import { Button, Heading } from '@/components'
import { Input, PasswordInput } from '@/components/fields'
import { useAuth } from '@/contexts/AuthContext'
import { GlobalContext } from '@/contexts/GlobalContext'
import { validateFields } from '@/utils/ValidateFields'
import { useIsFocused } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useContext, useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

type LoginProps = NativeStackScreenProps<AuthStackParamList, 'Login'>

const Login = ({ navigation }: LoginProps) => {
  const { login } = useAuth();
  const { loading, setLoading, getUserReadingsInfo } = useContext(GlobalContext)

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
      setLoading(true)

      const user = await login(username, password)

      if (user) {
        await getUserReadingsInfo(user.id)
      }
    }

    setLoading(false)
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
            placeholder='Nome de usuário *'
            variant={usernameError ? 'error' : 'default'}
            value={username}
            onChangeText={setUsername}
            clearable
          />
          <PasswordInput
            placeholder='Senha *'
            value={password}
            onChangeText={setPassword}
            variant={passwordError ? 'error' : 'default'}
          />
        </View>
        <View className="mb-4">
          <TouchableOpacity className="flex items-end mt-2 mb-4 mr-2" onPress={() => { }}>
            <Text className="font-medium text-gray-600">Esqueceu a senha?</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Button label="Entrar" loading={loading} onPress={handleLogin} />

      <View className="mt-10">
        <View className="flex flex-row items-center justify-center">
          <Text className="text-textDark">Não possui uma conta? </Text>
          <Button label="Criar conta" variant={'link'} size={null} onPress={() => navigation.navigate('Register')} />
        </View>
      </View>
    </View>
  )
}

export default Login
