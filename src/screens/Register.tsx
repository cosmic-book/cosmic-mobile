import { User } from '@/@types'
import { AuthStackParamList } from '@/@types/navigation'
import { Button, DropDown, DropDownContent, DropDownItem, DropDownTrigger, Heading, Input } from '@/components'
import { UserService } from '@/services'
import { dateApplyMask } from '@/utils/masks'
import { validateFields } from '@/utils/ValidateFields'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'

type RegisterProps = NativeStackScreenProps<AuthStackParamList, 'Register'>

const Register = ({ navigation }: RegisterProps) => {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [birthday, setBirthday] = useState('')
  const [gender, setGender] = useState('')
  const [password, setPassword] = useState('')

  const [nameError, setNameError] = useState(false)
  const [usernameError, setUsernameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [birthdayError, setBirthdayError] = useState(false)
  const [genderError, setGenderError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  const applyMask = (input: string) => {
    const value = input.replace(/\D/g, '')

    const date = dateApplyMask(value)
    return setBirthday(date)
  }

  const validate = () => {
    return validateFields([
      { value: name, setter: setNameError },
      { value: username, setter: setUsernameError },
      { value: email, setter: setEmailError },
      { value: birthday, setter: setBirthdayError },
      { value: gender, setter: setGenderError },
      { value: password, setter: setPasswordError }
    ])
  }

  const handleRegister = async () => {
    if (validate()) {
      const user: User = {
        name,
        username,
        email,
        birthday,
        gender: gender.charAt(0),
        password
      }

      const result = await UserService.create(user)

      if (result) navigation.navigate('Login')
    }
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
            placeholder="Nome Completo"
            variant={nameError ? 'error' : 'default'}
            value={name}
            onChangeText={setName}
          />
          <Input
            placeholder="Nome de Usuário"
            variant={usernameError ? 'error' : 'default'}
            value={username}
            onChangeText={setUsername}
          />
          <Input
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            variant={emailError ? 'error' : 'default'}
            value={email}
            onChangeText={setEmail}
          />
          <Input
            placeholder="Data de Nascimento"
            keyboardType="number-pad"
            variant={birthdayError ? 'error' : 'default'}
            value={birthday}
            maxLength={10}
            onChangeText={applyMask}
          />
          <DropDown>
            <DropDownTrigger>
              <Input
                placeholder={'Gênero'}
                value={gender}
                variant={genderError ? 'error' : 'default'}
                showSoftInputOnFocus={false}
              />
            </DropDownTrigger>
            <DropDownContent>
              {['Masculino', 'Feminino', 'Outro'].map((item, index) => (
                <DropDownItem key={index}>
                  <TouchableOpacity className="flex flex-row gap-2 items-center" onPress={() => setGender(item)}>
                    <Text className="text-black text-xl">{item}</Text>
                  </TouchableOpacity>
                </DropDownItem>
              ))}
            </DropDownContent>
          </DropDown>
          <Input
            placeholder="Senha"
            secureTextEntry={true}
            autoCapitalize="none"
            variant={passwordError ? 'error' : 'default'}
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <Button label="Cadastrar" onPress={handleRegister} />

        <View className="mt-10">
          <View className="flex flex-row items-center justify-center">
            <Text className="text-gray-600">Já possui uma conta? </Text>
            <Button label="Entrar" variant={'link'} size={null} onPress={() => navigation.navigate('Login')} />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default Register
