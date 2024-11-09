import React from 'react';
import { TouchableOpacity } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

type BackButtonProps = {
  targetScreen?: string;
  onPress?: () => void;
  color: string;
}

export function BackButton({ targetScreen, onPress, color }: BackButtonProps) {
  const navigation = useNavigation();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (targetScreen) {
      navigation.navigate(targetScreen as never);
    } else {
      navigation.goBack();
    }
  };

  return (
    <TouchableOpacity
      className="absolute top-12 left-4 p-2 rounded-full z-10"
      onPress={handlePress}
    >
      <ArrowLeft size={24} color={color} />
    </TouchableOpacity>
  );
}
