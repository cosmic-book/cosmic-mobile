import { Gender } from '@/@types'
import service from './service'

export default class GenderService {
  static async getAll(): Promise<Gender[]> {
    return service.get('/genders')
  }

  static async getNames(ids: number[]): Promise<Gender | undefined> {
    const query = ids.join(',')

    return service.get(`/genders/names?${query}`)
  }

  static async getById(id: number): Promise<Gender | undefined> {
    return service.get(`/genders/${id}`)
  }

  static async create(gender: Gender): Promise<any> {
    return service.post('/genders', gender)
  }

  static async update(id: number, gender: Gender): Promise<Gender | undefined> {
    return service.put(`/genders/${id}`, gender)
  }

  static async delete(id: number): Promise<any> {
    return service.delete(`/genders/${id}`)
  }
}
