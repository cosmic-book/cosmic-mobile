import { Reading } from '@/@types'
import service from './service'

export default class ReadingService {
  static async getAll(): Promise<Reading[]> {
    return service.get('/readings')
  }

  static async getById(id: number): Promise<Reading | undefined> {
    return service.get(`/readings/${id}`)
  }

  static async create(user: Partial<Reading>): Promise<Reading> {
    return service.post('/readings', user)
  }

  static async update(id: number, user: Reading): Promise<Reading | undefined> {
    return service.put(`/readings/${id}`, user)
  }

  static async delete(id: number): Promise<any> {
    return service.delete(`/readings/${id}`)
  }
}
