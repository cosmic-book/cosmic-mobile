import { User } from '@/@types';
import { MainStackParamList } from '@/@types/navigation';
import { Avatar, AvatarImage, BackButton, Button, Heading, ImagePickerModal } from '@/components';
import { DateInput, GenderSelect, Input } from '@/components/fields';
import { useAuth } from '@/contexts/AuthContext';
import UserService from '@/services/UserService';
import { validateFields } from '@/utils/ValidateFields';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Camera } from 'lucide-react-native';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

type ProfileEditProps = NativeStackScreenProps<MainStackParamList, 'ProfileEdit'>;

function ProfileEditScreen({ navigation }: ProfileEditProps) {
  const { actualUser, setActualUser } = useAuth();

  const [user, setUser] = useState<User>({} as User);

  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (actualUser) {
        setUser(actualUser);
      }
    };

    fetchUserData();
  }, [actualUser]);

  const handleImagePicked = (uri: string | null) => {
    setUser({ ...user, image: uri });
  };

  const validate = () => {
    return validateFields([
      {
        value: (user.name && user.email && user.birthday && user.gender),
        setter: setError,
      },
    ]);
  };

  const handleSave = async () => {
    if (validate() && actualUser && actualUser.id !== undefined) {
      const updatedUser: User = {
        ...actualUser,
        name: user.name,
        email: user.email,
        image: user.image,
        birthday: moment(user.birthday).format('YYYY-MM-DD'),
        gender: user.gender ?? 0,
      };

      const result = await UserService.update(actualUser.id, updatedUser);

      setActualUser(updatedUser);

      if (result) {
        navigation.navigate('Profile');
      }
    }
  };

  return (
    <View className="bg-white flex-1">
      <BackButton color="black" targetScreen="Profile" />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 16 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="justify-center items-center mb-6">
          <Heading content="Editar Perfil" />
        </View>

        <View className="my-6 items-center">
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Avatar className="w-28 h-28">
              <AvatarImage source={user.image ? { uri: user.image } : require('@/assets/user-icon.png')} />
            </Avatar>
            <View className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 rounded-full items-center justify-center">
              <Camera color="white" size={15} />
            </View>
          </TouchableOpacity>
        </View>

        <View className="my-6 gap-3">
          <Input
            placeholder="Nome Completo"
            value={user.name}
            onChangeText={(text) => setUser({ ...user, name: text })}
          />

          <Input
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            value={user.email}
            onChangeText={(text) => setUser({ ...user, email: text })}
          />

          <DateInput
            placeholder="Data de Nascimento"
            date={user.birthday}
            onChangeDate={(date) => setUser({ ...user, birthday: date ?? '' })}
          />

          <GenderSelect
            value={user.gender}
            onChangeOption={(gender) => setUser({ ...user, gender: gender ?? 0 })}
          />
        </View>

        <View className="items-center gap-3">
          {error && (
            <Text className="text-sm text-error">
              Preencha os campos antes de salvar
            </Text>
          )}

          <Button className="w-full" label="Salvar Alterações" onPress={handleSave} />
        </View>
      </ScrollView>

      <ImagePickerModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onImagePicked={handleImagePicked}
      />
    </View>
  );
}

export default ProfileEditScreen;
