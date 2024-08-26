import { RootStackParamList } from '@/navigation/RootStackParamList';
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

type CustomButtonProps = {
  navigation: any;
  bgColor: string;
  textColor: string;
  goto: keyof RootStackParamList; 
  content: string;
};

const CustomButton = ({ navigation, bgColor, textColor, goto, content }: CustomButtonProps) => {
  return (
    <TouchableOpacity
      style={{ backgroundColor: bgColor, padding: 12, borderRadius: 8, alignItems: 'center' }}
      onPress={() => navigation.navigate(goto)} 
    >
      <Text style={{ color: textColor, fontWeight: 'bold' }}>{content}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
