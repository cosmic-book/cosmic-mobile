import { Book } from '@/@types'
import { FilterModel } from '@/@types/filters'
import { BookListItem, Input, Skeleton } from '@/components'
import { BookService } from '@/services'
import { NavigationProp, RouteProp } from '@react-navigation/native'
import { Search } from 'lucide-react-native'
import { useEffect, useState } from 'react'
import { FlatList, ScrollView, Text, View } from 'react-native'
import { useDebounce } from 'use-debounce'

type SearchProps = {
  navigation: NavigationProp<any>
  route: RouteProp<any>
}

const SearchScreen = ({ navigation, route }: SearchProps) => {
  const [search, setSearch] = useState('')
  const [books, setBooks] = useState<Book[]>([])

  const [isLoading, setIsLoading] = useState(false)

  const [debounceTerm] = useDebounce(search, 3000)

  const fetchData = async () => {
    const filterModel: FilterModel = {
      term: debounceTerm || ''
    }

    if (debounceTerm) {
      const result: Book[] = await BookService.search(filterModel)

      setBooks(result)
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
      setBooks([])
    }
  }, [search])

  return (
    <View className="flex-1 justify-center container bg-white h-full pt-16 px-6">
      <View className="mb-10">
        <Input placeholder="Pesquisar" value={search} onChangeText={setSearch} startIcon={Search} clearable />
      </View>

      <Text className="text-lg font-bold pb-2">{search && books ? `Resultados de "${search}"` : 'Busca de Livros'}</Text>

      {!isLoading ? (
        <FlatList
          data={books}
          initialNumToRender={10}
          keyExtractor={(item) => item.id.toString()}
          className='pt-2 border-t border-gray-200'
          renderItem={({ item }) => <BookListItem book={item} />}
          ListEmptyComponent={
            <Text className="text-center text-lg mt-6 color-gray-400">
              {search ? 'Nenhum livro encontrado' : 'Pesquise a sua nova leitura'}
            </Text>
          }
        />
      ) : (
        <ScrollView className='pt-2 border-t border-gray-200'>
          {[...Array(5)].map((_, index) => (
            <View key={index} className='flex-row gap-3 mb-5'>
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