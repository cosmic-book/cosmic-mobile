import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '@/contexts/AuthContext';
import { Input, PasswordInput } from '@/components/fields';
import { BackButton, Button } from '@/components';
import { validateFields } from '@/utils/ValidateFields';
import moment from 'moment';
import { User } from '@/@types';
import { UserService } from '@/services';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '@/@types/navigation';

type SettingsProps = NativeStackScreenProps<MainStackParamList, 'Settings'>;

const Settings = ({ navigation }: SettingsProps) => {
    const { actualUser } = useAuth();
    const [username, setUsername] = useState(actualUser?.username || '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(false);

    const validate = () => {
        return validateFields([
            {
                value: username && password && confirmPassword && password === confirmPassword,
                setter: setError,
            },
        ]);
    };

    const handleSaveChanges = async () => {
        if (!actualUser?.id) {
            Alert.alert('Erro', 'ID do usuário não encontrado.');
            return;
        }

        if (validate()) {
            const user: Partial<User> = {
                id: actualUser.id,
                username,
                password,
                email: actualUser.email,
                name: actualUser.name,
                birthday: moment(actualUser.birthday).format('YYYY-MM-DD'),
                gender: actualUser.gender,
            };

            try {
                const result = await UserService.update(actualUser.id, user);

                if (result) {
                    Alert.alert('Sucesso', 'Alterações salvas com sucesso.');
                    navigation.navigate('Menu');
                } else {
                    Alert.alert('Erro', 'Não foi possível salvar as alterações.');
                }
            } catch (error) {
                console.error('Erro ao salvar alterações:', error);
                Alert.alert('Erro', 'Ocorreu um erro ao salvar as alterações.');
            }
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            setPassword('');
            setConfirmPassword('');
        }, [])
    );

    return (
        <View className="flex-1 bg-white h-full pt-16 px-6 gap-3">
            <BackButton color="black" targetScreen="Menu" />

            <View className="flex-row items-center justify-between border_bottom py-4 mt-8">
                <View>
                    <Text className="text-primary text-lg font-medium">Configurações</Text>
                    <Text className="text-gray-700 text-sm">Altere seu nome de usuário e senha</Text>
                </View>
            </View>

            <View className="gap-3">
                <Input
                    placeholder="Nome de Usuário *"
                    value={username}
                    onChangeText={setUsername}
                />
                <Text className="text-gray-500 text-base font-bold mt-2 mb-2">
                    Alterar Senha
                </Text>
                <PasswordInput
                    placeholder="Senha *"
                    value={password}
                    onChangeText={setPassword}
                />
                <PasswordInput
                    placeholder="Confirmar Senha *"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
            </View>

            <View className="items-center gap-3">
                {error && (
                    <Text className="text-sm text-error">
                        Preencha os campos corretamente
                    </Text>
                )}

                <Button className="w-full mt-6" label="Salvar Alterações" onPress={handleSaveChanges} />
            </View>
        </View>
    );
};

export default Settings;
