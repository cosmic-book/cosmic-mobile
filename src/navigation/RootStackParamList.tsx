import { Book } from "@/@types"

export type RootStackParamList = {
  Login: undefined
  Signup: undefined
  Greeting: undefined
  Items: undefined
  MainApp: undefined
  Search: undefined
  Bookshelf: undefined
  Profile: undefined
  BookDetails: {
    book: Book;
  };
}
