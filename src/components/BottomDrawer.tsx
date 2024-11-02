import { Book } from '@/@types';
import { X } from 'lucide-react-native';
import { useState } from 'react';
import { Dimensions, Modal, Text, TouchableOpacity, View } from 'react-native';
import { BookTypeSelector } from './BookTypeSelector';

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  book: Book
}

export function BottomDrawer({ isOpen, handleClose, book }: Props) {
  const windowHeight = Dimensions.get('window').height;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isOpen}
      onRequestClose={handleClose}
    >
      <View
        className="absolute left-0 right-0 justify-start items-center bg-white border_drawer rounded-t-3xl p-6"
        style={{ height: windowHeight * 0.5, bottom: 0 }}>

        <View className="flex-row justify-between items-center w-full border_bottom pb-3">
          <View className="flex-col">
            <Text className='text-gray-600 text-base font-medium'>{book.title}</Text>
            <Text className='text-gray-500 text-sm'>{book.author}</Text>
          </View>

          <TouchableOpacity onPress={handleClose}>
            <X size={24} color="gray" />
          </TouchableOpacity>
        </View>

        <View className='p-6'>
          <BookTypeSelector />
        </View>
      </View>
    </Modal>
  );
}
