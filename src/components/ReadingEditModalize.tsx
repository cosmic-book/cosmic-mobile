import { Book, Reading } from '@/@types';
import { useAuth } from '@/contexts/AuthContext';
import { GlobalContext } from '@/contexts/GlobalContext';
import { ReadingStatus } from '@/enums';
import { ReadingService } from '@/services';
import { Pencil, Plus } from 'lucide-react-native';
import moment from 'moment';
import { MutableRefObject, useContext, useEffect, useRef, useState } from 'react';
import { Dimensions, Platform, Text, TouchableOpacity, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import Toast from 'react-native-toast-message';
import { Button } from './Button';
import { DateInput, ReadingCategorySelector, ReadingStatusSelect, ReadingTypeSelector } from './fields';
import { ReviewModalize } from './ReviewModalize';

type Props = {
  book: Partial<Book>;
  modalRef: MutableRefObject<Modalize | null>
};

export function ReadingEditModalize({ book, modalRef }: Props) {
  const windowHeight = Dimensions.get('window').height * 0.67;

  const { actualUser } = useAuth();
  const { getUserReadingsInfo, actualReading, loadReading } = useContext(GlobalContext)

  const [isToRead, setIsToRead] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const [isFavorite, setIsFavorite] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const [review, setReview] = useState<string | null>(null);
  const [reading, setReading] = useState<Reading>({} as Reading);
  const [isReviewModalOpen, setReviewModalOpen] = useState(false);

  const reviewModalRef = useRef<Modalize>(null);

  const handleOpenReview = () => {
    setReviewModalOpen(true);
    reviewModalRef.current?.open();
  };

  const handleReviewSubmit = (newReview: string, newRating: number) => {
    setReview(newReview);
    setRating(newRating);
  };

  const handleOpen = async () => {
    if (actualReading.id_book === book.id) {
      setReading(actualReading);
      setIsFavorite(actualReading.favorite !== null);
      setRating(actualReading.rating ?? null);
      setReview(actualReading.review ?? null);

      if (actualReading.id) {
        await loadReading(actualReading.id);
      }
    } else {
      setReading({} as Reading);
      setIsFavorite(false);
      setRating(null);
      setReview(null);
    }
  };

  const handleReset = async () => {
    if (actualReading) {
      setReading(actualReading);
      setIsFavorite(actualReading.favorite !== null);
      setRating(actualReading.rating ?? null);
      setReview(actualReading.review ?? null);

      if (actualReading.id) {
        await loadReading(actualReading.id);
      }
    } else {
      setReading({
        ...reading,
        type: 0,
        status: 0,
        start_date: null,
        finish_date: null,
        category: 0,
      });
      setIsFavorite(false);
      setRating(null);
      setReview(null);
    }
  };

  const handleSubmit = async () => {
    if (actualUser) {
      const payload: Reading = {
        id: reading?.id,
        id_user: actualUser.id,
        id_book: book.id ?? actualReading.id_book,
        status: reading.status ?? null,
        type: reading.type ?? 0,
        category: reading.category ?? 0,
        read_pages: reading.read_pages ?? 0,
        start_date: reading.start_date ? moment(reading.start_date).format('YYYY-MM-DD') : null,
        finish_date: reading.finish_date ? moment(reading.finish_date).format('YYYY-MM-DD') : null,
        favorite: isFavorite ? 1 : null,
        rating: rating ?? null,
        review: review ?? null,
      };

      let response: Reading | undefined;

      if (payload.id) {
        response = await ReadingService.update(actualReading.id, payload);
      } else {
        response = await ReadingService.create(payload);
      }

      if (response) {
        Toast.show({ type: 'success', text1: `Leitura ${actualReading.id ? 'editada' : 'adicionada'}`, text2: 'Acesse a estante para visualizar seus livros' })

        await getUserReadingsInfo(actualUser.id)

        modalRef.current?.close();
      }
    }
  };

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

  const headerComponent = (
    <View className="flex-row items-center w-full border_bottom p-5">
      <View className="flex-col">
        <Text className="text-gray-600 text-base font-medium">
          {reading.book ? reading.book.title : book ? book.title : ''}
        </Text>

        <Text className="text-gray-500 text-sm">
          {reading.book ? reading.book.author : book ? book.author : ''}
        </Text>
      </View>
    </View>
  );

  const footerComponent = (
    <View className="items-center mx-5 my-3">
      <Button label={`${reading.id ? 'Editar' : 'Adicionar'} na Estante`} onPress={handleSubmit} />
    </View>
  );

  return (
    <>
      <Modalize
        ref={modalRef}
        onOpen={handleOpen}
        onClose={handleReset}
        modalHeight={windowHeight}
        HeaderComponent={headerComponent}
        FooterComponent={footerComponent}
        keyboardAvoidingBehavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        avoidKeyboardLikeIOS={true}
        scrollViewProps={{ scrollEnabled: !isReviewModalOpen }}
        rootStyle={{ zIndex: 1 }}
      >
        <View className="p-5 gap-5">
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
            onPress={handleOpenReview}
            className="flex-row items-center gap-2"
          >
            {review ? (
              <Pencil size={22} color={isFinished ? '#6b7280' : '#d1d5db'} />
            ) : (
              <Plus size={24} color={isFinished ? '#6b7280' : '#d1d5db'} />
            )}
            <Text
              className={`${isFinished ? 'text-gray-500' : 'text-gray-300'} text-lg`}
            >
              {review ? 'Editar resenha' : 'Escrever uma resenha'}
            </Text>
          </TouchableOpacity>
        </View>
      </Modalize>

      <ReviewModalize
        modalRef={reviewModalRef}
        onSubmit={(newReview, newRating, newFavorite) => {
          handleReviewSubmit(newReview, newRating);
          setIsFavorite(newFavorite === 1);
          setReviewModalOpen(false);
        }}
        initialReview={review ?? ''}
        initialRating={rating ?? 0}
        initialFavorite={isFavorite ? 1 : null}
      />
    </>
  );
}
