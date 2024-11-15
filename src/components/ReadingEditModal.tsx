import { Book, Reading } from '@/@types';
import { useAuth } from '@/contexts/AuthContext';
import { ReadingStatus } from '@/enums';
import { Plus, X } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Dimensions, Modal, Text, TouchableOpacity, View } from 'react-native';
import { Button } from './Button';
import { DateInput, ReadingCategorySelector, ReadingStatusSelect, ReadingTypeSelector } from './fields';
import { ReadingService } from '@/services';
import Toast from 'react-native-toast-message';
import moment from 'moment';

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  book: Book;
};

export function ReadingEditModal({ isOpen, handleClose, book }: Props) {
  const windowHeight = Dimensions.get('window').height;

  const { actualUser } = useAuth();

  const [type, setType] = useState<number>(0);
  const [status, setStatus] = useState<number | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [finishDate, setFinishDate] = useState<Date | null>(null);
  const [category, setCategory] = useState<number>(0);

  const [isToRead, setIsToRead] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const toReadStatus = Object.values(ReadingStatus).indexOf(ReadingStatus.TO_READ)
    const finishedStatus = Object.values(ReadingStatus).indexOf(ReadingStatus.FINISHED)

    setIsToRead(status === toReadStatus);
    setIsFinished(status === finishedStatus);

    if (!status || status === toReadStatus) {
      setStartDate(null)
      setFinishDate(null)
    }

    if (status !== finishedStatus) {
      setFinishDate(null)
    }

  }, [status]);

  const handleCloseClear = () => {
    handleClose()

    setType(0)
    setStatus(null)
    setStartDate(null)
    setFinishDate(null)
    setCategory(0)

    setIsToRead(false)
    setIsFinished(false)
  }

  const handleSubmit = async () => {
    if (actualUser) {
      const payload: Partial<Reading> = {
        id_user: actualUser.id,
        id_book: book.id,
        status: status ?? 0,
        type: type,
        category: category,
        start_date: startDate ? moment(startDate).format('YYYY-MM-DD') : null,
        finish_date: finishDate ? moment(finishDate).format('YYYY-MM-DD') : null,
      };

      const response = await ReadingService.create(payload);

      if (response) {
        handleCloseClear();

        Toast.show({ type: 'success', text1: 'Leitura adicionada', text2: 'Acesse a estante para visualizar seus livros' })
      }
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={isOpen} onRequestClose={handleCloseClear}>
      <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={handleCloseClear} />

      <View
        className="absolute left-0 right-0 justify-start bg-white border_drawer rounded-t-3xl p-6"
        style={{ height: windowHeight * 0.7, bottom: 0 }}>

        <View className="flex-row justify-between items-center w-full border_bottom pb-3">
          <View className="flex-col">
            <Text className='text-gray-600 text-base font-medium'>{book.title}</Text>
            <Text className='text-gray-500 text-sm'>{book.author}</Text>
          </View>

          <TouchableOpacity onPress={handleCloseClear}>
            <X size={24} color="gray" />
          </TouchableOpacity>
        </View>

        <View className='gap-5 py-6'>
          <View className='flex items-center'>
            <ReadingTypeSelector
              value={type}
              onSelect={setType}
            />
          </View>

          <ReadingStatusSelect
            value={status}
            onChangeOption={setStatus}
          />

          <DateInput
            placeholder='Data de Início'
            date={startDate}
            onChangeDate={setStartDate}
            disabled={!status || isToRead}
          />

          <DateInput
            placeholder='Data de Conclusão'
            date={finishDate}
            onChangeDate={setFinishDate}
            disabled={!isFinished}
          />

          <ReadingCategorySelector
            value={category}
            onSelect={setCategory}
          />

          <TouchableOpacity
            disabled={!isFinished}
            className='flex-row items-center gap-2'
          >
            <Plus size={24} color={isFinished ? '#6b7280' : '#d1d5db'} />
            <Text className={`${isFinished ? 'text-gray-500' : 'text-gray-300'} text-lg`}>
              Escrever uma resenha
            </Text>
          </TouchableOpacity>

          <View className='items-center mt-4'>
            <Button label='Adicionar na Estante' onPress={handleSubmit} />
          </View>
        </View>
      </View>
    </Modal>
  );
}
