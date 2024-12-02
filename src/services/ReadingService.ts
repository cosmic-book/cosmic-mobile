import { FavoritesResult, Reading } from '@/@types'
import service from './service'

export default class ReadingService {
  static async getAll(): Promise<Reading[]> {
    return service.get('/readings')
  }

  static async getByUser(user_id: number): Promise<Reading[]> {
    return service.get(`/readings/user/${user_id}`)
  }

  static async getById(id: number): Promise<Reading | undefined> {
    return service.get(`/readings/${id}`)
  }

  static async getFavoritesByUser(user_id: number): Promise<FavoritesResult> {
    return service.get(`/readings/favorite/${user_id}`)
  }

  static async create(reading: Reading): Promise<Reading> {
    return service.post('/readings', reading)
  }

  static async update(id: number, reading: Reading): Promise<Reading | undefined> {
    return service.put(`/readings/${id}`, reading)
  }

  static async delete(id: number): Promise<any> {
    return service.delete(`/readings/${id}`)
  }
}
