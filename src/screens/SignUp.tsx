import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import Heading from '../components/Heading';
import CustomButton from '../components/CustomButton';
import { colors } from '@/styles/colors';
import { RootStackParamList } from '@/navigation/RootStackParamList';

type SignupProps = NativeStackScreenProps<RootStackParamList, 'Signup'>;

const Signup = ({ navigation }: SignupProps) => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <SafeAreaView className="container px-8 h-full bg-white">
            <View className="px-6 mt-48">
                <View className="justify-center items-center">
                    <Heading content="Criar conta" />
                </View>
                <View className="mt-4">
                    <TextInput
                        onChangeText={setName}
                        placeholder={'Nome'}
                        placeholderTextColor={colors.textDark}
                        value={name}
                        className="bg-zinc-200 py-3 rounded-xl px-5 text-textgray"
                    />
                    <TextInput
                        onChangeText={setUsername}
                        placeholder={'Nome de usuário'}
                        placeholderTextColor={colors.textDark}
                        value={username}
                        className="bg-zinc-200 py-3 rounded-xl px-5 mt-3 text-textgray"
                    />
                    <TextInput
                        onChangeText={setEmail}
                        placeholder={'Email'}
                        placeholderTextColor={colors.textDark}
                        value={email}
                        className="bg-zinc-200 py-3 rounded-xl px-5 mt-3 text-textgray"
                    />
                    <TextInput
                        secureTextEntry={true}
                        onChangeText={setPassword}
                        placeholder={'Senha'}
                        placeholderTextColor={colors.textDark}
                        value={password}
                        className="bg-zinc-200 py-3 rounded-xl px-5 mt-3 text-textgray"
                    />
                    <TouchableOpacity
                        className="flex items-end mt-4 mb-2"
                        onPress={() => navigation.goBack()}>
                        <Text className="font-bold text-textgray">Esqueceu a senha?</Text>
                    </TouchableOpacity>
                </View>
                <CustomButton
                    navigation={navigation}
                    bgColor={colors.primary}
                    textColor={colors.textWhite}
                    goto={'Login'}
                    content={'Cadastrar'}
                />
                <View className="mt-10">
                    <View className="flex flex-row items-center justify-center">
                        <Text className="text-textgray">Já possui uma conta? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text className="underline text-textgray">Entrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Signup;