import { User } from '@/@types'
import { AuthStackParamList } from '@/@types/navigation'
import { Button, Heading } from '@/components'
import { DateInput, GenderSelect, Input, PasswordInput } from '@/components/fields'
import { UserService } from '@/services'
import { validateFields } from '@/utils/ValidateFields'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import moment from 'moment'
import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'

type RegisterProps = NativeStackScreenProps<AuthStackParamList, 'Register'>

const Register = ({ navigation }: RegisterProps) => {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [birthday, setBirthday] = useState<Date | null>(null)
  const [gender, setGender] = useState<number | null>(null)
  const [password, setPassword] = useState('')

  const [error, setError] = useState(false)

  const validate = () => {
    return validateFields([
      {
        value: (name && username && email && birthday && gender && password),
        setter: setError
      },
    ])
  }

  const handleRegister = async () => {
    if (validate()) {
      const user: Partial<User> = {
        name,
        username,
        email,
        birthday: moment(birthday).format('YYYY-MM-DD'),
        gender: gender ?? 0,
        password
      }

      const result = await UserService.create(user)

      if (result) navigation.navigate('Login')
    }
  }

  const handleClear = () => {
    setName('')
    setUsername('')
    setEmail('')
    setBirthday(null)
    setGender(null)
    setPassword('')
  }

  return (
    <View className="bg-white flex-1 justify-center">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 16 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="justify-center items-center mb-6">
          <Heading content="Criar conta" />
        </View>

        <View className="my-6 gap-3">
          <Input
            placeholder="Nome Completo *"
            value={name}
            onChangeText={setName}
          />
          <Input
            placeholder="Nome de Usuário *"
            value={username}
            onChangeText={setUsername}
          />
          <Input
            placeholder="E-mail *"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <DateInput
            placeholder="Data de Nascimento *"
            date={birthday}
            onChangeDate={setBirthday}
          />
          <GenderSelect
            value={gender}
            onChangeOption={setGender}
          />
          <PasswordInput
            placeholder='Senha *'
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View className='items-center gap-3'>
          {error && (
            <Text className='text-sm text-error'>
              Preencha os campos para se cadastrar
            </Text>
          )}

          <Button className='w-full' label="Cadastrar" onPress={handleRegister} />

          <Button
            label="Limpar campos"
            onPress={handleClear}
            variant={'inline'}
            size={null}
          />
        </View>

        <View className="mt-10">
          <View className="flex flex-row items-center justify-center">
            <Text className="text-gray-600">Já possui uma conta? </Text>
            <Button
              label="Entrar"
              variant={'link'}
              size={null}
              onPress={() => navigation.navigate('Login')}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default Register
