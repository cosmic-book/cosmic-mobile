import { TAuthor } from '@/@types';
import { IFilterModel, ISearchResult } from '@/interfaces';
import service from './service';

export class AuthorsService {
  static async getAll(): Promise<TAuthor[]> {
    return service.get('/authors');
  }

  static async search(filterModel: IFilterModel): Promise<ISearchResult<TAuthor>> {
    return service.get(`/authors/search?term=${filterModel.term}`);
  }

  static async getById(id: number): Promise<TAuthor | undefined> {
    return service.get(`/authors/${id}`);
  }

  static async create(book: TAuthor): Promise<any> {
    return service.post('/authors', book);
  }

  static async update(id: number, book: TAuthor): Promise<TAuthor | undefined> {
    return service.put(`/authors/${id}`, book);
  }

  static async delete(id: number): Promise<any> {
    return service.delete(`/authors/${id}`);
  }
}
