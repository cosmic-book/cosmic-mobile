import { Button, Heading, Input } from '@/components'
import { RootStackParamList } from '@/navigation/RootStackParamList'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useState } from 'react'
import { Text, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

type SignupProps = NativeStackScreenProps<RootStackParamList, 'Signup'>

const Signup = ({ navigation }: SignupProps) => {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
      style={{ flex: 1 }}
    >
      <SafeAreaView className="flex-1 bg-white">
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 16 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 justify-center items-center mt-48 mb-6">
            <Heading content="Criar conta" />
          </View>

          <View className="my-6 gap-3">
            <Input placeholder="Nome" value={name} onChangeText={setName} />
            <Input placeholder="Nome de usuário" value={username} onChangeText={setUsername} />
            <Input placeholder="E-mail" value={email} onChangeText={setEmail} />
            <Input placeholder="Senha" value={password} onChangeText={setPassword} />
            <Input placeholder="Confirme a Senha" value={password} onChangeText={setPassword} />
            <Input placeholder="Código de Verificação" value={password} onChangeText={setPassword} />
            <Input placeholder="Código de Verificação" value={password} onChangeText={setPassword} />
          </View>

          <Button label="Cadastrar" onPress={() => navigation.navigate('Login')} />

          <View className="mt-10">
            <View className="flex-row items-center justify-center">
              <Text className="text-gray-600">Já possui uma conta? </Text>
              <Button label="Entrar" variant={'link'} size={null} onPress={() => navigation.navigate('Login')} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

export default Signup
