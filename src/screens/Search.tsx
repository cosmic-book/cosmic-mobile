import { Book, BookSearch } from '@/@types'
import { FilterModel } from '@/@types/filters'
import { BookListItem, ImageView, Input, Skeleton } from '@/components'
import { BookService } from '@/services'
import { NavigationProp, RouteProp } from '@react-navigation/native'
import { Search } from 'lucide-react-native'
import { useEffect, useState } from 'react'
import { FlatList, ScrollView, Text, View, Image } from 'react-native'
import { useDebounce } from 'use-debounce'

type SearchProps = {
  navigation: NavigationProp<any>
  route: RouteProp<any>
}

const SearchScreen = ({ navigation, route }: SearchProps) => {
  const [search, setSearch] = useState('')
  const [books, setBooks] = useState<Book[]>([])
  const [totalItems, setTotalItems] = useState(0)

  const [isLoading, setIsLoading] = useState(false)

  const [debounceTerm] = useDebounce(search, 3000)

  const fetchData = async () => {
    const filterModel: FilterModel = {
      term: debounceTerm || ''
    }

    if (debounceTerm) {
      const result: BookSearch = await BookService.search(filterModel)

      setBooks(result.books)
      setTotalItems(result.totalItems)
    }

    setIsLoading(false)
  }

  useEffect(() => {
    if (debounceTerm) {
      fetchData()
    }
  }, [debounceTerm])

  useEffect(() => {
    if (search) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
      setBooks([])
    }
  }, [search])

  return (
    <View className="flex-1 justify-center container bg-white h-full pt-16 px-6">
      <View className="mb-10">
        <Input placeholder="Pesquisar" value={search} onChangeText={setSearch} startIcon={Search} clearable />
      </View>

      <View>
        <Text className="text-lg font-bold pb-2">
          {search && books ? `Resultados de "${search}"` : 'Busca de Livros'}
        </Text>
        {search && !isLoading && totalItems ? (
          <Text className="text-sm pb-2 color-slate-500">{`Livros encontrados: ${totalItems}`}</Text>
        ) : null}
      </View>

      {!isLoading ? (
        <FlatList
          data={books}
          initialNumToRender={10}
          keyExtractor={(item) => item.id.toString()}
          className="pt-2 border-t border-gray-200"
          renderItem={({ item }) => <BookListItem book={item} />}
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
        <ScrollView className="pt-2 border-t border-gray-200">
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
        </ScrollView>
      )}
    </View>
  )
}

export default SearchScreen
