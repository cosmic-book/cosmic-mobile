import { TReading } from '@/@types'
import service from './service'

export class ReadingService {
  static async getAll(): Promise<TReading[]> {
    return service.get('/readings')
  }

  static async getByUser(user_id: number): Promise<TReading[]> {
    return service.get(`/readings/user/${user_id}`)
  }

  static async getById(id: number): Promise<TReading | undefined> {
    return service.get(`/readings/${id}`)
  }

  static async create(reading: TReading): Promise<TReading> {
    return service.post('/readings', reading)
  }

  static async update(id: number, reading: TReading): Promise<TReading | undefined> {
    return service.put(`/readings/${id}`, reading)
  }

  static async delete(id: number): Promise<any> {
    return service.delete(`/readings/${id}`)
  }
}
