import { TGender } from '@/@types'
import service from './service'

export class GenderService {
  static async getAll(): Promise<TGender[]> {
    return service.get('/genders')
  }

  static async getNames(ids: number[]): Promise<TGender | undefined> {
    const query = ids.join(',')

    return service.get(`/genders/names?${query}`)
  }

  static async getById(id: number): Promise<TGender | undefined> {
    return service.get(`/genders/${id}`)
  }

  static async create(gender: TGender): Promise<any> {
    return service.post('/genders', gender)
  }

  static async update(id: number, gender: TGender): Promise<TGender | undefined> {
    return service.put(`/genders/${id}`, gender)
  }

  static async delete(id: number): Promise<any> {
    return service.delete(`/genders/${id}`)
  }
}
