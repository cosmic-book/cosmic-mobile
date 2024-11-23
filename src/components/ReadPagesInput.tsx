import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

type Props = {
    totalPages: number;
    readPages: number;
    onChange: (pages: number) => void;
};

export function ReadPagesInput({ totalPages, readPages, onChange }: Props) {
    const [isInvalid, setIsInvalid] = useState(false);

    const handleInputChange = (value: string) => {
        if (value === '') {
            onChange(0);
            setIsInvalid(false);
            return;
        }

        const numericValue = parseInt(value, 10);
        if (!isNaN(numericValue)) {
            onChange(numericValue);
            setIsInvalid(numericValue > totalPages);
        }
    };

    return (
        <View>
            <Text className="text-gray-600 text-sm mb-2">
                Páginas Lidas: {readPages} / {totalPages}
            </Text>
            <TextInput
                className={`w-full h-12 border ${isInvalid ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4`}
                keyboardType="numeric"
                placeholder="Digite o número de páginas lidas"
                value={readPages === 0 ? '' : readPages.toString()}
                onChangeText={handleInputChange}
            />
            {isInvalid && (
                <Text className="text-red-500 text-xs mt-1">
                    O número de páginas lidas não pode exceder o total de páginas.
                </Text>
            )}
        </View>
    );
}
