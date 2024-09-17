import { Book } from '@/@types'
import { FilterModel } from '@/@types/filters'
import service from './service'

export default class BookService {
  static async getAll(): Promise<Book[]> {
    return service.get('/books')
  }

  static async search(filterModel: FilterModel): Promise<Book[]> {
    return service.get(`/books/search/${filterModel.term}`)
  }

  static async getById(id: number): Promise<Book | undefined> {
    return service.get(`/books/${id}`)
  }

  static async create(book: Book): Promise<any> {
    return service.post('/books', book)
  }

  static async update(id: number, book: Book): Promise<Book | undefined> {
    return service.put(`/books/${id}`, book)
  }

  static async delete(id: number): Promise<any> {
    return service.delete(`/books/${id}`)
  }
}
