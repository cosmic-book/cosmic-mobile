import { ReadingCategory } from "@/enums";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  value: number;
  onSelect: (value: number) => void;
}

export function ReadingCategorySelector({ value, onSelect }: Props) {
  const categories = [
    { id: 0, label: ReadingCategory.BOOK },
    { id: 1, label: ReadingCategory.COMIC },
    { id: 2, label: ReadingCategory.MAGAZINE },
  ];

  const handleChangeSelected = (id: number) => {
    onSelect(id);
  };

  return (
    <View className="flex-row justify-center bg-white border border-gray-300 rounded-lg">
      {categories.map(({ id, label }, index) => {
        const isSelected = value === id;
        const isFirst = index === 0;
        const isLast = index === categories.length - 1;

        return (
          <TouchableOpacity
            key={id}
            onPress={() => handleChangeSelected(id)}
            className={`
              ${isSelected ? 'bg-primary' : 'bg-white'} 
              ${isFirst ? 'rounded-l-lg' : ''}
              ${isLast ? 'rounded-r-lg' : ''}
              ${!isFirst && 'border-l border-gray-300'} 
              p-3 flex-1`
            }
          >
            <Text className={`${isSelected ? 'text-white' : 'text-gray-500'} text-lg text-center`}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
