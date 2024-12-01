import Book from '../Book'
import Reading from '../Reading'

type MainStackParamList = {
  Menu: undefined
  Search: undefined
  Bookshelf: undefined
  BookDetails: {
    book: Partial<Book>
  }
  History: undefined
  Profile: undefined
  ProfileEdit: undefined
  Settings: undefined
}

export default MainStackParamList
