import { MutableRefObject, useEffect, useState } from 'react';
import { Dimensions, Platform, Text, TextInput, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import Toast from 'react-native-toast-message';
import moment from 'moment';
import { Button } from './Button';
import { Rating } from './Rating';
import { DateInput } from './fields';
import { Book, Reading } from '@/@types';
import { ReadingService } from '@/services';
import { ReadPagesInput } from './ReadPagesInput';

type Props = {
    book: Book;
    actualReading: Reading;
    modalRef: MutableRefObject<Modalize | null>;
    onSubmit: (reading: Reading) => void;
};

export function ReadingReviewModal({ book, actualReading, modalRef, onSubmit }: Props) {
    const windowHeight = Dimensions.get('window').height * 0.68;

    const [reading, setReading] = useState<Reading>({} as Reading);
    const [rating, setRating] = useState<number>(0);
    const [review, setReview] = useState<string>('');
    const [finishDate, setFinishDate] = useState<string | null>(null);
    const [readPages, setReadPages] = useState<number>(0);
    const [isInvalidPages, setIsInvalidPages] = useState(false);

    useEffect(() => {
        if (actualReading) {
            setReading(actualReading);
            setRating(actualReading.rating ?? 0);
            setReview(actualReading.review ?? '');
            setFinishDate(actualReading.finish_date ?? null);
            setReadPages(actualReading?.read_pages ?? 0);
        } else {
            setReading({} as Reading);
            setRating(0);
            setReview('');
            setFinishDate(null);
        }
    }, [actualReading]);

    const handleSave = async () => {
        if (isInvalidPages) {
            Toast.show({
                type: 'error',
                text1: 'Erro ao salvar a leitura',
                text2: 'O número de páginas lidas não pode exceder o total de páginas.',
            });
            return;
        }

        const payload: Reading = {
            id: actualReading?.id,
            id_user: actualReading.id_user,
            id_book: book.id,
            status: reading.status ?? 0,
            type: reading.type,
            category: reading.category,
            start_date: reading.start_date ? moment(reading.start_date).format('YYYY-MM-DD') : null,
            finish_date: finishDate ? moment(finishDate).format('YYYY-MM-DD') : null,
            review: finishDate ? review : null,
            rating: finishDate ? rating : null,
            read_pages: readPages,
        };

        try {
            let response: Reading | undefined;

            if (actualReading.id) {
                response = await ReadingService.update(actualReading.id, payload);
            } else {
                response = await ReadingService.create(payload);
            }

            if (response) {
                Toast.show({
                    type: 'success',
                    text1: `Leitura ${actualReading.id ? 'editada' : 'adicionada'}`,
                    text2: 'Acesse a estante para visualizar seus livros',
                });

                onSubmit(response);
                modalRef.current?.close();
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Erro ao salvar a leitura',
                text2: 'Tente novamente mais tarde',
            });
            console.error('Erro ao salvar a leitura:', error);
        }
    };

    return (
        <Modalize
            ref={modalRef}
            modalHeight={windowHeight}
            keyboardAvoidingBehavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            avoidKeyboardLikeIOS={true}
            disableScrollIfPossible={true}
            rootStyle={{ zIndex: 1 }}
        >
            <View className="p-6">
                <View className="flex-row justify-between items-center w-full border_bottom pb-3 mb-4">
                    <View className="flex-col">
                        <Text className="text-gray-600 text-base font-medium">{book.title}</Text>
                        <Text className="text-gray-500 text-sm">{book.author}</Text>
                    </View>
                </View>

                <ReadPagesInput
                    totalPages={book.pages}
                    readPages={readPages}
                    onChange={(pages) => {
                        setReadPages(pages);
                        setIsInvalidPages(pages > book.pages);
                    }}
                />

                <View className="mt-4">
                    <Text className="text-sm text-gray-500 mb-1">Data de conclusão:</Text>
                    <DateInput
                        placeholder="Data de conclusão"
                        date={finishDate}
                        onChangeDate={setFinishDate}
                    />
                </View>

                {finishDate && (
                    <>
                        <View className="mt-6">
                            <TextInput
                                style={{
                                    height: 100,
                                    borderWidth: 1,
                                    borderColor: '#ccc',
                                    borderRadius: 8,
                                    padding: 8,
                                    marginTop: 4,
                                    textAlignVertical: 'top',
                                    backgroundColor: '#fff',
                                }}
                                multiline
                                placeholder="Escreva sua resenha aqui..."
                                value={review}
                                onChangeText={setReview}
                            />
                        </View>

                        <View className="mt-6">
                            <Text className="text-sm text-gray-500">Nota:</Text>
                            <Rating rating={rating} onRatingChange={setRating} />
                        </View>
                    </>
                )}

                <View className="mt-4">
                    <Button label="Salvar" onPress={handleSave} />
                </View>
            </View>
        </Modalize>
    );
}
