import { View, Text, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CustomButton from '../components/CustomButton';
import Heading from '../components/Heading';
import { colors } from '@/styles/colors';
import { RootStackParamList } from '@/navigation/RootStackParamList';

type GreetingProps = NativeStackScreenProps<RootStackParamList, 'Greeting'>;

const Greeting = ({ navigation }: GreetingProps) => {
  return (
    <SafeAreaView className="container bg-white h-full">
      <View className="flex justify-center items-center mt-24">
        <Image
          source={require('../../assets/reading.png')}
          style={{ width: 400, height: 300 }}
        />
      </View>
      <View className="px-7">
        <Heading content="Cosmic" />
        <Text className="text-base opacity-60 text-textDark tracking-tight mt-2">
          Organize suas leituras, defina metas e transforme o hábito de ler em uma experiência gratificante!
        </Text>
      </View>
      <View className="mt-6 px-7">
        <View className="mb-4">
          <CustomButton
            navigation={navigation}
            bgColor={colors.primary}
            textColor={colors.textWhite}
            goto={'Login'}
            content={'Login'}
          />
        </View>
        <CustomButton
          navigation={navigation}
          bgColor={colors.bgGray}
          textColor={colors.textDark}
          goto={'Signup'}
          content={'Signup'}
        />
      </View>
    </SafeAreaView>
  );
};

export default Greeting;
