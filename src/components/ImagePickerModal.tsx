import React from 'react';
import { Modal, Text, TouchableOpacity, View, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

interface ImagePickerModalProps {
    visible: boolean;
    onClose: () => void;
    onImagePicked: (uri: string | null) => void;
}

export function ImagePickerModal({ visible, onClose, onImagePicked }: ImagePickerModalProps) {

    const pickImageFromCamera = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permissão Necessária', 'Permissão para acessar câmera necessária!');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            onImagePicked(result.assets[0].uri);
        }
        onClose();
    };

    const pickImageFromGallery = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permissão Necessária', 'Permissão para acessar galeria necessária!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            onImagePicked(result.assets[0].uri);
        }
        onClose();
    };

    const removeImage = () => {
        onImagePicked(null);
        onClose();
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View className="flex-1 justify-center items-center bg-black/50">
                <TouchableOpacity className="bg-white py-5 px-10 rounded-md mb-4 w-4/5 items-center" onPress={pickImageFromCamera}>
                    <Text className="text-lg">Câmera</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-white py-5 px-10 rounded-md mb-4 w-4/5 items-center" onPress={pickImageFromGallery}>
                    <Text className="text-lg">Galeria</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-white py-5 px-10 rounded-md w-4/5 items-center" onPress={removeImage}>
                    <Text className="text-lg">Remover Foto</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
}
