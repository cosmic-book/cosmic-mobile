import { MainStackParamList } from '@/@types/navigation';
import { User } from '@/@types'
import { Button, DropDown, DropDownContent, DropDownItem, DropDownTrigger, Heading, Input, BackButton, Avatar, AvatarImage, ImagePickerModal } from '@/components';
import { useAuth } from '@/contexts/AuthContext';
import { dateApplyMask } from '@/utils/masks';
import { validateFields } from '@/utils/ValidateFields';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';
import { Camera } from 'lucide-react-native';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import UserService from '@/services/UserService';

type ProfileEditProps = NativeStackScreenProps<MainStackParamList, 'ProfileEdit'>;

function ProfileEditScreen({ navigation }: ProfileEditProps) {
    const { user } = useAuth();

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const [gender, setGender] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const [profile, setProfile] = useState<number | undefined>(undefined);

    const [nameError, setNameError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [birthdayError, setBirthdayError] = useState(false);
    const [genderError, setGenderError] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const applyMask = (input: string) => {
        const value = input.replace(/\D/g, '')

        const date = dateApplyMask(value)
        return setBirthday(date)
    }

    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                setName(user.name);
                setUsername(user.username);
                setEmail(user.email);

                const formattedBirthday = new Date(user.birthday).toLocaleDateString('pt-BR');
                setBirthday(formattedBirthday);

                const genderMapping: { [key: string]: string } = {
                    'F': 'Feminino',
                    'M': 'Masculino',
                    'Outro': 'Outro'
                };

                setGender(genderMapping[user.gender] || 'Outro');
                setImage(user.image || '');
                setProfile(user.profile);
            }
        };
        fetchUserData();
    }, []);

    const handleImagePicked = (uri: string | null) => {
        setImage(uri);
    };

    const validate = () => {
        return validateFields([
            { value: name, setter: setNameError },
            { value: username, setter: setUsernameError },
            { value: email, setter: setEmailError },
            { value: birthday, setter: setBirthdayError },
            { value: gender, setter: setGenderError },
        ]);
    };

    const handleSave = async () => {
        if (validate() && user && user.id !== undefined) {
            const formatBirthday = (date: string) => {
                const [day, month, year] = date.split('/');
                return `${year}-${month}-${day}`;
            };

            const updatedUser: User = {
                ...user,
                name,
                username,
                email,
                image: image,
                birthday: formatBirthday(birthday),
                gender: gender.charAt(0),
            };

            const result = await UserService.update(user.id, updatedUser);

            if (result) {
                navigation.navigate('Profile');
            }
        }
    };

    return (
        <View className="bg-white flex-1">
            <BackButton targetScreen="Profile" />
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
                                placeholder="Gênero"
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
                </View>
                <Button label="Salvar Alterações" onPress={handleSave} />
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