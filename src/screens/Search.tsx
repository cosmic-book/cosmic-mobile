import { TEdition } from '@/@types';
import { TMainStackParamList } from '@/@types/navigation';
import { ImageView, Skeleton } from '@/components';
import { Input } from '@/components/fields';
import { EditionListItem } from '@/components/layout';
import { GlobalContext } from '@/contexts/GlobalContext';
import { IFilterModel, ISearchResult } from '@/interfaces';
import { EditionsService } from '@/services/editions.service';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { Search } from 'lucide-react-native';
import { useContext, useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { useDebounce } from 'use-debounce';

type SearchProps = {
  navigation: NavigationProp<TMainStackParamList, 'Search'>;
  route: RouteProp<any>;
};

const SearchScreen = ({ navigation, route }: SearchProps) => {
  const { loading, setLoading } = useContext(GlobalContext);

  const [search, setSearch] = useState('');
  const [editions, setEditions] = useState<TEdition[]>([]);
  const [totalItems, setTotalItems] = useState(0);

  const [debounceTerm] = useDebounce(search, 1000);

  const fetchData = async () => {
    const filterModel: IFilterModel = {
      term: debounceTerm || ''
    };

    if (debounceTerm) {
      const result: ISearchResult<TEdition> = await EditionsService.search(filterModel);

      setEditions(result.items);
      setTotalItems(result.totalItems);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (debounceTerm) {
      fetchData();
    }
  }, [debounceTerm]);

  useEffect(() => {
    if (search) {
      setLoading(true);
    } else {
      setLoading(false);
      setEditions([]);
    }
  }, [search]);

  return (
    <View className="flex-1 justify-center container bg-white h-full pt-16 px-6">
      <View className="mb-5">
        <Input placeholder="Pesquisar" value={search} onChangeText={setSearch} startIcon={Search} clearable />
      </View>

      <View>
        <Text className="text-lg font-bold pb-2" numberOfLines={1}>
          {search && editions ? `Resultados de "${search}"` : 'Busca de Livros'}
        </Text>
        {search && !loading && totalItems ? (
          <Text className="text-sm pb-2 color-slate-500">{`Livros encontrados: ${totalItems}`}</Text>
        ) : null}
      </View>

      {!loading ? (
        <FlatList
          data={editions}
          initialNumToRender={10}
          keyExtractor={(item) => item.id.toString()}
          className="pt-2 border-t border-gray-200"
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <EditionListItem edition={item} navigation={navigation} />}
          ItemSeparatorComponent={() => <View className="h-5" />}
          ListEmptyComponent={
            <View className="flex py-24 justify-center items-center">
              {search ? (
                <ImageView
                  image={require('@/assets/no-results.png')}
                  label="Nenhum livro encontrado"
                  width={300}
                  height={300}
                />
              ) : (
                <ImageView
                  image={require('@/assets/search.png')}
                  label="Pesquise por livros ou autores"
                  width={350}
                  height={300}
                />
              )}
            </View>
          }
        />
      ) : (
        <View className="flex-1 pt-2 border-t border-gray-200">
          {[...Array(5)].map((_, index) => (
            <View key={index} className="flex-row gap-3 mb-5">
              <Skeleton className="w-20 h-28 mb-1" />
              <View>
                <Skeleton className="w-72 h-6 mb-3" />
                <Skeleton className="w-48 h-4 mb-1" />
                <Skeleton className="w-48 h-4 mb-1" />
                <Skeleton className="w-48 h-4 mb-1" />
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default SearchScreen;
