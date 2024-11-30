import { MutableRefObject, useState, useEffect } from 'react';
import { Dimensions, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { Button } from './Button';
import { Rating } from './Rating';
import Toast from 'react-native-toast-message';
import { Bookmark } from 'lucide-react-native';

type Props = {
    modalRef: MutableRefObject<Modalize | null>;
    onSubmit: (review: string, rating: number, favorite: number | null) => void;
    initialReview?: string;
    initialRating?: number;
    initialFavorite?: number | null;
};

export function ReviewModal({
    modalRef,
    onSubmit,
    initialReview = '',
    initialRating = 0,
    initialFavorite = null,
}: Props) {
    const [review, setReview] = useState(initialReview);
    const [rating, setRating] = useState<number | null>(initialRating);
    const [favorite, setFavorite] = useState<number | null>(initialFavorite);

    const windowHeight = Dimensions.get('window').height * 0.6;

    const handleSubmit = () => {
        if (!review.trim() || rating === null) {
            Toast.show({ type: 'error', text1: 'Erro', text2: 'Por favor, preencha a resenha e atribua uma nota.' });
            return;
        }

        onSubmit(review, rating, favorite);
        modalRef.current?.close();
    };

    const toggleFavorite = () => {
        setFavorite((prev) => (prev === null ? 1 : null));
    };

    useEffect(() => {
        setReview(initialReview);
        setRating(initialRating);
        setFavorite(initialFavorite);
    }, [initialReview, initialRating, initialFavorite]);

    const headerComponent = (
        <View className="flex-row items-center justify-between border_bottom py-4 px-5">
            <View>
                <Text className="text-primary text-lg font-medium">Adicionar Resenha</Text>
                <Text className="text-gray-700 text-sm">Compartilhe sua experiência com este livro</Text>
            </View>
            <TouchableOpacity onPress={toggleFavorite}>
                <Bookmark
                    size={24}
                    color={favorite === 1 ? '#facc15' : '#9ca3af'}
                    fill={favorite === 1 ? '#facc15' : 'none'}
                    strokeWidth={2}
                />
            </TouchableOpacity>
        </View>
    );

    const footerComponent = (
        <View className="mx-5 my-3">
            <Button label="Salvar Resenha" onPress={handleSubmit} />
        </View>
    );

    return (
        <Modalize
            ref={modalRef}
            modalHeight={windowHeight}
            keyboardAvoidingBehavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            avoidKeyboardLikeIOS={true}
            HeaderComponent={headerComponent}
            FooterComponent={footerComponent}
            scrollViewProps={{ showsVerticalScrollIndicator: false }}
            overlayStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
        >
            <View className="p-5">
                <TextInput
                    style={{
                        height: 150,
                        borderWidth: 1,
                        borderColor: '#d1d5db',
                        borderRadius: 8,
                        padding: 10,
                        textAlignVertical: 'top',
                    }}
                    placeholder="Digite sua resenha aqui..."
                    multiline
                    value={review}
                    onChangeText={setReview}
                />
            </View>

            <View className="ml-2 p-5">
                <Text className="text-gray-500 text-base font-medium">Nota</Text>
                <Rating rating={rating ?? 0} onRatingChange={setRating} />
            </View>
        </Modalize>
    );
}
