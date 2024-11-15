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

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState<Date | null>(null);
  const [gender, setGender] = useState<number | null>(null);
  const [image, setImage] = useState<string | null>(null);

  const [modalVisible, setModalVisible] = useState(false);

  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      console.log(actualUser);

      if (actualUser) {
        setName(actualUser.name);
        setEmail(actualUser.email);
        setBirthday(new Date(actualUser.birthday));
        setGender(gender !== null ? gender : null);
        setImage(actualUser.image || '');
      }
    };

    fetchUserData();
  }, []);

  const handleImagePicked = (uri: string | null) => {
    setImage(uri);
  };

  const validate = () => {
    return validateFields([
      {
        value: (name && email && birthday && gender),
        setter: setError
      },
    ])
  }

  const handleSave = async () => {
    if (validate() && actualUser && actualUser.id !== undefined) {
      const updatedUser: User = {
        ...actualUser,
        name,
        email,
        image: image,
        birthday: moment(birthday).format('YYYY-MM-DD'),
        gender: gender ?? 0,
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
      <BackButton color='black' targetScreen="Profile" />
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
              <AvatarImage source={image ? { uri: image } : require('../assets/user-icon.png')} />
            </Avatar>
            <View className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 rounded-full items-center justify-center">
              <Camera color="white" size={15} />
            </View>
          </TouchableOpacity>
        </View>

        <View className="my-6 gap-3">
          <Input
            placeholder="Nome Completo"
            value={name}
            onChangeText={setName}
          />
          <Input
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <DateInput
            placeholder="Data de Nascimento"
            date={birthday}
            onChangeDate={setBirthday}
          />
          <GenderSelect
            value={gender}
            onChangeOption={setGender}
          />
        </View>

        <View className='items-center gap-3'>
          {error && (
            <Text className='text-sm text-error'>
              Preencha os campos antes de salvar
            </Text>
          )}

          <Button className='w-full' label="Salvar Alterações" onPress={handleSave} />
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
