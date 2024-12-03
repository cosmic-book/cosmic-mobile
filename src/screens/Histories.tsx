import { History, HistoryResult } from "@/@types";
import { MainStackParamList } from "@/@types/navigation";
import { Button, Progress, Skeleton } from "@/components";
import { HistoryEditModal } from "@/components/modals";
import { useAuth } from "@/contexts/AuthContext";
import { GlobalContext } from "@/contexts/GlobalContext";
import { HistoryService } from "@/services";
import { useIsFocused } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ArrowLeft, Calendar, HistoryIcon, Pencil, Trash } from "lucide-react-native";
import moment from "moment";
import { useContext, useEffect, useRef, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Modalize } from "react-native-modalize";

type HistoryProps = NativeStackScreenProps<MainStackParamList, 'History'>;

function HistoriesScreen({ navigation, route }: HistoryProps) {
  const { actualUser } = useAuth();
  const { loading, setLoading, actualReading, loadReading, loadUserInfos } = useContext(GlobalContext)

  const editModalRef = useRef<Modalize>(null)
  const isFocused = useIsFocused()

  const [imageError, setImageError] = useState(false);

  const [histories, setHistories] = useState<History[]>([]);
  const [history, setHistory] = useState<History>({} as History);

  const fetchData = async () => {
    setLoading(true)

    const result: HistoryResult = await HistoryService.getByReading(actualReading.id)

    if (result) {
      setHistories(result.histories)
    }

    setLoading(false)
  }

  const handleOpen = (item?: History) => {
    setHistory(item || {} as History)

    editModalRef.current?.open()
  }

  const handleDelete = async (id: number) => {
    await HistoryService.delete(id)

    if (actualUser) {
      await loadReading(actualReading.id)
      await loadUserInfos(actualUser.id)
    }

    fetchData()
  }

  useEffect(() => {
    if (isFocused) {
      fetchData()
    }
  }, [isFocused])

  const renderItem = ({ item }: { item: History }) => (
    <View className='flex-col bg-white px-4 py-3 gap-5 shadow-sm shadow-black rounded-lg'>
      <View className='flex-row justify-between items-center'>
        <View className='flex-row gap-2 items-center'>
          <Calendar size={18} color='#6b7280' />
          <Text className="text-sm">{moment(item.date).format('DD/MM/YYYY')}</Text>
        </View>

        <View className='flex-row gap-4 items-center'>
          <TouchableOpacity onPress={() => handleOpen(item)}>
            <Pencil size={20} color='#6b7280' />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleDelete(item.id)}>
            <Trash size={20} color='#dc2626' />
          </TouchableOpacity>
        </View>
      </View>

      {item.comment && (
        <View>
          <Text className="border border-gray-200 rounded-md text-gray-600 p-3">
            {item.comment}
          </Text>
        </View>
      )}

      {actualReading.book && (
        <View>
          <Progress value={Math.ceil(item.read_pages / actualReading.book.pages * 100)} className="mb-2" />

          <View className="flex-row justify-between mb-2">
            <Text className="text-sm text-left text-primary font-semibold">
              {item.read_pages}/{actualReading.book.pages} pág.
            </Text>
            <Text className="text-sm text-right text-pink font-semibold">
              {Math.ceil((item.read_pages / actualReading.book.pages) * 100)}%
            </Text>
          </View>
        </View>
      )}
    </View>
  )

  return (
    <GestureHandlerRootView className="flex-1">
      <View className="bg-white w-full pt-12 pb-4 px-5 shadow-lg shadow-black">
        <View className="flex-row items-center relative">
          <TouchableOpacity onPress={() => navigation.goBack()} className="absolute left-0">
            <ArrowLeft size={24} color="black" />
          </TouchableOpacity>

          <View className="flex-col justify-center items-center mx-auto">
            <View className="flex-row items-center gap-2">
              <HistoryIcon color="#1460cd" size={20} />
              <Text className="text-primary text-lg font-medium">Histórico de Leitura</Text>
            </View>
            <Text className="text-gray-700 text-sm">Registre sua experiência com essa leitura</Text>
          </View>
        </View>
      </View>

      <View className="flex-1 px-8 pt-5">
        {actualReading.book && (
          <View className="bg-white p-3 rounded-lg flex-row gap-3 mb-5 shadow-sm shadow-black">
            {actualReading.book.cover && !imageError ? (
              <Image
                source={{ uri: actualReading.book.cover }}
                style={{ width: 70, height: 100 }}
                className="rounded-lg"
                onError={() => setImageError(true)}
              />
            ) : (
              <Image
                source={require('@/assets/no-cover.png')}
                style={{ width: 70, height: 100 }}
                className="rounded-lg"
              />
            )}
            <View className="flex-1 gap-1">
              <Text className="text-lg font-bold" numberOfLines={1}>{actualReading.book.title}</Text>
              <Text className="text-sm color-gray-400">{actualReading.book.author}</Text>
              <Text className="text-sm color-gray-400">{actualReading.book.publisher}</Text>
              <Text className="text-sm color-gray-400">{actualReading.book.year + ' - ' + actualReading.book.pages + ' páginas'}</Text>
            </View>
          </View>
        )}

        {!loading ? (
          <View className="flex-1">
            <FlatList
              data={histories}
              initialNumToRender={10}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={{ paddingBottom: 100 }}
              showsVerticalScrollIndicator={false}
              renderItem={renderItem}
              ItemSeparatorComponent={() => <View className='h-3' />}
              ListEmptyComponent={
                <View className="flex-1 justify-center items-center">
                  <Text className="text-lg text-gray-600 text-center font-medium">Ainda sem registros</Text>
                  <Text className="text-gray-500 text-center">Cadastre sua primeira leitura</Text>
                </View>
              }
            />

            <Button
              className='mx-5 my-3'
              label='Adicionar Registro'
              onPress={() => handleOpen()}
            />
          </View>
        ) : (
          <View className="flex-1 pt-2 border-t border-gray-200">
            {[...Array(5)].map((_, index) => (
              <View key={index} className="flex-row gap-3 mb-3">
                <Skeleton className="w-full h-28 mb-1" />
              </View>
            ))}
          </View>
        )}
      </View>

      <HistoryEditModal
        actualHistory={history}
        modalRef={editModalRef}
        afterSubmit={fetchData}
      />
    </GestureHandlerRootView>
  );
}

export default HistoriesScreen;