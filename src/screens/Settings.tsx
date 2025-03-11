import { TUser } from '@/@types';
import { TMainStackParamList } from '@/@types/navigation';
import { Button } from '@/components';
import { Input, PasswordInput } from '@/components/fields';
import { useAuth } from '@/contexts/AuthContext';
import { UsersService } from '@/services';
import { validateFields } from '@/utils/ValidateFields';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ArrowLeft, SettingsIcon } from 'lucide-react-native';
import moment from 'moment';
import React, { useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';

type SettingsProps = NativeStackScreenProps<TMainStackParamList, 'Settings'>;

const Settings = ({ navigation }: SettingsProps) => {
  const { actualUser, logout } = useAuth();
  const [username, setUsername] = useState(actualUser?.username || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(false);

  const validate = () => {
    return validateFields([
      {
        value: username && password && confirmPassword && password === confirmPassword,
        setter: setError
      }
    ]);
  };

  const handleSaveChanges = async () => {
    if (!actualUser?.id) {
      Alert.alert('Erro', 'ID do usuário não encontrado.');
      return;
    }

    if (validate()) {
      const user: TUser = {
        id: actualUser.id,
        username,
        password,
        email: actualUser.email,
        name: actualUser.name,
        birthday: moment(actualUser.birthday).format('YYYY-MM-DD'),
        gender: actualUser.gender
      };

      try {
        const result = await UsersService.update(actualUser.id, user);

        if (result) {
          Alert.alert('Sucesso', 'Alterações salvas com sucesso. Faça login novamente.');
          logout();
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
    <View className="flex-1 bg-white h-full gap-3">
      <View className="bg-white w-full pt-12 pb-4 px-5 shadow-lg shadow-black">
        <View className="flex-row items-center relative">
          <TouchableOpacity onPress={() => navigation.goBack()} className="absolute left-0">
            <ArrowLeft size={24} color="black" />
          </TouchableOpacity>

          <View className="flex-col justify-center items-center mx-auto">
            <View className="flex-row items-center gap-2">
              <SettingsIcon color="#1460cd" size={20} />
              <Text className="text-primary text-lg font-medium">Configurações</Text>
            </View>
            <Text className="text-gray-700 text-sm">Altere seu Nome de Usuário e Senha</Text>
          </View>
        </View>
      </View>

      <View className="px-6 gap-3">
        <View className="flex-col">
          <Text className="text-gray-500 text-base font-bold mt-2 mb-2">Alterar Nome de Usuário</Text>
          <Input placeholder="Nome de Usuário *" value={username} onChangeText={setUsername} />
        </View>

        <View className="flex-col">
          <Text className="text-gray-500 text-base font-bold mt-2 mb-2">Alterar Senha</Text>
          <View className="gap-3">
            <PasswordInput placeholder="Senha *" value={password} onChangeText={setPassword} />

            <PasswordInput placeholder="Confirmar Senha *" value={confirmPassword} onChangeText={setConfirmPassword} />
          </View>
        </View>
      </View>

      <View className="items-center px-6 gap-3">
        {error && <Text className="text-sm text-error">Preencha os campos corretamente</Text>}

        <Button className="w-full mt-6" label="Salvar Alterações" onPress={handleSaveChanges} />
      </View>
    </View>
  );
};

export default Settings;
