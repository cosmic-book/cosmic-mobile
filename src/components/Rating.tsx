import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Star } from 'lucide-react-native';

type RatingProps = {
    rating: number;
    onRatingChange: (rating: number) => void;
};

export function Rating({ rating, onRatingChange }: RatingProps) {
    return (
        <View className="flex-row my-2">
            {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => onRatingChange(star)}>
                    <Star
                        size={32}
                        color={star <= rating ? '#FFD700' : '#d1d5db'}
                        fill={star <= rating ? '#FFD700' : 'none'}
                    />
                </TouchableOpacity>
            ))}
        </View>
    );
}
