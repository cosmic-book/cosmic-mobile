import { THistory } from "@/@types";
import { Progress } from '@/components';
import React, { useState } from 'react';
import { Image, Text, View } from 'react-native';

type Props = {
  history: THistory;
};

export function LastHistoryItem({ history }: Props) {
  const [imageError, setImageError] = useState(false);

  return (
    <>
      {history && history.reading && history.reading.edition ? (
        <View className="flex-row items-center mb-4 py-2 pl-2 pr-4 rounded-md border border-gray-300">
          <View className='mr-4'>
            {history.reading.edition.cover && !imageError ? (
              <Image
                source={{ uri: history.reading.edition.cover }}
                style={{ width: 70, height: 100 }}
                className="rounded-md"
                onError={() => setImageError(true)}
              />
            ) : (
              <Image
                source={require('@/assets/no-cover.png')}
                style={{ width: 70, height: 100 }}
                className="rounded-md"
              />
            )}
          </View>

          <View className="flex-1">
            <View className='my-2'>
              <Text className="text-base font-semibold" numberOfLines={1}>
                {history.reading.edition.title}
              </Text>
              {/* <Text className="text-sm text-gray-400">
                {history.reading.edition?.author}
              </Text> */}
            </View>

            <Progress value={Math.ceil(history.read_pages / history.reading.edition.num_pages * 100)} className="my-2" />

            <View className="flex-row justify-between mb-2">
              <Text className="text-sm text-left text-primary font-semibold">
                {history.read_pages}/{history.reading.edition.num_pages} pág.
              </Text>
              <Text className="text-sm text-right text-pink font-semibold">
                {Math.ceil((history.read_pages / history.reading.edition.num_pages) * 100)}%
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <Text className="text-gray-500 text-center w-full">
          Nenhuma atividade encontrada.
        </Text>
      )}
    </>
  )
}