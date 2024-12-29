import { TBook, TBookSearch } from '@/@types'
import { TFilterModel } from '@/@types/filters'
import service from './service'

export class BookService {
  static async getAll(): Promise<TBook[]> {
    return service.get('/books')
  }

  static async search(filterModel: TFilterModel): Promise<TBookSearch> {
    return service.get(`/books/search?term=${filterModel.term}`)
  }

  static async getById(id: number): Promise<TBook | undefined> {
    return service.get(`/books/${id}`)
  }

  static async create(book: TBook): Promise<any> {
    return service.post('/books', book)
  }

  static async update(id: number, book: TBook): Promise<TBook | undefined> {
    return service.put(`/books/${id}`, book)
  }

  static async delete(id: number): Promise<any> {
    return service.delete(`/books/${id}`)
  }
}
