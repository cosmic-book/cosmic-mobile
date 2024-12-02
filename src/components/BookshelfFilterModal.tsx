import React, { MutableRefObject, useState } from 'react';
import { Modalize } from 'react-native-modalize';
import { Dimensions, Platform, Text, TouchableOpacity, View } from 'react-native';
import { Star } from 'lucide-react-native';
import { ReadingStatus, ReadingCategory, ReadingType } from '@/enums';

type Props = {
    modalRef: MutableRefObject<Modalize | null>;
    onApplyFilters: (filters: {
        category?: ReadingCategory;
        status?: ReadingStatus;
        type?: ReadingType;
        rating?: number;
    }) => void;
};

export function BookshelfFilterModal({ modalRef, onApplyFilters }: Props) {
    const [selectedCategory, setSelectedCategory] = useState<ReadingCategory | null>(null);
    const [selectedStatus, setSelectedStatus] = useState<ReadingStatus | null>(null);
    const [selectedType, setSelectedType] = useState<ReadingType | null>(null);
    const [selectedRating, setSelectedRating] = useState<number | null>(null);

    const windowHeight = Dimensions.get('window').height * 0.7;

    const handleApplyFilters = () => {
        onApplyFilters({
            category: selectedCategory ?? undefined,
            status: selectedStatus ?? undefined,
            type: selectedType ?? undefined,
            rating: selectedRating ?? undefined,
        });
        modalRef.current?.close();
    };

    const renderFilterOptions = <T extends string | number>(
        options: T[],
        selected: T | null,
        onSelect: (value: T | null) => void
    ) => {
        return (
            <View className="flex-row flex-wrap gap-2 mb-4">
                {options.map((option) => (
                    <TouchableOpacity
                        key={option}
                        onPress={() => onSelect(option === selected ? null : option)}
                        className={`px-4 py-2 rounded-lg ${selected === option ? 'bg-blue-500' : 'bg-gray-200'
                            }`}
                    >
                        <Text className={`${selected === option ? 'text-white' : 'text-gray-600'}`}>
                            {option}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        );
    };

    const renderRatingFilter = () => {
        const ratings = [1, 2, 3, 4, 5];
        return (
            <View className="mb-4">
                <Text className="text-base font-medium text-gray-600 mb-2">Nota</Text>
                <View className="flex-row gap-2">
                    {ratings.map((rating) => (
                        <TouchableOpacity
                            key={rating}
                            onPress={() => setSelectedRating(rating === selectedRating ? null : rating)}
                            className={`flex-row items-center justify-center px-4 py-2 rounded-lg ${selectedRating === rating ? 'bg-blue-500' : 'bg-gray-200'
                                }`}
                        >
                            <Text
                                className={`mr-2 text-base font-medium ${selectedRating === rating ? 'text-white' : 'text-gray-600'
                                    }`}
                            >
                                {rating}
                            </Text>
                            <Star
                                size={16}
                                color={selectedRating === rating ? '#FFD700' : '#CCCCCC'}
                                fill={selectedRating === rating ? '#FFD700' : 'none'}
                            />
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        );
    };

    return (
        <Modalize
            ref={modalRef}
            modalHeight={windowHeight}
            keyboardAvoidingBehavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            avoidKeyboardLikeIOS={true}
            scrollViewProps={{ showsVerticalScrollIndicator: false }}
        >
            <View className="p-6">
                <Text className="text-lg font-bold text-gray-800 mb-4">Filtrar</Text>

                <Text className="text-base font-medium text-gray-600 mb-2">Categorias</Text>
                {renderFilterOptions<ReadingCategory>(
                    Object.values(ReadingCategory),
                    selectedCategory,
                    setSelectedCategory
                )}

                <Text className="text-base font-medium text-gray-600 mb-2">Status</Text>
                {renderFilterOptions<ReadingStatus>(
                    Object.values(ReadingStatus),
                    selectedStatus,
                    setSelectedStatus
                )}

                <Text className="text-base font-medium text-gray-600 mb-2">Tipo</Text>
                {renderFilterOptions<ReadingType>(
                    Object.values(ReadingType),
                    selectedType,
                    setSelectedType
                )}

                {renderRatingFilter()}

                <TouchableOpacity
                    onPress={handleApplyFilters}
                    className="w-full mt-4 py-3 bg-blue-500 rounded-lg"
                >
                    <Text className="text-center text-white font-bold">Aplicar Filtros</Text>
                </TouchableOpacity>
            </View>
        </Modalize>
    );
}
