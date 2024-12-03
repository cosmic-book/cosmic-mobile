import { History, Reading } from '@/@types';
import { GlobalContext } from '@/contexts/GlobalContext';
import { HistoryService } from '@/services';
import { validateFields } from '@/utils/ValidateFields';
import { BookOpen } from 'lucide-react-native';
import moment from 'moment';
import { MutableRefObject, useContext, useEffect, useState } from 'react';
import { Dimensions, Platform, Text, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import Toast from 'react-native-toast-message';
import { Button } from '../Button';
import { Input, InputArea } from '../fields';

type Props = {
  actualHistory: History;
  modalRef: MutableRefObject<Modalize | null>;
  afterSubmit: () => void;
};

export function HistoryEditModal({ actualHistory, modalRef, afterSubmit }: Props) {
  const windowHeight = Dimensions.get('window').height * 0.52;

  const { loadUserInfos, actualReading, loadReading } = useContext(GlobalContext);

  const [history, setHistory] = useState<History>(actualHistory || {} as History);
  const [error, setError] = useState(false);

  const validate = () => {
    return validateFields([
      {
        value: history.read_pages,
        setter: setError,
      },
    ]);
  };

  const handleSubmit = async () => {
    if (validate()) {
      const payload: History = {
        ...history,
        id_user: actualReading.id_user,
        id_reading: actualReading.id,
        date: moment(history.id ? history.date : new Date()).format('YYYY-MM-DDTHH:mm:ss'),
      };

      let response: History | undefined;

      if (payload.id) {
        response = await HistoryService.update(payload.id, payload);
      } else {
        response = await HistoryService.create(payload);
      }

      if (response) {
        Toast.show({
          type: 'success',
          text1: 'Sucesso',
          text2: `Seu registro foi ${payload.id ? 'atualizado' : 'adicionado'}`,
        });

        await handleReload();

        afterSubmit();

        modalRef.current?.close();
      }
    }
  };

  const handleReload = async () => {
    await loadUserInfos(actualReading.id_user);

    if (actualReading.id) {
      await loadReading(actualReading.id);
    }
  };

  const handleOpen = () => {
    setHistory(actualHistory || {} as History);
  };

  const handleClose = () => {
    setHistory({} as History);
    setError(false);
  };

  useEffect(() => {
    if (modalRef.current) {
      handleOpen();
    }
  }, [actualHistory]);

  const headerComponent = (
    <View>
      <View className="flex-col items-start border_bottom  py-4 px-5">
        <View className="flex-row items-center gap-2">
          <BookOpen color="#1460cd" size={20} />
          <Text className="text-primary text-lg font-medium mb-1">Registro de Leitura</Text>
        </View>
        <Text className="text-gray-700 text-sm">Como está sendo sua experiência?</Text>
      </View>
    </View>
  );

  const footerComponent = (
    <View className="mx-5 my-3">
      <Button label={history.id ? 'Editar' : 'Adicionar'} onPress={handleSubmit} />
    </View>
  );

  return (
    <Modalize
      ref={modalRef}
      modalHeight={windowHeight}
      onClose={handleClose}
      keyboardAvoidingBehavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      avoidKeyboardLikeIOS={true}
      HeaderComponent={headerComponent}
      FooterComponent={footerComponent}
      scrollViewProps={{ showsVerticalScrollIndicator: false }}
      rootStyle={{ zIndex: 1 }}
    >
      <View className="flex-1 gap-3 px-5 py-3">
        <InputArea
          placeholder="Escreva um comentário (opcional)"
          value={history.comment ?? ''}
          onChangeText={(comment) => setHistory({ ...history, comment })}
        />

        <Input
          placeholder="Páginas lidas *"
          keyboardType="numeric"
          value={history.read_pages?.toString() || ''}
          variant={error ? 'error' : 'default'}
          onChangeText={(value) => setHistory({ ...history, read_pages: Number(value) })}
        />

        {actualReading.book && (
          <Text className="text-sm text-right font-medium mr-3">
            Página atual: {!actualHistory.id ? actualReading.read_pages : actualHistory.read_pages}/{actualReading.book.pages}
          </Text>
        )}
      </View>
    </Modalize>
  );
}
