import { X } from 'lucide-react-native';
import { Dimensions, Modal, Text, TouchableOpacity, View } from 'react-native';

export function BottomDrawer({ isOpen, handleClose }: any) {
  const windowHeight = Dimensions.get('window').height;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isOpen}
      onRequestClose={handleClose}
    >
      <View
        className="absolute left-0 right-0 justify-start items-center bg-white border border-b-0 border-gray-300 rounded-t-3xl px-6 py-6"
        style={{ height: windowHeight * 0.4, bottom: 0 }}>

        <View className="flex-row justify-between w-full">
          <Text>Adicionar à Estante</Text>
          <TouchableOpacity onPress={handleClose}>
            <X size={24} color="gray" />
          </TouchableOpacity>
        </View>

        <View>
          <Text>Conteúdo</Text>
        </View>

        {/* <View className="py-4">
          <View className="opacity-20 border border-gray-400 my-4" style={{ height: 1 }} />
          <View className="flex-row justify-start items-center" />
        </View> */}

      </View>
    </Modal>
  );
}
