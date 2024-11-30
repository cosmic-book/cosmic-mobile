import { History } from '@/@types';
import { GlobalContext } from '@/contexts/GlobalContext';
import { HistoryService } from '@/services';
import { BookOpen } from 'lucide-react-native';
import moment from 'moment';
import { MutableRefObject, useContext, useState } from 'react';
import { Dimensions, Platform, Text, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { Button } from './Button';
import { Input } from './fields';
import { useAuth } from '@/contexts/AuthContext';

type Props = {
  modalRef: MutableRefObject<Modalize | null>;
  afterSubmit: () => void;
};

export function HistoryEditModalize({ modalRef, afterSubmit }: Props) {
  const windowHeight = Dimensions.get('window').height * 0.6;

  const { actualUser } = useAuth();
  const { getUserReadingsInfo, actualReading, loadReading } = useContext(GlobalContext);
  const [history, setHistory] = useState<History>({} as History)

  const handleSubmit = async () => {
    const payload: History = {
      ...history,
      id_reading: actualReading.id,
      date: moment(new Date()).format('YYYY-MM-DDTHH:mm:ss')
    }

    const result = await HistoryService.create(payload)

    if (result) {
      modalRef.current?.close()
      afterSubmit()
    }
  }

  const handleOpen = async () => {
    await loadReading(actualReading.id)
  }

  const handleClose = async () => {
    setHistory({} as History)

    if (actualUser) {
      await loadReading(actualReading.id)
      await getUserReadingsInfo(actualUser.id)
    }
  }

  const headerComponent = (
    <View>
      <View className="flex-col items-start border_bottom py-4 px-5">
        <View className='flex-row items-center gap-2'>
          <BookOpen color={'#1460cd'} size={20} />
          <Text className="text-primary text-lg font-medium mb-1">Registro de Leitura</Text>
        </View>
        <Text className="text-gray-700 text-sm">Como está sendo sua experiência?</Text>
      </View>
    </View>
  );

  const footerComponent = (
    <View className='mx-5 my-3'>
      <Button label='Adicionar' onPress={handleSubmit} />
    </View>
  )

  return (
    <Modalize
      ref={modalRef}
      modalHeight={windowHeight}
      onOpen={handleOpen}
      onClose={handleClose}
      keyboardAvoidingBehavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      avoidKeyboardLikeIOS={true}
      HeaderComponent={headerComponent}
      FooterComponent={footerComponent}
      scrollViewProps={{ showsVerticalScrollIndicator: false }}
      rootStyle={{ zIndex: 1 }}
    >
      <View className='flex-1 gap-3 px-5 py-3'>
        <Input
          placeholder='Escreva um comentário (opcional)'
          value={history.comment}
          onChangeText={(comment) => setHistory({ ...history, comment })}
        />

        <Input
          placeholder='Páginas lidas *'
          keyboardType='numeric'
          value={history.read_pages?.toString()}
          onChangeText={(value) => setHistory({ ...history, read_pages: Number(value) })}
        />

        {actualReading.book && (
          <Text className="text-sm text-right font-medium mr-3">
            Página atual: {actualReading.read_pages ?? 0}/{actualReading.book.pages}
          </Text>
        )}
      </View>
    </Modalize>
  );
}
