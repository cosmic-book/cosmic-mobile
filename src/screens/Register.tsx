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
  const [user, setUser] = useState<User>({} as User)

  const [error, setError] = useState(false)

  const validate = () => {
    return validateFields([
      {
        value: (user.name && user.username && user.email && user.birthday && user.gender && user.password),
        setter: setError
      },
    ])
  }

  const handleRegister = async () => {
    if (validate()) {
      const payload: Partial<User> = {
        ...user,
        birthday: moment(user.birthday).format('YYYY-MM-DD'),
        gender: user.gender ?? 0,
      }

      const result = await UserService.create(payload)

      if (result) navigation.navigate('Login')
    }
  }

  const handleClear = () => {
    setUser({} as User)
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
            value={user.name}
            onChangeText={(value) => setUser({ ...user, name: value })}
          />

          <Input
            placeholder="Nome de Usuário *"
            value={user.username}
            onChangeText={(value) => setUser({ ...user, username: value })}
          />

          <Input
            placeholder="E-mail *"
            keyboardType="email-address"
            autoCapitalize="none"
            value={user.email}
            onChangeText={(value) => setUser({ ...user, email: value })}
          />

          <DateInput
            placeholder="Data de Nascimento *"
            date={user.birthday}
            onChangeDate={(date) => setUser({ ...user, birthday: date ?? '' })}
          />

          <GenderSelect
            value={user.gender}
            onChangeOption={(value) => setUser({ ...user, gender: value ?? 0 })}
          />

          <PasswordInput
            placeholder='Senha *'
            value={user.password}
            onChangeText={(value) => setUser({ ...user, password: value })}
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
