import { User } from '@/@types'
import service from './service'
import { INewPasswordForm } from '@/interfaces'

export default class UserService {
  static async getAll(): Promise<User[]> {
    return service.get('/users')
  }

  static async getById(id: number): Promise<User | undefined> {
    return service.get(`/users/${id}`)
  }

  static async create(user: User): Promise<any> {
    return service.post('/users', user)
  }

  static async update(id: number, user: User): Promise<User | undefined> {
    return service.put(`/users/${id}`, user)
  }

  async updatePassword(id: number, payload: INewPasswordForm): Promise<User | undefined> {
    const data = await service.put(`/users/password/${id}`, payload)

    return data
  }

  static async delete(id: number): Promise<any> {
    return service.delete(`/users/${id}`)
  }
}
