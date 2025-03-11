import { TEdition } from '@/@types';
import { IFilterModel, ISearchResult } from '@/interfaces';
import service from './service';

export class EditionsService {
  static async getAll(): Promise<TEdition[]> {
    return service.get('/editions');
  }

  static async search(filterModel: IFilterModel): Promise<ISearchResult<TEdition>> {
    return service.get(`/editions/search?term=${filterModel.term}`);
  }

  static async getById(id: number): Promise<TEdition | undefined> {
    return service.get(`/editions/${id}`);
  }

  static async create(book: TEdition): Promise<any> {
    return service.post('/editions', book);
  }

  static async update(id: number, book: TEdition): Promise<TEdition | undefined> {
    return service.put(`/editions/${id}`, book);
  }

  static async delete(id: number): Promise<any> {
    return service.delete(`/editions/${id}`);
  }
}
