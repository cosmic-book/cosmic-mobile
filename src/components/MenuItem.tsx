import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

type MenuItemProps = {
    icon: React.ReactNode;
    label: string;
    onPress: () => void;
    badge?: number;
};

export function MenuItem({ icon, label, onPress, badge }: MenuItemProps) {
    return (
        <TouchableOpacity
            className="flex-row items-center justify-between px-6 py-4"
            onPress={onPress}
        >
            <View className="flex-row items-center gap-3">
                {icon}
                <Text className="text-gray-800 font-medium text-base">{label}</Text>
            </View>
            {badge && (
                <View className="bg-blue-500 rounded-full w-6 h-6 items-center justify-center">
                    <Text className="text-white text-xs font-bold">{badge}</Text>
                </View>
            )}
        </TouchableOpacity>
    );
}
