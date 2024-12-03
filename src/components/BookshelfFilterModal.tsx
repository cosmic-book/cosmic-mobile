import React, { MutableRefObject, useState } from 'react';
import { Modalize } from 'react-native-modalize';
import { Dimensions, Platform, Text, TouchableOpacity, View } from 'react-native';
import { Filter, Star } from 'lucide-react-native';
import { ReadingStatus, ReadingCategory, ReadingType } from '@/enums';
import { BookshelfFilter } from '@/@types/filters';
import { Button } from './Button';

type Props = {
  modalRef: MutableRefObject<Modalize | null>;
  onApplyFilters: (filters: BookshelfFilter) => void;
};

export function BookshelfFilterModal({ modalRef, onApplyFilters }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<number | null>(null);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const windowHeight = Dimensions.get('window').height * 0.65;

  const handleApplyFilters = () => {
    onApplyFilters({
      category: selectedCategory ?? undefined,
      status: selectedStatus ?? undefined,
      type: selectedType ?? undefined,
      rating: selectedRating ?? undefined,
    });

    modalRef.current?.close();
  };

  const handleClear = () => {
    setSelectedCategory(null);
    setSelectedStatus(null);
    setSelectedType(null);
    setSelectedRating(null);
  }

  const renderFilterOptions = <T extends string | number>(
    options: T[],
    selected: number | null,
    onSelect: (value: number | null) => void
  ) => {
    return (
      <View className="flex-row flex-wrap gap-2 mb-4">
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => onSelect(index === selected ? null : index)}
            className={`px-4 py-2 rounded-lg ${selected === index ? 'bg-blue-500' : 'bg-gray-200'
              }`}
          >
            <Text className={`${selected === index ? 'text-white' : 'text-gray-600'}`}>
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

  const headerComponent = (
    <View className="flex-row items-center gap-2 border_bottom py-4 px-5">
      <Filter color='#1460cd' size={20} />
      <Text className="text-primary text-lg font-medium">Filtrar Estante</Text>
    </View>
  );

  const footerComponent = (
    <View className="mx-5 my-3">
      <Button label='Aplicar Filtros' onPress={handleApplyFilters} />
      <Button label='Limpar' variant={'inline'} onPress={handleClear} />
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
    >
      <View className="p-5">
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
      </View>
    </Modalize>
  );
}
