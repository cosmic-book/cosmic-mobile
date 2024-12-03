import { MainStackParamList } from '@/@types/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { GlobalContext } from '@/contexts/GlobalContext';
import { ReadingService } from '@/services';
import { NavigationProp, useIsFocused } from '@react-navigation/native';
import { Edit, History, Info, Trash } from 'lucide-react-native';
import { MutableRefObject, useContext, useEffect, useRef } from 'react';
import { Dimensions, Platform, Text, TouchableOpacity, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import Toast from 'react-native-toast-message';
import { ReadingEditModal } from './ReadingEditModal';

type Props = {
  modalRef: MutableRefObject<Modalize | null>;
  navigation: NavigationProp<MainStackParamList>;
};

export function ReadingMenuModal({ modalRef, navigation }: Props) {
  const { actualUser } = useAuth()
  const { loadUserInfos, actualReading, loadReading } = useContext(GlobalContext)

  const windowHeight = Dimensions.get('window').height * 0.3;

  const editModalRef = useRef<Modalize>(null)

  const isFocused = useIsFocused()

  const handleRouteInfo = () => {
    const book = actualReading.book

    if (book) {
      navigation.navigate('BookDetails', { book })
    }
  }

  const handleOpenHistory = () => {
    modalRef.current?.close();

    navigation.navigate('History')
  }

  const handleOpenEdit = () => {
    modalRef.current?.close();
    editModalRef.current?.open();
  }

  const handleRemove = async () => {
    if (actualUser) {
      await ReadingService.delete(actualReading.id);

      await loadReading(actualReading.id);
      await loadUserInfos(actualUser.id);

      Toast.show({ type: 'success', text1: `Livro removido`, text2: 'Seu livro foi removida da estante' })

      modalRef.current?.close();
    }
  }

  useEffect(() => {
    editModalRef.current?.close()
  }, [isFocused]);

  const headerComponent = (
    <>
      {actualReading.book && (
        <View className="flex-row justify-between items-center w-full border_bottom py-4 px-5">
          <View className="flex-col">
            <Text className="text-gray-600 text-base font-medium">{actualReading.book.title}</Text>
            <Text className="text-gray-500 text-sm">{actualReading.book.author}</Text>
          </View>

          <TouchableOpacity onPress={handleRouteInfo}>
            <Info size={22} color='#6b7280' />
          </TouchableOpacity>
        </View>
      )}
    </>
  );

  return (
    <>
      <Modalize
        ref={modalRef}
        modalHeight={windowHeight}
        keyboardAvoidingBehavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        avoidKeyboardLikeIOS={true}
        HeaderComponent={headerComponent}
        scrollViewProps={{ showsVerticalScrollIndicator: false }}
        rootStyle={{ zIndex: 1 }}
      >
        <View className="p-4">
          <View className='w-full gap-3 self-center items-center'>
            <TouchableOpacity onPress={handleOpenHistory} className='w-full flex-row items-center gap-3 bg-blue-50 py-2 pl-3 rounded-lg'>
              <History size={22} color='#1460cd' />
              <Text className='text-lg font-medium text-blue-600'>Histórico de Leitura</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleOpenEdit} className='w-full flex-row items-center gap-3 bg-blue-50 py-2 pl-3 rounded-lg'>
              <Edit size={22} color='#1460cd' />
              <Text className='text-lg font-medium text-blue-600'>Editar Livro na Estante</Text>
            </TouchableOpacity>

            <View className='w-full border-t border-gray-200'>
              <TouchableOpacity onPress={handleRemove} className='w-full flex-row items-center gap-3 bg-red-100 mt-3 py-2 pl-3 rounded-lg'>
                <Trash size={22} color='#dc2626' />
                <Text className='text-lg font-medium text-delete'>Remover da Estante</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modalize>

      {actualReading.book && (
        <ReadingEditModal book={actualReading.book} modalRef={editModalRef} />
      )}
    </>
  );
}
