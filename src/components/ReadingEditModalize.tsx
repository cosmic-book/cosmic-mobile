import { Book, Reading } from '@/@types';
import { useAuth } from '@/contexts/AuthContext';
import { ReadingStatus } from '@/enums';
import { ReadingService } from '@/services';
import { Plus, X } from 'lucide-react-native';
import moment from 'moment';
import { MutableRefObject, useEffect, useState } from 'react';
import { Dimensions, Platform, Text, TouchableOpacity, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import Toast from 'react-native-toast-message';
import { Button } from './Button';
import { DateInput, ReadingCategorySelector, ReadingStatusSelect, ReadingTypeSelector } from './fields';

type Props = {
  book: Book;
  actualReading: Reading;
  modalRef: MutableRefObject<Modalize | null>
  onSubmit: (reading: Reading) => void;
};

export function ReadingEditModalize({ book, actualReading, modalRef, onSubmit }: Props) {
  const windowHeight = Dimensions.get('window').height * 0.68;

  const { actualUser } = useAuth();

  const [isToRead, setIsToRead] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [reading, setReading] = useState<Reading>({} as Reading);

  useEffect(() => {
    const toReadStatus = Object.values(ReadingStatus).indexOf(ReadingStatus.TO_READ);
    const finishedStatus = Object.values(ReadingStatus).indexOf(ReadingStatus.FINISHED);
    const abandonedStatus = Object.values(ReadingStatus).indexOf(ReadingStatus.ABANDONED);

    const isToRead = reading.status === toReadStatus;
    const isFinished = reading.status === finishedStatus || reading.status === abandonedStatus;

    setIsToRead(isToRead);
    setIsFinished(isFinished);

    if (!isFinished) {
      setReading({
        ...reading,
        finish_date: null,
      });
    }

    if (!reading.status || isToRead) {
      setReading({
        ...reading,
        start_date: null,
        finish_date: null,
      });
    }
  }, [reading.status]);

  const handleOpen = () => {
    if (actualReading) {
      setReading(actualReading);
    } else {
      setReading({} as Reading);
    }
  }

  const handleReset = () => {
    if (actualReading) {
      setReading(actualReading);
    } else {
      setReading({
        ...reading,
        type: 0,
        status: 0,
        start_date: null,
        finish_date: null,
        category: 0,
      });
    }
  };

  const handleSubmit = async () => {
    if (actualUser) {
      const payload: Reading = {
        id: actualReading?.id,
        id_user: actualUser.id,
        id_book: book.id,
        status: reading.status ?? 0,
        type: reading.type,
        category: reading.category,
        start_date: reading.start_date ? moment(reading.start_date).format('YYYY-MM-DD') : null,
        finish_date: reading.finish_date ? moment(reading.finish_date).format('YYYY-MM-DD') : null,
      };

      let response: Reading | undefined;

      if (actualReading.id) {
        response = await ReadingService.update(actualReading.id, payload);
      } else {
        response = await ReadingService.create(payload);
      }

      if (response) {
        Toast.show({ type: 'success', text1: `Leitura ${actualReading.id ? 'editada' : 'adicionada'}`, text2: 'Acesse a estante para visualizar seus livros' })

        onSubmit(response);
      }
    }
  };

  return (
    <Modalize
      ref={modalRef}
      onOpened={handleOpen}
      onClose={handleReset}
      modalHeight={windowHeight}
      keyboardAvoidingBehavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      avoidKeyboardLikeIOS={true}
      disableScrollIfPossible={true}
      scrollViewProps={{ scrollEnabled: false }}
      rootStyle={{ zIndex: 1 }}
    >
      <View className="p-6">
        <View className="flex-row justify-between items-center w-full border_bottom pb-3">
          <View className="flex-col">
            <Text className="text-gray-600 text-base font-medium">{book.title}</Text>
            <Text className="text-gray-500 text-sm">{book.author}</Text>
          </View>

          <TouchableOpacity onPress={() => modalRef.current?.close()}>
            <X size={24} color="gray" />
          </TouchableOpacity>
        </View>

        <View className="gap-5 py-6">
          <View className="flex items-center">
            <ReadingTypeSelector
              value={reading.type ?? 0}
              onSelect={(type) => setReading({ ...reading, type })}
            />
          </View>

          <ReadingStatusSelect
            value={reading.status ?? null}
            onChangeOption={(status) => setReading({ ...reading, status })}
          />

          <DateInput
            placeholder="Data de Início"
            date={reading.start_date ?? null}
            onChangeDate={(value) => setReading({ ...reading, start_date: value })}
            disabled={!reading.status || isToRead}
          />

          <DateInput
            placeholder="Data de Conclusão"
            date={reading.finish_date ?? null}
            onChangeDate={(value) => setReading({ ...reading, finish_date: value })}
            disabled={!isFinished}
          />

          <ReadingCategorySelector
            value={reading.category ?? 0}
            onSelect={(category) => setReading({ ...reading, category })}
          />

          <TouchableOpacity
            disabled={!isFinished}
            className="flex-row items-center gap-2"
          >
            <Plus size={24} color={isFinished ? '#6b7280' : '#d1d5db'} />
            <Text
              className={`${isFinished ? 'text-gray-500' : 'text-gray-300'
                } text-lg`}
            >
              Escrever uma resenha
            </Text>
          </TouchableOpacity>

          <View className="items-center mt-4">
            <Button label={`${reading.id ? 'Editar' : 'Adicionar'} na Estante`} onPress={handleSubmit} />
          </View>
        </View>
      </View>
    </Modalize>
  );
}
