import { TUser } from '@/@types'
import service from './service'
import { INewPasswordForm } from '@/interfaces'

export default class UserService {
  static async getAll(): Promise<TUser[]> {
    return service.get('/users')
  }

  static async getById(id: number): Promise<TUser | undefined> {
    return service.get(`/users/${id}`)
  }

  static async create(user: Partial<TUser>): Promise<any> {
    return service.post('/users', user)
  }

  static async update(id: number, user: TUser): Promise<TUser | undefined> {
    return service.put(`/users/${id}`, user)
  }

  static async updatePassword(id: number, payload: INewPasswordForm): Promise<TUser | undefined> {
    const data = await service.put(`/users/password/${id}`, payload)

    return data
  }

  static async delete(id: number): Promise<any> {
    return service.delete(`/users/${id}`)
  }
}
