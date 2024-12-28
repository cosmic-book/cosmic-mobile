import { TBook } from '../Book'

export type TMainStackParamList = {
  Menu: undefined
  Search: undefined
  Bookshelf: undefined
  BookDetails: {
    book: Partial<TBook>
  }
  History: undefined
  Profile: undefined
  ProfileEdit: undefined
  Settings: undefined
}
