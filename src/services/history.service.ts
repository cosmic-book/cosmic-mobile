import { THistory, THistoryResult } from '@/@types'
import service from './service'

export class HistoryService {
  static async getAll(): Promise<THistory[]> {
    return service.get('/histories')
  }

  static async getByReading(reading_id: number): Promise<THistoryResult> {
    return service.get(`/histories/reading/${reading_id}`)
  }

  static async getById(id: number): Promise<THistory | undefined> {
    return service.get(`/histories/${id}`)
  }

  static async create(history: THistory): Promise<THistory> {
    return service.post('/histories', history)
  }

  static async update(id: number, history: THistory): Promise<THistory | undefined> {
    return service.put(`/histories/${id}`, history)
  }

  static async delete(id: number): Promise<any> {
    return service.delete(`/histories/${id}`)
  }
}
