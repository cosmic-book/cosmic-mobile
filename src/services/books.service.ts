import { TBook } from '@/@types';
import service from './service';

export class BooksService {
  static async getAll(): Promise<TBook[]> {
    return service.get('/books');
  }

  static async getById(id: number): Promise<TBook | undefined> {
    return service.get(`/books/${id}`);
  }

  static async create(book: TBook): Promise<any> {
    return service.post('/books', book);
  }

  static async update(id: number, book: TBook): Promise<TBook | undefined> {
    return service.put(`/books/${id}`, book);
  }

  static async delete(id: number): Promise<any> {
    return service.delete(`/books/${id}`);
  }
}
