import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Heading from '@/components/Heading';
import CustomButton from '@/components/CustomButton';
import { colors } from '@/styles/colors';
import { RootStackParamList } from '@/navigation/RootStackParamList';

type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Login = ({ navigation }: LoginProps) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <SafeAreaView className="container p-6 bg-white h-full">
            <View className="mt-48 justify-center items-center">
                <Heading content="Bem vindo!" />
            </View>
            <View className="mt-4">
                <TextInput
                    onChangeText={setUsername}
                    placeholder={'Nome de usuário'}
                    value={username}
                    className="bg-zinc-200 py-3 rounded-xl pl-5"
                />
                <TextInput
                    secureTextEntry={true}
                    onChangeText={setPassword}
                    placeholder={'Senha'}
                    value={password}
                    className="bg-zinc-200 py-3 rounded-xl pl-5 mt-3"
                />
                <View className="mb-4">
                    <TouchableOpacity
                        className="flex items-end mt-2 mb-4"
                        onPress={() => navigation.goBack()}>
                        <Text className="font-bold text-textDark">Esqueceu a senha?</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <CustomButton
                navigation={navigation}
                bgColor={colors.primary}
                textColor={colors.textWhite}
                //goto={'Home'}
                content={'Entrar'}
            />
            <View className="mt-10">
                <View className="flex flex-row items-center justify-center">
                    <Text className="text-textDark">Não possui uma conta? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                        <Text className="underline text-textDark">Criar conta</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Login;
