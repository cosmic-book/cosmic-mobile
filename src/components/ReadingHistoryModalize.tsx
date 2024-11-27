import { Reading } from '@/@types';
import { Calendar, History, Pencil, Trash } from 'lucide-react-native';
import { MutableRefObject } from 'react';
import { Dimensions, FlatList, Platform, Text, TouchableOpacity, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { Button } from './Button';
import { Progress } from './Progress';

type Props = {
  actualReading: Reading;
  modalRef: MutableRefObject<Modalize | null>;
};

export function ReadingHistoryModalize({ actualReading, modalRef }: Props) {
  const windowHeight = Dimensions.get('window').height * 0.6;

  const headerComponent = (
    <View>
      <View className="flex-col items-start border_bottom py-4 px-5">
        <View className='flex-row items-center gap-2'>
          <History color={'#1460cd'} size={20} />
          <Text className="text-primary text-lg font-medium">Histórico de Leitura</Text>

        </View>
        <Text className="text-gray-700 text-sm">Registre sua experiência com essa leitura</Text>
      </View>
    </View>
  );

  const footerComponent = (
    <View className='mx-5 my-3'>
      <Button label='Adicionar Histórico' />
    </View>
  )

  const renderItem = ({ item }: { item: any }) => (
    <View className='flex-col border border-gray-300 px-4 py-3 shadow-lg shadow-black rounded-lg'>
      <View className='flex-row justify-between items-center'>
        <View className='flex-row gap-2 items-center'>
          <Calendar size={18} color='#6b7280' />
          <Text>01/01/2024</Text>
        </View>

        <View className='flex-row gap-4 items-center'>
          <TouchableOpacity>
            <Pencil size={20} color='#6b7280' />
          </TouchableOpacity>

          <TouchableOpacity>
            <Trash size={20} color='#dc2626' />
          </TouchableOpacity>
        </View>
      </View>

      <View className='mt-6'>
        <Progress value={90} className="mb-2" />

        <View className="flex-row justify-between mb-2">
          <Text className="text-sm text-left text-primary font-semibold">
            280/300 pág.
          </Text>
          <Text className="text-sm text-right text-pink font-semibold">
            90%
          </Text>
        </View>
      </View>
    </View>
  )

  return (
    <Modalize
      ref={modalRef}
      modalHeight={windowHeight}
      keyboardAvoidingBehavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      avoidKeyboardLikeIOS={true}
      HeaderComponent={headerComponent}
      FooterComponent={footerComponent}
      scrollViewProps={{ showsVerticalScrollIndicator: false }}
      rootStyle={{ zIndex: 1 }}
    >
      <View className="px-5">
        {actualReading.book && (
          <View className="items-center py-2 px-5">
            <Text className="text-gray-600 text-base font-medium">{actualReading.book.title}</Text>
          </View>
        )}

        <FlatList
          data={[]}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          ListEmptyComponent={
            <View className="py-5 items-center">
              <Text>Não há nada aqui ainda</Text>
            </View>
          }
        />
      </View>
    </Modalize>
  );
}
