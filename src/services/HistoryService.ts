import { History, HistoryResult } from '@/@types'
import service from './service'

export default class HistoryService {
  static async getAll(): Promise<History[]> {
    return service.get('/histories')
  }

  static async getByReading(reading_id: number): Promise<HistoryResult> {
    return service.get(`/histories/reading/${reading_id}`)
  }

  static async getById(id: number): Promise<History | undefined> {
    return service.get(`/histories/${id}`)
  }

  static async create(history: History): Promise<History> {
    return service.post('/histories', history)
  }

  static async update(id: number, history: History): Promise<History | undefined> {
    return service.put(`/histories/${id}`, history)
  }

  static async delete(id: number): Promise<any> {
    return service.delete(`/histories/${id}`)
  }
}
